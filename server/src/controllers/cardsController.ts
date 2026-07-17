import type { Request, Response } from "express";
import { getAllCards } from "../models/cardsModel";

export function getCards(req: Request, res: Response) {
    const cards = getAllCards()
    res.json(cards)
}