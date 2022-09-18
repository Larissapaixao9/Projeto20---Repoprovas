import express from 'express'
import { Request, Response } from 'express'
import * as examServices from '../services/examServices'

export async function AddNewExam(req:Request, res:Response) {
    
    const { disciplineId, instructureId } = req.body;

    const { name, pdfUrl, categoryId } = req.body;

    const teacherDisciplineId = await examServices.findTeacherDisciplineId(disciplineId, instructureId);

    const createExam = await examServices.createExam(teacherDisciplineId, name, pdfUrl, categoryId)
    

    return res.sendStatus(201)
}


export async function getExamsByDiscipline(req:Request, res:Response) {

    const paramsData = req.params.discipline;

    const allExams = await examServices.getAllExams(paramsData)

    return res.status(200).send(allExams)
}


export async function getExamsByInstructor(req:Request, res:Response) {

    const paramsData = req.params.instructure;

    const allExams = await examServices.getExamsByInstructor(paramsData)

    return res.status(200).send(allExams)
}
