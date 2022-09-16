import app from '../src/app'
import supertest from 'supertest'


describe('Testa POST /signup ', () => {
    it('Deve retornar 201, se cadastrado usuario item no formato correto', async()=>{
      const body={
        title: 'relogio8',
        url: 'https://www.youtube.com.br/',
        description: 'relogio dourado',
        amount: 250
      }
  
      const result = await supertest(app).post('/items').send(body)
  
      const status = result.status
  
      expect(status).toEqual(201)
  
    });
    it('Deve retornar 409, ao tentar cadastrar um item que exista', async()=>{
      const body={
        title: 'relogio',
        url: 'https://www.youtube.com.br/',
        description: 'relogio dourado',
        amount: 250
      }
  
      const result = await supertest(app).post('/items').send(body)
      
      const status = result.status
  
      expect(status).toEqual(409)
    });
  });
    