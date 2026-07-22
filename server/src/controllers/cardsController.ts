import type { Request, Response } from "express";
import { getAllCards } from "../models/cardsModel";

export async function getCards(req: Request, res: Response) {
    // If a name query parameter is provided, it will be used to filter the cards by name.
    const cards = await getAllCards(
        req.query.search as string | undefined,
        req.query.color as string | undefined,
        req.query.type as string | undefined,
        req.query.rarity as string | undefined,
        req.query.counter !== undefined ? parseInt(req.query.counter as string) : undefined
    )
    res.json(cards)
}