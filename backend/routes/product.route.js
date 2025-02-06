/**
 * This file defines and exports an Express router for managing
 * product related operations. Includes retrieving, creating, 
 * updating, and deleting products.
 * 
 * @author Sebastian Villagomez
 */

/*
 * Import to use Express.
 */
import express from "express";

/*
 * Import controller functions that handle the implementation of the
 * get, post, put, and delete requests.
 */
import { productDelete, productGet, productPost, productPut } from "../controllers/product.controller.js";

/*
 * Creates an Express router instance. Allows the definition of routes for
 * interacting with the products. Using a router helps in modularizing the
 * application by separating routes into logical components.
 */
const router = express.Router();

/*
 * Endpoint for getting all products.
 * Defines what happens when a user sends a GET request to the server for
 * this GET route.
 */
router.get("/", productGet);

/*
 * Endpoint for adding a product.
 * Defines what happens when a user sends a POST request to the server.
 */
router.post("/", productPost);

/*
 * Endpoint for updating a product.
 * Defines what happens when a user sends a PUT request to the server
 * with a desired id.
 */
router.put("/:id", productPut);

/*
 * Endpoint for deleting a product.
 * Defines what happens when a user sends a DELETE request to the server
 * with a desired id.
 */
router.delete("/:id", productDelete);

export default router;