import { pool } from "../db"

async function importCards() {
    const response = await fetch("https://optcgapi.com/api/allSetCards/")
    const cards = await response.json()

    for (const card of cards) {
        const cardCost = /^\d+$/.test(card.card_cost) ? Number(card.card_cost) : null

        try {
            await pool.query(
                `INSERT INTO cards (card_name, card_set_id, card_color, card_image, card_image_id, sub_types, market_price, set_id, card_type, card_cost, counter_amount, rarity)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [
                    card.card_name,
                    card.card_set_id,
                    card.card_color,
                    card.card_image,
                    card.card_image_id,
                    card.sub_types,
                    card.market_price,
                    card.set_id,
                    card.card_type,
                    cardCost,
                    card.counter_amount,
                    card.rarity,
                ]
            )
        } catch (error) {
            console.error(`Error Importing card ${card.card_set_id}: `, error)
        }
    }

    console.log(`Imported ${cards.length} cards.`)
    await pool.end()
}

importCards()