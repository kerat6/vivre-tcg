import { pool } from "../db"

export async function getAllCards() {
    const result = await pool.query('SELECT * FROM cards ORDER BY card_set_id')
    return result.rows
}