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