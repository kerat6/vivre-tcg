import { pool } from "../db"

// This function retrieves all cards from the database, optionally using filters.
export async function getAllCards(name?: string, color?: string, type?: string, rarity?: string, counter?: number) {
    const conditions: string[] = []
    const values: string[] = []

    // If a name filter is provided, add it to the query conditions and values.
    if (name) {
        values.push(`%${name}%`)
        conditions.push(`card_name ILIKE $${values.length}`)
    }
    // If a color filter is provided, add it to the query conditions and values.
    if(color) {
        values.push(`%${color}%`)
        conditions.push(`card_color ILIKE $${values.length}`)
    }

    // If a type filter is provided, add it to the query conditions and values.
    if(type) {
        values.push(`${type}`)
        conditions.push(`card_type = $${values.length}`)
    }

    // If a rarity filter is provided, add it to the query conditions and values.
    if(rarity) {
        values.push(`${rarity}`)
        conditions.push(`rarity = $${values.length}`)
    }

    // If a counter filter is provided, add it to the query conditions and values.
    if(counter !== undefined) {
        values.push(counter.toString())
        conditions.push(`counter_amount = $${values.length}`)
    }

    // Construct the SQL query based on the provided filters.
    let query = 'SELECT * FROM cards'
    if(conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ')
    }
    query += ' ORDER BY set_id, card_set_id'

    const result = await pool.query(query, values)
    return result.rows
}
