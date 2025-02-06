/**
 * This file defines and exports the controller functions for managing
 * products in the database. Includes all logic for handling user
 * HTTP requests.
 * 
 * @author Sebastian Villagomez
 */

/*
 * Import the database pool from db.js to connect to database.
 */
import pool from '../config/db.js';

/**
 * Handles GET requests sent to the server. Should get all products
 * available in the database.
 * 
 * @param {*} req the user request, none expected.
 * @param {*} res the response.
 * @returns the products from the database.
 */
export const productGet = async (req, res) => {
    try {
        const [result] = await pool.query("select * from products");
        //if no rows were selected, that means no products found
        if (result.length == 0)
            return res.status(404).json({ success:false, message:"Products not found." });
        res.status(200).json({ success:true, data:result });
    }
    catch(error) {
        res.status(500).json({ success:false, message:"Server Error" });
    }
}

/**
 * Handles POST requests sent to the server. Should add a
 * product to the database. All fields will be checked and the
 * non-required fields will be filled with default values.
 * 
 * @param {*} req the product requested.
 * @param {*} res the response.
 * @returns whether or not the product was added successfully.
 */
export const productPost = async (req,res) => {
    const product = req.body;    //data sent by user

    //check to make sure required fields are provided
    if (!product.name || !product.cost)
        return res.status(400).json({ success:false, message:"Please provide the name and cost of the product." });

    try {
        const cost = parseFloat(product.cost);
        if(cost <= 0)
            return res.status(400).json({ success:false, message:"Cost must be a valid decimal number." })
        if(!product.stock)
            product.stock = 0;
        if(product.description && product.description.length > 500)
            return res.status(400).json({ success:false, message:"Description cannot exceed 500 characters." })
        if(!product.image)
            product.image = "https://images.unsplash.com/photo-1557821552-17105176677c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHNob3BwaW5nJTIwYmFnfGVufDB8MHwwfHx8Mg%3D%3D";

        //Insert information into the databse
        const [result] = await pool.query(
            "insert into products (name, cost, stock, description, image) values (?,?,?,?,?)", [product.name, cost, product.stock, product.description, product.image]
        );
        res.status(201).json({ success:true, data:{ id:result.insertId, name:product.name, cost: cost, stock: product.stock, description: product.description, image: product.image } });
        console.log("Product added successfully.");
    }
    catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success:false, message:"Server Error" });
    }
}

/**
 * Hanldes PUT requests sent to the server. Should provide an id
 * and update the product based on the values specified.
 * 
 * @param {*} req the update request.
 * @param {*} res the response.
 * @returns whether or not the update was successful.
 */
export const productPut = async (req, res) => {
    const product = req.body;
    const { id } = req.params;
    try{
        //get the original values for the product
        const [original] = await pool.query("select * from products where id = ?", [id]);
        if (original.length == 0)
            return res.status(404).json({ success:false, message:"Product not found." });

        if(product.description && product.description.length > 500)
            return res.status(400).json({ success:false, message:"Description cannot exceed 500 characters." })
        
        //finding the desired updates
        const updates = {
            name: product.name || original[0]['name'],
            cost: product.cost || original[0]['cost'],
            stock: product.stock === 0 ? 0 : product.stock ||original[0]['stock'],
            description: product.description,
            image: product.image
        };
        await pool.query("update products set name = ?, cost = ?, stock = ?, description = ?, image = ? where id = ?", [updates.name, updates.cost, updates.stock, updates.description, updates.image, id]);
        res.status(200).json({ success:true, data:{
            id:parseInt(id, 10),
            name:updates.name,
            cost:updates.cost,
            stock:updates.stock,
            description:updates.description,
            image:updates.image
        }});
    }
    catch (error) {
        console.log("Unable to update product:", error.message);
        res.status(500).json({ success:false, message:"Error updating product." });
    }
}

/**
 * Handles DELETE requests sent to the server. Should provide an id
 * and delete the specified product.
 * 
 * @param {*} req the request to delete the product.
 * @param {*} res the response.
 * @returns whether or not the product was deleted successfully.
 */
export const productDelete = async (req,res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("delete from products where id = ?", [id]);
        //if no rows were affected, that means id was not found
        if (result.affectedRows == 0)
            return res.status(404).json({ success:false, message:"Product not found." });
        res.status(200).json({ success:true, message:"Product Deleted Successfully." });
    }
    catch(error) {
        res.status(500).json({ success:false, message:"Product not deleted successfully." });
    }
}