import { Request, Response } from 'express'
import { ICreateUserData } from '../repositories/authRepository'; //Interface
import * as authServices from '../services/authServices'

export async function signup(req:Request, res:Response){
    const { email, password, confirmPassword } = req.body
    const userEmailandPassword= {
        email,
        password
    }

try {
    
    const verifyEmailalreadyRegistered = await authServices.verifyEmailalreadyRegistered(email);
    const createUser = await authServices.createUser(userEmailandPassword)



    return res.sendStatus(201)
} catch (error) {
    console.log(error);
    return res.sendStatus(500)
}
}


export async function signin(req:Request, res:Response) {
    const { email, password } = req.body
    try {
        
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}