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

export async function getAllExams(){
    const exams = await examRepository.getAllExams();

    const teachersDiscipline = await examRepository.getAllteachersDisciplines()

    //console.log(teachersDiscipline.filter(item=>item.id)

    console.log(exams)

    return exams
}