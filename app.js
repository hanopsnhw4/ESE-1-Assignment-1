const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');

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

// Session middleware
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: true
}));

// Middleware to protect routes
function checkAuth(req, res, next) {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Create the tables if they don't already exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT,
      details TEXT,
      due_date TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  console.log('Database table setup complete.');
});

// Main route for index page
app.get('/', checkAuth, (req, res) => {
  const userId = req.session.userId;

  db.all('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      return res.render('index', { error: 'Database error', todos: [], loggedIn: true });
    }

    res.render('index', {
      todos: rows || [],
      loggedIn: true
    });
  });
});


// Route for adding tasks
app.get('/add', checkAuth, (req, res) => {
  res.render('add');
});

app.post('/add', checkAuth, (req, res) => {
  const { task, details, due_date } = req.body;
  const userId = req.session.userId;

  if (!task || !due_date) {
    // Redirect back to add page without rendering an error
    return res.redirect('/add');
  }

  db.run(
    'INSERT INTO tasks (task, details, due_date, user_id) VALUES (?, ?, ?, ?)',
    [task, details, due_date, userId],
    function (err) {
      if (err) {
        console.error('Error adding task:', err);
        // Silently redirect even if error occurs
        return res.redirect('/');
      }
      // Task added successfully
      res.redirect('/');
    }
  );
});



// Route to delete tasks
app.post('/delete/:id', checkAuth, (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

// Route to view and edit individual tasks
app.get('/task/:id', checkAuth, (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    if (err || !task) return res.status(404).send('Task not found');
    res.render('task', { task });
  });
});

app.get('/task/:id/edit', checkAuth, (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
    if (err || !task) return res.status(404).send('Task not found');
    res.render('edit', { task });
  });
});

app.post('/task/:id/edit', checkAuth, (req, res) => {
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

// Route for login and register
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) {
      return res.render('login', { error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.loggedIn = true;
      req.session.username = username;
      req.session.userId = user.id; // Save the user ID in session
      res.redirect('/');
    } else {
      res.render('login', { error: 'Invalid username or password' });
    }
  });
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render('register', { error: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint')) {
            return res.render('register', { error: 'Username already exists' });
          }
          return res.render('register', { error: 'Error creating account' });
        }
        req.session.loggedIn = true;
        req.session.username = username;
        req.session.userId = this.lastID; // Save the user ID in session
        res.redirect('/');
      }
    );
  } catch (err) {
    res.render('register', { error: 'Server error' });
  }
});

// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
