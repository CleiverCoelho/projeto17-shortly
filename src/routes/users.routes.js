import { Router } from "express"

import validateSchema from "../middlewares/validateSchema.middleware.js"
import { signUpSchema } from "../schemas/signUp.schemas.js"
import { signUpUser } from "../controllers/users.cotrollers.js"

const usersRouter = Router()

usersRouter.post("/sign-up", validateSchema(signUpSchema), signUpUser)
// customersRouter.get("/customers/:id", validateGetCustomer, getCustomerById)
// customersRouter.post("/customers", validateSchema(customerSchema), validateCustomerCpf, createCustomer)
// customersRouter.put("/customers/:id", validateSchema(customerSchema),validateCustomerCpf,  updateCustomer)

export default usersRouter