import { Router } from "express"

import validateSchema from "../middlewares/validateSchema.middleware.js"
import { signUpSchema } from "../schemas/signUp.schemas.js"
import { signUpUser } from "../controllers/users.cotrollers.js"
import { validateSignUpEmail } from "../middlewares/users.middleware.js"

const usersRouter = Router()

usersRouter.post("/sign-up", validateSchema(signUpSchema), validateSignUpEmail, signUpUser)
// customersRouter.get("/customers/:id", validateGetCustomer, getCustomerById)
// customersRouter.post("/customers", validateSchema(customerSchema), validateCustomerCpf, createCustomer)
// customersRouter.put("/customers/:id", validateSchema(customerSchema),validateCustomerCpf,  updateCustomer)

export default usersRouter