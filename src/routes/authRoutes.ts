import express from 'express'
import { signup, signin } from '../controllers/authController'
import { validateSchema } from '../middlewares/validateSchema'
import { signinSchema } from '../schemas/signinSchema'
import { signupSchema } from '../schemas/signupSchema'
const authRouter = express.Router()


authRouter.post('/signup',validateSchema(signupSchema),signup)
authRouter.post('/signin',validateSchema(signinSchema), signin)




export default authRouter
