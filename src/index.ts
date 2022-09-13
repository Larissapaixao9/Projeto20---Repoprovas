import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import "express-async-erros"

dotenv.config()

const PORT = process.env.PORT
const app = express()

//middlewares:
app.use(cors());
app.use(express.json())




app.listen(PORT, ()=>console.log(`listening on PORT ${PORT}` ))