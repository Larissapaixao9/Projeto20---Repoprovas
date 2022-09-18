import app from '../src/app'
import supertest from 'supertest'
import * as authFactories from '../src/factory/authFactory'
import prisma from '../src/database/database'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testa POST /signup ', () => {
    it('Deve retornar 201, se cadastrado usuario no formato correto', async()=>{
      const body= await authFactories.fixeduser()
  
      const result = await supertest(app).post('/signup').send(body)
  
      const status = result.status
  
      expect(status).toEqual(201)
  
    });

    it('Deve retornar 422, se informações vierem vazias', async()=>{
      const body= await authFactories.emptyLogupInfo()
  
      const result = await supertest(app).post('/signup').send(body)
  
      const status = result.status
  
      expect(status).toEqual(422)
  
    });

    it('Deve retornar 409, ao tentar cadastrar um item que exista', async()=>{
      const body= await authFactories.fixeduser()
  
      await supertest(app).post('/signup').send(body)

      const result = await supertest(app).post('/signup').send(body);
      
      const status = result.status
  
      expect(status).toEqual(409)
    });
  });

  describe('Testa POST /signin', ()=>{
    it('Deve retornar 200 se o login for bem sucedido', async()=>{
      
      const user = await authFactories.fixeduser()

      const body = await authFactories.userLogin()

      await supertest(app).post('/signup').send(user)

      const result = await supertest(app).post('/signin').send(body)

      const status = result.status

      expect(status).toEqual(200)

    })

    it('Deve retornar 404 se a senha digitada estiver incorreta',async()=>{

      const user = await authFactories.fixeduser()

      const body = await authFactories.userLoginWrongPassword()

      await supertest(app).post('/signup').send(user)

      const result = await supertest(app).post('/signin').send(body)

      const status = result.status

      expect(status).toEqual(404)
    })

    it('Deve retornar 401 se email digitado estiver incorreto',async()=>{

      const user = await authFactories.fixeduser()

      const body = await authFactories.userLoginWrongEmail()

      await supertest(app).post('/signup').send(user)

      const result = await supertest(app).post('/signin').send(body)

      const status = result.status

      expect(status).toEqual(404)
    })

    it('Deve retornar 422 se vier informações vazias',async()=>{

      const user = await authFactories.fixeduser()

      const body = await authFactories.userLoginEmpty()

      await supertest(app).post('/signup').send(user)

      const result = await supertest(app).post('/signin').send(body)

      const status = result.status

      expect(status).toEqual(422)
    })
  })

  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE tests`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Testa POST /exam', ()=>{
    it('Deve retornar 201 quando o exame foi criado com sucesso', async()=>{

      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      const exam = await authFactories.examCorrectInfo();

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      //When using Supertest, the result comes as result.body

      const token = loginData.body.token;
      console.log(loginData)

      //using set to send the Authorization Bearer Token correctly
      const sendExam = await supertest(app).post('/exam').send(exam).set("Authorization", `Bearer ${token}`)

      const status = sendExam.status

      expect(status).toEqual(201)

    })

    it('Deve retornar 422 quando informações de criação do exame estiverem no formato errado', async()=>{

      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      const exam = await authFactories.examWrongInfo();

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      //When using Supertest, the result comes as result.body

      const token = loginData.body.token;

      //using set to send the Authorization Bearer Token correctly
      const sendExam = await supertest(app).post('/exam').send(exam).set("Authorization", `Bearer ${token}`)

      const status = sendExam.status

      expect(status).toEqual(422)

    })

    it('Deve retornar 401 quando token vier vazio', async()=>{

      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      const exam = await authFactories.examCorrectInfo();

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      //When using Supertest, the result comes as result.body
      const token = loginData.body.token;

      //using set to send the Authorization Bearer Token correctly
      const sendExam = await supertest(app).post('/exam').send(exam)

      const status = sendExam.status

      expect(status).toEqual(401)

    })

    it('Deve retornar 401 quando vier com Authorization errado', async()=>{

      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      const exam = await authFactories.examCorrectInfo();

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      //When using Supertest, the result comes as result.body

      const token = loginData.body.token;

      //using set to send the Authorization Bearer Token correctly
      const sendExam = await supertest(app).post('/exam').send(exam).set("A", `Bearer ${token}`)

      const status = sendExam.status

      expect(status).toEqual(401)

    })

    it('Deve retornar 500 para demais erros no Token', async()=>{

      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      const exam = await authFactories.examCorrectInfo();

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      //When using Supertest, the result comes as result.body

      const token = loginData.body.token;

      //using set to send the Authorization Bearer Token correctly
      const sendExam = await supertest(app).post('/exam').send(exam).set("Authorization", `Bearer ${''}`)

      const status = sendExam.status

      expect(status).toEqual(500)

    })

  })

  describe('Testa GET /exam/:discipline ', () => {
    it('Deve retornar 200, se digitado disciplines no params', async()=>{
      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      const token = loginData.body.token;

      const result = await supertest(app).get('/exam/discipline').set("Authorization", `Bearer ${token}`)
  
      const status = result.status

      expect(status).toEqual(200)
    });

    it('Deve retornar 404, se rota estiver com nome incorreto', async()=>{
      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      const token = loginData.body.token;

      const result = await supertest(app).get('/exames/discipline').set("Authorization", `Bearer ${token}`)
  
      const status = result.status

      expect(status).toEqual(404)
    });

    it('Deve retornar 404, se não houver parametro params', async()=>{
      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      const token = loginData.body.token;

      const result = await supertest(app).get('/exames').set("Authorization", `Bearer ${token}`)
  
      const status = result.status

      expect(status).toEqual(404)
    });

    it('Deve retornar 404, se parametro discipline do params estiver errado', async()=>{
      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      const token = loginData.body.token;

      const result = await supertest(app).get('/exames/pato').set("Authorization", `Bearer ${token}`)
  
      const status = result.status

      expect(status).toEqual(404)
    });

  });

  describe('Testa GET /exam/:instructure ', () => {
    it('Deve retornar 200, se digitado instructure no params', async()=>{
      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      const token = loginData.body.token;
  
      const result = await supertest(app).get('/exam/instructure').set("Authorization", `Bearer ${token}`)
  
      const status = result.status

      expect(status).toEqual(200)
    });

    it('Deve retornar 404, se rota estiver com nome incorreto', async()=>{
      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      const token = loginData.body.token;

      const result = await supertest(app).get('/exames/instructure').set("Authorization", `Bearer ${token}`)
  
      const status = result.status

      expect(status).toEqual(404)
    });

    it('Deve retornar 404, se não houver parametro params', async()=>{
      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      const token = loginData.body.token;

      const result = await supertest(app).get('/exames').set("Authorization", `Bearer ${token}`)
  
      const status = result.status

      expect(status).toEqual(404)
    });

    it('Deve retornar 404, se parametro discipline do params estiver errado', async()=>{
      const userForLogup = await authFactories.fixeduser()

      const user = await authFactories.userLogin()

      await supertest(app).post('/signup').send(userForLogup)

      const loginData = await supertest(app).post('/signin').send(user);

      const token = loginData.body.token;

      const result = await supertest(app).get('/exames/pato').set("Authorization", `Bearer ${token}`)
  
      const status = result.status

      expect(status).toEqual(404)
    });

  });