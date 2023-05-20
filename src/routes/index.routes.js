import { Router } from "express"
import gamesRouter from "./games.routes.js"
import rentalsRouter from "./rentals.routes.js"
import usersRouter from "./users.routes.js"

const router = Router()
router.use(usersRouter)
router.use(gamesRouter)
router.use(rentalsRouter)

export default router