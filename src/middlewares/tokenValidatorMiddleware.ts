import { Request, Response, NextFunction, response } from "express"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
//import { number } from "joi";
import * as authService from '../services/authServices'

//dotenv.config()

export default function tokenValidatorMiddleware(
    req:Request,
    res:Response,
    next:NextFunction
){
    const authorization = req.headers['authorization'];

    if (!authorization) throw {
        type:"unauthorized",
        message:"Faltando Authorization"
    }

    const token = authorization.replace('Bearer ', '');

    if (!token) throw  {
        type:"unauthorized",
        message:"Faltando Authorization"
    }

    try {
            //getting the jwtSecret String from environment variables
    const jwtSecret = process.env.JWT_SECRET_KEY ?? '';

    //verify if token is valid and getting the id
    const { userId } =  jwt.verify(token, jwtSecret) as { userId:number }

    if(userId!=null){

        //compare id stored as payload in Token with the user in database
        const user =  authService.findUserById(userId)

        //using locals to save the user and pass it to controller
        res.locals.user = user

    }


    next()
    } catch (error) {
        return res.status(500).send('token Error')
    }

}