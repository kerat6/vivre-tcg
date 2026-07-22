import type { Request, Response } from "express";
import { getAllCards } from "../models/cardsModel";

export async function getCards(req: Request, res: Response) {
    // If a name query parameter is provided, it will be used to filter the cards by name.
    const cards = await getAllCards(
        req.query.name as string | undefined,
        req.query.color as string | undefined
    )
    res.json(cards)
}