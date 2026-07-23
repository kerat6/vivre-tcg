import { Router } from "express";
import { getCards, getCardsBatch } from "../controllers/cardsController";

const router = Router()

router.get('/', getCards)
router.get('/batch', getCardsBatch)
    
export default router