//query to create the product table
const query = `create table if not exists products (
                id int primary key auto_increment,
                name varchar(30) not null,
                cost decimal(10,2) not null,
                stock int default 0,
                description varchar(500),
                image varchar(2083));`

/**
 * Helper function that creates the product table in the
 * database using the query.
 * 
 * @param {*} db - The database to be queried.
 */
export const createTable = async (db) => {
    try {
      await db.query(query);
      console.log("Products table ensured.");
    }
    catch (error) {
      console.error("Error creating products table:", error.message);
    }
};