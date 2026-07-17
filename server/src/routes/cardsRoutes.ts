import { Router } from "express";
import { getCards } from "../controllers/cardsController";

const router = Router()

router.get('/', getCards)

export default router