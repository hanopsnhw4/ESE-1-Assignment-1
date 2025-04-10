# ESE-1-Assignment-1

### Contents
[Solution Overview and Project Aim](#solution-overview-and-project-aim)
[Project Objectives](#project-objectives)
[Enterprise Considerations](#enterprise-considerations)
[Installation and Usage Instructions](#installation-and-usage-instructions)
[Feature Overview](#feature-overview)



### Solution Overview and Project Aim

This project is a personal task management web application that helps users stay on top of their daily responsibilities through a simple and visually engaging interface. The core idea is to provide an easy-to-use to-do list system that supports task creation, viewing, updating, and deletion—while giving users a clear indication of which tasks are approaching their deadlines.

Built using Node.js and Express for the backend and SQLite for persistent storage, the application allows users to register and log in, ensuring their tasks are securely stored and user-specific. Tasks are displayed on a dashboard, with deadlines colour-coded to signal urgency—red for overdue, orange for upcoming, and purple for the default state.

Although routing and middleware logic are primarily handled within a single app.js file for simplicity, the application still follows a clean and readable structure. Frontend rendering is done with Pug templates, and styling is managed through a combination of inline CSS and stylesheets in the public/ directory, allowing for both quick development and visual consistency.

This project serves as a practical demonstration of a full-stack application, combining backend logic, dynamic frontend rendering, and user interaction in a streamlined experience.


### Project Objectives

1. User Authentication and Task Ownership:
Implement a secure login and registration system that ensures users can only access and manage their own tasks. Each task is linked to a specific user via a user_id, allowing for personalized task lists.

2. CRUD Functionality for Task Management:
Provide users with full control over their to-do items, allowing them to create new tasks with details and deadlines, view task information, make updates to existing tasks, and delete tasks they no longer need.

3. Deadline Awareness through Visual Cues:
Enhance user productivity by visually highlighting tasks based on their urgency. Tasks nearing their deadlines are marked in orange, while overdue tasks are highlighted in red, drawing immediate attention to high-priority items.

4. User-Friendly and Consistent Interface:
Offer an intuitive interface using Pug templates with clear navigation, consistent styling, and responsive feedback. Interactive elements like edit and delete confirmations are designed to improve usability and prevent accidental actions.


### Enterprise Considerations

### Performance

To ensure the application performs efficiently, several strategies were implemented:

- Efficient Routing and Middleware: The routing logic is structured to minimize the number of middleware functions executed per request. This reduces unnecessary processing and ensures that the application responds to user requests quickly.

- Optimized Database Queries: Queries are structured to be as efficient as possible. The database is queried by user ID to limit the dataset returned, reducing memory consumption and response time. Indexes are considered for frequently queried fields, such as user_id and due_date.

- Static Assets: CSS and static assets are served directly from the public directory. This allows the browser to cache these assets, reducing the time required to load them on subsequent page visits. This strategy helps in minimizing load times and improving the overall user experience.

- Asynchronous Operations: Non-blocking asynchronous operations are used for database calls and other I/O-bound tasks, ensuring the server remains responsive even during heavy loads.

### Scalability

The application has been designed with scalability in mind:

- Modular Codebase: The application structure allows for easy addition of new features without significant changes to the existing codebase. For example, the route handling, middleware functions, and user authentication are all logically separated, making it easier to add new routes, services, or API endpoints as the application grows.

- Database Scalability: The current database solution, SQLite, works well for development and small-scale applications. However, the architecture is flexible enough to allow easy migration to more scalable solutions such as PostgreSQL or MongoDB, should the number of users or data grow significantly.

- Cloud Deployment and Auto-Scaling: The application is hosted on Render, a cloud platform that offers auto-scaling and load balancing features. This allows the application to handle an increasing number of requests by automatically provisioning additional resources as needed. Render provides a hassle-free way to scale the app without requiring manual intervention.

### Robustness

The application is built with a focus on robustness to handle potential failures gracefully:

- Error Handling: The application features structured error handling that returns meaningful error messages to the user when an issue arises (e.g., a task cannot be added because of invalid input or database errors). The server also logs errors to help identify and fix issues quickly.

- Data Integrity: Server-side validation ensures that data inputted by users is correct and sanitized before being saved in the database. This prevents invalid data from being stored, thus protecting the integrity of the application's state.

### Security

The application incorporates multiple security measures to ensure data integrity and privacy:

- Password Hashing: To prevent the storage of plain text passwords, all user passwords are hashed using the bcrypt algorithm before being saved in the database. This ensures that even in the event of a database breach, user passwords remain secure.

- Session Management: User sessions are securely handled using the express-session middleware, ensuring that each user's data is isolated from others. Session cookies are set with the HttpOnly flag to protect against XSS attacks.

- Input Sanitization: To prevent SQL injection or other forms of malicious input, user inputs are sanitized before they are passed to the database. This helps protect the application from various attacks such as Cross-Site Scripting (XSS) and SQL injection.

- Authorization: Routes are protected to ensure that users can only access and modify their own data. For example, users can only delete or edit their own tasks, ensuring that no user can manipulate another user's data.

### Deployment

The application is deployed on Render, a cloud platform that simplifies the deployment process:

- Continuous Deployment: The application is linked with a GitHub repository, ensuring that every change pushed to the repository automatically triggers a deployment to the live environment. This facilitates quick bug fixes and feature updates.

- Scalability and Hosting: Render provides a fully managed platform for hosting the application. As traffic increases, Render automatically scales the resources allocated to the application, ensuring that it remains performant under varying loads.

- Zero Downtime Deployments: Render supports zero-downtime deployments, which means the application remains available to users even during updates. This improves the user experience and ensures high availability.


### Installation and Usage Instructions

### Prerequisites

To run this application, you’ll need the following technologies and tools. If you’re using GitHub Codespaces, these tools are pre-configured for you. If you plan to run the project on your local machine, please make sure you have the following installed:

- GitHub Account: You need to have a GitHub account to access the repository and clone the project. Sign up at github.com.

- GitHub Codespaces (Recommended): If you're using GitHub Codespaces, this will automatically handle most of the environment setup for you. Follow the GitHub Codespaces documentation for more details on setting up and using Codespaces.

If you're running the app locally:

- Node.js: This application is built using Node.js. Download and install the latest stable version from nodejs.org.

- npm (Node Package Manager): npm is required to install the project’s dependencies. It comes bundled with Node.js, so if you’ve installed Node.js, npm will already be installed.

- SQLite3: This application uses SQLite as its database. SQLite is a serverless, self-contained SQL database engine. Download and install SQLite from sqlite.org. Alternatively, if you're using GitHub Codespaces, SQLite will be automatically available.

- REST API: The application follows the REST architecture style, and the backend provides API endpoints to handle data operations (e.g., creating, updating, and deleting tasks). Familiarity with REST APIs and HTTP methods (GET, POST, PUT, DELETE) is useful when working with the backend.

- Pug (formerly Jade): This application uses Pug as the templating engine to render views on the frontend. It compiles HTML from Pug templates, which are used to dynamically display content on the client side. Ensure Pug is included in the package.json file as a dependency (this is typically handled automatically when you install dependencies).

### Setup Steps

1. Clone the Repository:

- Go to the GitHub repository: ESE-1-Assignment-1.

- Click on the Code button, then click Open with Codespaces to open the project in a new GitHub Codespace. Alternatively, if you’re running the project locally, clone the repository to your machine:

```
git clone https://github.com/hanopsnhw4/ESE-1-Assignment-1.git
```

2. Install Dependencies:

- In your Codespace or local project folder, install the necessary dependencies by running:

```
npm install
```
- This will install all required libraries, including Express, Pug, and other dependencies listed in the package.json file.

3. Database Setup:

- This application uses SQLite for data storage. When the application starts for the first time, SQLite will automatically create the database file and required tables.

- If you need to manually create the database or reset it, delete the existing database file and restart the app, which will create a fresh database.

### Running the Application

1. Start the Backend Server:

- In the Codespace terminal or your local machine terminal, run the following command to start the backend server:

```
npm start
```

- This will start the server on the specified port (usually 3000), and the backend will serve both the API and the Pug-based views.

2. Frontend and Views:

- The frontend is served directly by the backend through Pug templates, so once the backend is running, the views will automatically be available when you visit the app in a browser.

3. Access the Application:

- If you're using GitHub Codespaces, click Open in Browser to view the app.

- If you're running the application locally, visit http://localhost:3000 in your browser to view the app.

4. For Production Deployment:

- If you wish to deploy the application to a cloud service like Render or Heroku, follow the deployment instructions provided by those platforms.

- You’ll need to set up appropriate environment variables (e.g., database path, port) and push the code to your GitHub repository.


### Feature Overview

1. User Authentication
- Purpose:

    - Allows users to sign up, log in, and maintain a session throughout the app. This ensures that tasks are associated with specific users.

    - Secures user data and only allows authenticated users to access and modify their tasks.

- Code Location:

    - The authentication logic is implemented in app.js under the routes for POST /login and POST /signup and the middleware for session management.

- Relevant Endpoints:

    - POST /login: Authenticates the user and creates a session.

    - POST /register: Registers a new user in the database.

    - POST /logout: Logs the user out and destroys the session.


(Additional) Logout Functionality
- Purpose:

    - Allows users to log out of their accounts, ending the session and preventing unauthorized access to their data after they've left the app.

- Code Location:

    - The logout route is defined in app.js, which destroys the session when a user logs out.

- Relevant Endpoints:

    - POST /logout: Logs the user out of the application by destroying the session.




2. Task Management
- Purpose:

    - This feature allows users to create, view, edit, and delete tasks. It serves as the core functionality of the app, helping users organize their to-dos based on due dates and priority levels.

- Code Location:

    - The task management logic is primarily located in app.js under the routes for creating, deleting, and editing tasks.

    - The task views are rendered using Pug templates, specifically index.pug, task.pug, and edit.pug.

- Relevant Endpoints:

    - POST /add: Creates a new task.

    - GET /tasks: Displays all tasks for the logged-in user on the index page.

    - GET /task/:id: Displays the details of a specific task.

    - GET /task/:id/edit: Displays the form to edit a task.

    - POST /edit/:id: Saves changes made to a task.

    - POST /delete/:id: Deletes a task from the database.


3. Task Sorting and Filtering
- Purpose:

    - Tasks are colour-coded based on their due dates to provide better visual organization. Tasks are also sorted by their due date, allowing users to easily identify which tasks are due soon or overdue.

- Code Location:

    - The logic for determining which tasks are close to the due date or overdue is located in app.js, within the task rendering logic. The CSS styles that colour the tasks are defined in the embedded style block in index.pug.

- Relevant Code and Logic:

    - In app.js, logic is implemented to check the difference between the current date and the task’s due date to apply the correct classes (danger, warning).

    - In index.pug, classes like .task.danger and .task.warning are applied dynamically to tasks.


4. Responsive Design
- Purpose:

    - Ensures that the app is mobile-friendly and looks good on various screen sizes by using flexible layouts and adaptive styling.

- Code Location:

    - The responsive styling is handled directly in the style block inside the index.pug template, where media queries adjust the layout based on the screen size.

- Relevant Code:

    - The CSS in the style block adapts various elements like the task list, task view, and buttons to different screen sizes using media queries.


### Known Issues and Future Enhancements

Known Issues:
1. No User Feedback on Successful Task Deletion:

    - Issue: After deleting a task, there is no clear feedback to the user to indicate that the action was successful.

    - Impact: Users may not know if the task was actually deleted unless they manually refresh the page or check the task list.

2. Date Format Inconsistency:

    - Issue: The date format for task due dates is not consistent across different pages.

    - Impact: Users may get confused if dates are displayed differently on the task list and task details page.

Future Enhancements:
1. Deletion Confirmation Pop-up:

    - Improvement: Introduce a pop-up modal asking the user to confirm the deletion of a task before proceeding.

    - Benefit: Prevents accidental deletions and gives users a chance to reconsider before deleting a task.

2. User Feedback on Successful Deletion:

    - Improvement: Provide a message or redirect users to the index page with a success notification after a task is deleted.

    - Benefit: Users will know their action has been successful and the task has been removed.

3. Task Sorting by Due Date and Priority:

    - Improvement: Implement sorting functionality to allow users to view tasks by due date or priority.

    - Benefit: Users can better manage their tasks and focus on the most urgent ones first.


### References
Gen Ai tools such as Chat GPT were used to format the Read Me doc and tidy up parts of my code to make it all more readable and understandable