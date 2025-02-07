# Full-Stack Project

## Overview

This is a full-stack web application utilizing a modified **MERN** stack with **MySQL** for database management. The project is built with **MySQL, Express.js, React.js, and Node.js** and styled using **Chakra UI**. The frontend is powered by **Vite** for a fast and optimized development experience. The project is deployed on **Render** and is accessible here:

🔗 [**Live App**](https://mern-api-store.onrender.com)

## Tech Stack

### Backend:

- **Node.js** - JavaScript runtime for backend logic
- **Express.js** - Web framework for building APIs
- **MySQL** - Relational database management system
- **dotenv** - Environment variable management
- **mysql2** - MySQL client for Node.js
- **nodemon** - Development tool for auto-restarting the server

### Frontend:

- **React.js** - Component-based UI library
- **Vite** - Fast build tool for modern frontend applications
- **Chakra UI** - Modern UI library for styling components

### Deployment & Hosting:

- **Render** - Web hosting and backend deployment
- **Aiven** - Managed cloud database hosting for MySQL

## Run App Locally

### Prerequisites:

Ensure you have **Node.js**, **npm**, and **MySQL** installed on your system.

### Steps:

1. Set up your **.env** file with:
   ```sh
   DB_HOST=<your_mysql_host>
   DB_USER=<your_mysql_user>
   DB_PASSWORD=<your_mysql_password>
   DB_NAME=<your_database_name>
   DB_PORT=<your_database_port> //default to 3306 for MySQL
   ```
2. Build the app:
   ```sh
   npm run build
   ```
3. Start the app:
   ```sh
   npm sun start
   ```

## API Endpoints

- **GET /api/products** - Fetch all products
- **POST /api/products** - Add a new product
- **PUT /api/products/:id** - Update a product
- **DELETE /api/products/:id** - Remove a product

## Author

**Sebastian Villagomez**