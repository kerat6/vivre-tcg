import type { Request, Response } from "express";
import { getAllCards, getCardsByImageIds } from "../models/cardsModel";

export async function getCards(req: Request, res: Response) {
    // If a name query parameter is provided, it will be used to filter the cards by name.
    const cards = await getAllCards(
        req.query.search as string | undefined,
        (req.query.color as string | undefined)?.split(','),
        req.query.type as string | undefined,
        req.query.rarity as string | undefined,
        req.query.counter !== undefined ? parseInt(req.query.counter as string) : undefined,
        req.query.baseOnly === 'true',
        req.query.set as string | undefined,
        req.query.excludeType as string | undefined
    )
    res.json(cards)
}


export async function getCardsBatch(req: Request, res: Response) {
    const ids = (req.query.ids as string)?.split(',') ?? []
    const cards = await getCardsByImageIds(ids)
    res.json(cards)
}