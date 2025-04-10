# ESE-1-Assignment-1

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