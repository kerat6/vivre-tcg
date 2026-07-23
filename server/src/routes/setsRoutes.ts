import { Router } from "express";
import { getSets } from "../controllers/setsController";

const router = Router()

router.get('/', getSets)

export default router