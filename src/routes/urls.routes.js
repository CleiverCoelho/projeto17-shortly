import { Router } from "express"

import validateSchema from "../middlewares/validateSchema.middleware.js"
import { urlsShortenSchema } from "../schemas/urls.schemas.js"
import { getUrlById, openShortUrl, shortUrl } from "../controllers/urls.controllers.js"
import { validateShortUrl, validateUrlId, validateUserToken } from "../middlewares/urls.middleware.js"

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlsShortenSchema), validateUserToken, shortUrl)
urlsRouter.get("/urls/:id", validateUrlId, getUrlById);
urlsRouter.get("/urls/open/:shortUrl", validateShortUrl, openShortUrl);
// customersRouter.post("/customers", validateSchema(customerSchema), validateCustomerCpf, createCustomer)
// customersRouter.put("/customers/:id", validateSchema(customerSchema),validateCustomerCpf,  updateCustomer)

export default urlsRouter