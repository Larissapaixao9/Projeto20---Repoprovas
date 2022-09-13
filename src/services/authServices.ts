import * as authRepository from '../repositories/authRepository'
import { ICreateUserData } from '../repositories/authRepository';
import bcrypt from 'bcrypt'

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