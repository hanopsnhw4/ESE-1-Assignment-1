const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./todo.db');

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON and URL encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create the tasks table if it doesn't already exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT,
      details TEXT,
      due_date TEXT
    )
  `);
  console.log('Database table setup complete.');
});

// ** REST API **

// GET all tasks (REST API)
app.get('/api/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// GET a specific task by ID (REST API)
app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(row);
  });
});

// POST a new task (REST API)
app.post('/api/tasks', (req, res) => {
  const { task, details, due_date } = req.body;
  db.run(
    'INSERT INTO tasks (task, details, due_date) VALUES (?, ?, ?)',
    [task, details, due_date],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error adding task' });
      }
      res.status(201).json({ id: this.lastID, task, details, due_date });
    }
  );
});

// PUT (update) an existing task (REST API)
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { task, details, due_date } = req.body;

  db.run(
    'UPDATE tasks SET task = ?, details = ?, due_date = ? WHERE id = ?',
    [task, details, due_date, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error updating task' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ id, task, details, due_date });
    }
  );
});

// DELETE a task (REST API)
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error deleting task' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  });
});

// ** Pug Views **

// Main page: Display all tasks
app.get('/', (req, res) => {
  db.all('SELECT * FROM tasks', (err, rows) => {
    if (err) {
      return res.render('index', { error: 'Database error', tasks: [] });
    }

    // Pass tasks to the index.pug with proper logic for danger class
    res.render('index', {
      todos: rows || [],
    });
  });
});

// Page for adding a new task
app.get('/add', (req, res) => {
  res.render('add');
});

// Add a new task to the database
app.post('/add', (req, res) => {
  const { task, details, due_date } = req.body;
  db.run(
    'INSERT INTO tasks (task, details, due_date) VALUES (?, ?, ?)',
    [task, details, due_date],
    function (err) {
      if (err) {
        return res.render('add', { error: 'Error adding task' });
      }
      res.redirect('/');
    }
  );
});

// Delete a task from the database (from main page)
app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

// View task
app.get('/task/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    if (err || !task) return res.status(404).send('Task not found');
    res.render('task', { task });
  });
});

// Edit page
app.get('/task/:id/edit', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    if (err || !task) return res.status(404).send('Task not found');
    res.render('edit', { task });
  });
});

// Save task edits
app.post('/task/:id/edit', (req, res) => {
  const { id } = req.params;
  const { task, details, due_date } = req.body;
  db.run(
    'UPDATE tasks SET task = ?, details = ?, due_date = ? WHERE id = ?',
    [task, details, due_date, id],
    (err) => {
      if (err) return res.status(500).send('Error updating task');
      res.redirect(`/task/${id}`);
    }
  );
});

// Delete task (with confirmation in Pug)
app.post('/task/:id/delete', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Error deleting task');
    res.redirect('/');
  });
});



// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
