import { Request, Response } from 'express'
import { ICreateUserData } from '../repositories/authRepository'; //Interface
import * as authServices from '../services/authServices'
import { User } from '@prisma/client';
export async function signup(req:Request, res:Response){
    const { email, password, confirmPassword } = req.body

    const userEmailandPassword= {
        email,
        password
    }

    const verifyEmailalreadyRegistered = await authServices.verifyEmailalreadyRegistered(email);
    
    const createUser = await authServices.createUser(userEmailandPassword)

    return res.sendStatus(201)

}


export async function signin(req:Request, res:Response) {
    const { email, password } = req.body

    let token 

    //se queremos usar o errorHandling para erro customizado, não usado try/catch
    // try {
        const verifyuserData = await authServices.isUserValid(email,password);

        const userId = verifyuserData?.id

        if(verifyuserData!=null){
             token = await authServices.createToken(verifyuserData)
        }
        

        return res.status(200).send({token})
    // } catch (error) {
    //     console.log(error)
    //     //return res.sendStatus(500)
    // }
}