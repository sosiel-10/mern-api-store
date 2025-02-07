# Full-Stack Project

## Overview

This is a full-stack web application utilizing the **MERN** stack alongside **MySQL** for database management. The project is built with **MySQL, Express.js, React.js, and Node.js** and styled using **Chakra UI**. The frontend is powered by **Vite** for a fast and optimized development experience. The project is deployed on **Render** and is accessible at:

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

## Installation & Setup

### Prerequisites:

Ensure you have **Node.js**, **npm**, and **MySQL** installed on your system.

### Steps:

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd full-stack-project
   ```
2. Install backend dependencies:
   ```sh
   npm install
   ```
3. Set up your **.env** file in the `backend/` directory with:
   ```sh
   DB_HOST=<your_mysql_host>
   DB_USER=<your_mysql_user>
   DB_PASSWORD=<your_mysql_password>
   DB_NAME=<your_database_name>
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```
5. Navigate to the frontend directory and install dependencies:
   ```sh
   cd frontend
   npm install
   ```
6. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Build & Deployment

To build the frontend and backend for production, run:

```sh
npm run build
```

To start the application in production mode:

```sh
npm start
```

## API Endpoints

- **GET /api/products** - Fetch all products
- **POST /api/products** - Add a new product
- **GET /api/products/****:id** - Fetch a single product by ID
- **PUT /api/products/****:id** - Update a product
- **DELETE /api/products/****:id** - Remove a product

## Author

**Sebastian Villagomez**