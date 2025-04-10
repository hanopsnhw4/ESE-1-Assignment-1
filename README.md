# ESE-1-Assignment-1

### Contents
[Solution Overview and Project Aim](#solution-overview-and-project-aim)
[Project Objectives](#project-objectives)



### Solution Overview and Project Aim

This project is a personal task management web application that helps users stay on top of their daily responsibilities through a simple and visually engaging interface. The core idea is to provide an easy-to-use to-do list system that supports task creation, viewing, updating, and deletion—while giving users a clear indication of which tasks are approaching their deadlines.

Built using Node.js and Express for the backend and SQLite for persistent storage, the application allows users to register and log in, ensuring their tasks are securely stored and user-specific. Tasks are displayed on a dashboard, with deadlines color-coded to signal urgency—red for overdue, orange for upcoming, and purple for the default state.

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