/**
 * Provides a global state and functions for CRUD
 * operations (create, read, update, delete). Zustand
 * is used to create and manage state. 
 * 
 * @author Sebastian Villagomez
 */
import { create } from 'zustand';

export const useStore = create((set) => ({  //returning an object
    //State variable that stores all products in an array. 
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        try {
            if(!newProduct.name)
                return {success:false, message:"Product must have a name."}
            //ensure the cost is properly formatted
            newProduct = { 
                ...newProduct, 
                cost: parseFloat(newProduct.cost).toFixed(2)
            };
            if(!newProduct.cost || isNaN(newProduct.cost) || newProduct.cost <= 0)
                return {success:false, message:"Please provide a valid cost. Must be greater than zero."}
            if(newProduct.stock==="")
                newProduct.stock = 0;
            else if(isNaN(newProduct.stock))
                return {success:false, message:"Stock must be a valid number."}
            const res = await fetch("/api/products", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newProduct)
            })
            const data = await res.json();
            if(!data.success)
                return { success: false, message: data.message };
            set((state) => ({ products: [...state.products, data.data]}))
            return { success:true, message:"Product added successfully." }
        }
        catch (error) {
            return { success:false, message: error.message };
        }
    },
    getProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: Array.isArray(data.data) ? data.data : [] });
    },
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if(!data.success)
            return { success: false, message: data.message };

        set((state) => ({ products: state.products.filter(product => product.id !== pid) })); //this line updates UI immediately, w/o refresh
        return { success: true, message: data.message };
    },
    updateProduct: async (pid, updatedProduct) => {
        try {
            if(!updatedProduct.name)
                return {success:false, message:"Product must have a name."}
            //ensure the cost is properly formatted
            updatedProduct = { 
                ...updatedProduct, 
                cost: parseFloat(updatedProduct.cost).toFixed(2)
            };
            if(!updatedProduct.cost || isNaN(updatedProduct.cost) || updatedProduct.cost <= 0)
                return {success:false, message:"Please provide a valid cost. Must be greater than zero."}
            if(updatedProduct.stock==="" || isNaN(updatedProduct.stock))
                updatedProduct.stock = 0;
            if(!updatedProduct.image)
                updatedProduct.image = "https://images.unsplash.com/photo-1557821552-17105176677c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHNob3BwaW5nJTIwYmFnfGVufDB8MHwwfHx8Mg%3D%3D";
        
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            });
            const data = await res.json();
            if(!data.success)
                return { success: false, message: data.message };

            //update ui immediately
            set((state) => ({
                products: state.products.map((product) => (product.id === pid ? data.data : product))
            }));

            return { success: true, message: data.message };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
}));