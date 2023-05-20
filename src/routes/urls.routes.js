import { Router } from "express"

import validateSchema from "../middlewares/validateSchema.middleware.js"
import { urlsShortenSchema } from "../schemas/urls.schemas.js"
import { shortUrl } from "../controllers/urls.controllers.js"
import { validateUserToken } from "../middlewares/urls.middleware.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlsShortenSchema), validateUserToken, shortUrl)
// usersRouter.post("/sign-in", validateSchema(signInSchema), validateSignIn,signInUser)
// customersRouter.post("/customers", validateSchema(customerSchema), validateCustomerCpf, createCustomer)
// customersRouter.put("/customers/:id", validateSchema(customerSchema),validateCustomerCpf,  updateCustomer)

export default urlsRouter