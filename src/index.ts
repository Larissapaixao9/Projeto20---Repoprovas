import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import "express-async-errors"
import router from '../src/routes/index'
import { errorHanddlingMiddleware } from '../src/middlewares/errorHandlingMiddleware'

dotenv.config()

const PORT = process.env.PORT
const app = express()

//middlewares:
app.use(cors());
app.use(express.json())
app.use(router)
app.use(errorHanddlingMiddleware)



app.listen(PORT, ()=>console.log(`listening on PORT ${PORT}` ))