import type { Request, Response } from "express";
import { getAllCards } from "../models/cardsModel";

export async function getCards(req: Request, res: Response) {
    const cards = await getAllCards()
    res.json(cards)
}