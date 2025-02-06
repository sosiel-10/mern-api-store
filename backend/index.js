/**
 * Sets up a basic Express.js server and establishes connection
 * to MySQL database.
 * Routes are designed and implemented to handle user requests
 * to the server.
 * 
 * @author Sebastian Villagomez
 */

/*
 * Import Express.js framework to create and manage server.
 */
import express from 'express';

/*
 * Import the database pool and connection() function from db.js to
 * manage database connection.
 */
import pool, { connection } from './config/db.js';

/*
 * Import the createTable() from product.table.js to create the
 * product table in the database.
 */
import { createTable } from './tables/product.table.js';

/*
 * Import the Express router from product.route.js to use the defined routes.
 * Helps modularize the code by separating route definitions.
 */
import productRoutes from './routes/product.route.js';

/*
 * Loads the environment variables from the .env file. This is used to securely store
 * the database credentials.
 */
import dotenv from 'dotenv';

//for deployment
import path from 'path';

/*
 * Reads contents of .env files in root directory to access
 * through process.env.
 */
dotenv.config(); 

/*
 * Creates an Express application instance.
 * This is used to define routes and server behavior.
 */
const app = express();

/*
 * Defining the port from the .env file.
 * If not defined in .env file, use port 4000.
 */
const PORT = process.env.PORT || 4000;

//for deployment
/* Get the absolute path of the current working directory. */
const __dirname = path.resolve();

/*
 * Middleware to parse and accept JSON data in Express.
 * Used to ensure req.body is properly populated.
 */
app.use(express.json());

/*
 * Register the product routes under the /api/products/ endpoint.
 * Assures any request starting with /api/products will be routed to
 * the logic in product.route.js.
 */
app.use("/api/products", productRoutes)

//for deployment
/* Ensure static files are only served when app is running in production. */
if(process.env.NODE_ENV === "production") {
    //Tell express to use static files from the frontend/dist directory instead of API routes
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    //'catch-all route' to handle any request not matched by API routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

/*
 * Starts the server and listens for incoming connections on port 4000
 */
app.listen(PORT, () => {
    //connects to database
    connection();
    //create the Product table in the database
    createTable(pool);
    console.log("Server started on http://localhost:" + PORT);
});