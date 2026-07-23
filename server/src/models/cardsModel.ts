import { pool } from "../db"

// This function retrieves all cards from the database, optionally using filters.
export async function getAllCards(search?: string, colors?: string[], type?: string, rarity?: string, counter?: number, baseOnly?: boolean, setId?: string, excludeType?: string) {
    const conditions: string[] = []
    const values: string[] = []

    // If a search term is provided, match it against name, setId, or type
    if (search) {
        values.push(`%${search}%`)
        conditions.push(
            `(card_name ILIKE $${values.length} OR card_set_id ILIKE $${values.length} OR sub_types ILIKE $${values.length})`
        )
    }

    // If a color filter is provided, add it to the query conditions and values.
    if(colors && colors.length > 0) {
        const colorConditions = colors.map(color => {
            values.push(`%${color}%`)
            return `card_color ILIKE $${values.length}`
        })
        conditions.push(`(${colorConditions.join(' OR ')})`)
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

    if (baseOnly) {
        conditions.push(`card_image_id = card_set_id`)
    }
    if (setId) {
        values.push(`${setId}`)
        conditions.push(`set_id = $${values.length}`)
    }

    if (excludeType) {
        values.push(`${excludeType}`)
        conditions.push(`card_type != $${values.length}`)
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


export async function getCardsByImageIds(imageIds: string[]) {
    const placeholders = imageIds.map((_, index) => `$${index + 1}`).join(', ')
    const result = await pool.query(`SELECT * FROM cards WHERE card_image_id IN (${placeholders})`, imageIds)
    return result.rows
}

