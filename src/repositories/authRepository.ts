import prisma from "../database/database";
import { User } from "@prisma/client";

export type ICreateUserData = Omit<User, "id"| "create_at">


export async function findEmail(email:string) {
    
    const userEmail = prisma.user.findFirst({where:{email}});

    return userEmail;
}

export async function createNewUser(userData:ICreateUserData) {

    const createdUser = prisma.user.create({data:userData})

    return createdUser;
}

export async function findById(id: number) {
    
    return prisma.user.findUnique({
      where: { id }
    });
  }
