import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
/*
 * Loads the environment variables from the .env file. This is used to securely store
 * the database credentials.
 */
import dotenv from 'dotenv';

/*
 * Reads contents of .env files in root directory to access
 * through process.env.
 */
dotenv.config();

/*
 * Defining the port from the .env file.
 * If not defined in .env file, use port 4000.
 */
const PORT = process.env.PORT || 4000;

/* Configures Vite's proxy to forward API requests from 
'localhost:5173/api', to 'localhost:4000/api to avoid CORS issues. */
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:" + PORT
      }
    }
  }
})
