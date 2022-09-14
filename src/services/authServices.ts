import * as authRepository from '../repositories/authRepository'
import { ICreateUserData } from '../repositories/authRepository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function verifyEmailalreadyRegistered(email:string) {

    const result = await authRepository.findEmail(email);

    if(result){
        throw {
            type:"conflict",
            message:"email já cadastrado"
        }
    }
}


export async function createUser(userData:ICreateUserData) {
    
    const hashPassword = bcrypt.hashSync(userData.password,10)

    console.log(`senha criptografada: ${hashPassword}`)

    const result = await authRepository.createNewUser({...userData,password:hashPassword});
    
}

export async function isUserValid(email:string, password:string) {

    const user = await authRepository.findEmail(email);

    let verifyPassword;

    console.log(user)
    if(user){
         verifyPassword = bcrypt.compareSync(password,user.password);
    }

    if(verifyPassword==false){
        throw {
            type: "not_found",
            message: "senha incorreta"
        }
    }

    else{
        return user
    }
}

export async function createToken(user:User){
    
    const secretKey = process.env.JWT_SECRET_KEY ?? ''

    const token = jwt.sign({ userId:user.id }, secretKey)

    console.log(token)

    return token
}

export async function findUserById(userId:number) {

    const result = await authRepository.findById(userId);

    if(!result){
        throw {
            type:"conflict",
            message:"usuario não encontrado"
        }
    }
}