import { Router } from "express"

import validateSchema from "../middlewares/validateSchema.middleware.js"
import { signUpSchema, signInSchema } from "../schemas/users.schemas.js"
import { signUpUser, signInUser } from "../controllers/users.cotrollers.js"
import { validateSignUpEmail, validateSignIn } from "../middlewares/users.middleware.js"
import { getAllUsers } from "../controllers/urls.controllers.js"

const usersRouter = Router()

usersRouter.post("/sign-up", validateSchema(signUpSchema), validateSignUpEmail, signUpUser)
usersRouter.post("/sign-in", validateSchema(signInSchema), validateSignIn,signInUser)
usersRouter.get("/users", getAllUsers)

// customersRouter.post("/customers", validateSchema(customerSchema), validateCustomerCpf, createCustomer)
// customersRouter.put("/customers/:id", validateSchema(customerSchema),validateCustomerCpf,  updateCustomer)

export default usersRouter