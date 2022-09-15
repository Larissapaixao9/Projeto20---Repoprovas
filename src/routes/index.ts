import { Router } from "express";

import authRouter from './authRoutes'
import examsRouter from "./examsRouter";


const router = Router()

router.use(authRouter)
router.use(examsRouter)





export default router