import { pool } from "../db"

export async function getAllCards() {
    const result = await pool.query('SELECT * FROM cards')
    return result.rows
}