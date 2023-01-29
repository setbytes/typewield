import { faker } from '@faker-js/faker'
import axios from 'axios'

import { HttpClient, GetRequest, Param, Body, Query } from '../../../src'

describe('Http Decorators', () => {
  describe('@HttpClient', () => {
    it('should add axios instance', () => {
      @HttpClient({ axiosInstance: 'axiosInstance' })
      class HttpRequest {
        [x: string]: any
      }
      const httpRequest = new HttpRequest()
      expect(httpRequest._httpClient).toBe('axiosInstance')
    })

    it('should make a get request succesfully', async () => {
      const axiosInstance = axios.create({})
      @HttpClient({ axiosInstance })
      class HttpRequest {
        @GetRequest('http://localhost:3001/posts/:id')
        async findAll(@Param('id') myId: number, @Body data: any, @Query query: any): Promise<any> {}
      }

      const obj = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        phone: faker.phone.number(),
      };
      
      const httpRequest = new HttpRequest()
      const response = await httpRequest.findAll(1, obj, obj)
      expect(response).toBeTruthy()
      expect(response.statusCode).toBe(200)

    })
  })
})