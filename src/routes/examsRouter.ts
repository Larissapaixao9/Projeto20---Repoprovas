import { Router } from 'express'

import { AddNewExam } from '../controllers/examController'

import { examSchema } from '../schemas/examSchema';

import { validateSchema } from '../middlewares/validateSchema';

import tokenValidatorMiddleware from "../middlewares/tokenValidatorMiddleware";

const examsRouter = Router();


examsRouter.post('/exam',validateSchema(examSchema),tokenValidatorMiddleware,AddNewExam)

examsRouter.get('/exam')




export default examsRouter;