import type { Request, Response } from "express";
import { getAllSets } from "../models/setsModel";

export async function getSets(req: Request, res: Response) {
    const sets = await getAllSets()
    res.json(sets)
}