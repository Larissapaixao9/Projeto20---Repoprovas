import prisma from "../database/database";
import { Test } from "@prisma/client";

//Interface para teste
export type Itest = Omit<Test, "id"| "create_at"> 

export  async function getdisciplineInstructureId(disciplineId:number, instructureId:number){
    const   teanderANDDisciplineId = await prisma.teachersDiscipline.findFirst({where:{
        "disciplineId":disciplineId,
        "teacherId":instructureId
    }})

    
    return teanderANDDisciplineId;
}

export async function createExam(teacherDisciplineId:any, name:string, pdfUrl:string, categoryId:number) {
    console.log('chegou no repositorio de criação')

    
    const { id } = teacherDisciplineId
    console.log(teacherDisciplineId.id)
    const result = await prisma.test.create({
        data:{
            name,
            pdfUrl,
            categoryId,
            "teacherDisciplineId":id
        }
    })

    return result
}

export async function getAllExams(){
    const exams = await prisma.test.findMany();

    return exams;
}

export async function getAllExamsDisciplines(){
    const result = await prisma.term.findMany({
        include:{
            discipline:{
                include:{
                    teacherDiscipline:{
                        include:{
                            teacher:true,
                            test:{
                                include:{
                                    test_Category_Relation:true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return result;
}

export async function getExamsByInstructor(){
    const result = await prisma.teachersDiscipline.findMany({
        include:{
            teacher:true,
            discipline:true,
            test:{
                include:{
                    test_Category_Relation:true
                }
            }
        }
    })

    return result
}