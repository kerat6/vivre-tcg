import { pool } from "../db"

// This function retrieves all sets from the database
export async function getAllSets() {
 // Construct the SQL query to select distinct set names and IDs from the cards table
    const result = await pool.query("SELECT DISTINCT set_id, set_name FROM cards ORDER BY set_id")
    
    return result.rows
}