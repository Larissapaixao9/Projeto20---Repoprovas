import * as examRepository from '../repositories/examRepositories'

export async function findTeacherDisciplineId(disciplineId:number, instructureId:number){

    const teacherDisciplineId = await examRepository.getdisciplineInstructureId(disciplineId, instructureId);

    console.log(teacherDisciplineId)

    if(!teacherDisciplineId){
        throw{
            type:"not_found",
            message:"não existe professor e disciplina com esses dados"
        }
    }

   return teacherDisciplineId;
}

export async function createExam(teacherDisciplineId:any, name:string, pdfUrl:string, categoryId:number) {

    const creatingExam = await examRepository.createExam(teacherDisciplineId, name, pdfUrl, categoryId);

    console.log(createExam)
    
    return createExam
}

export async function getAllExams(paramsData:string){

    if(paramsData!='discipline'){
        throw{
            type:"not_found",
            message:"erro no parametro do params"
        }
    }

    const teachersDiscipline = await examRepository.getAllExamsDisciplines()

    console.log(teachersDiscipline)

    return teachersDiscipline
}

export async function getExamsByInstructor(paramsData:string){

    if(paramsData!='instructure'){
        throw{
            type:"not_found",
            message:"erro no parametro do params"
        }
    }

    const exams = await examRepository.getExamsByInstructor();

    console.log(exams)

    return exams
}