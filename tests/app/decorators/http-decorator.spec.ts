import { faker } from '@faker-js/faker'
import { HttpClient, GetRequest, Param, Body } from '../../../src'

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

    it('should make a get request succesfully', () => {
      @HttpClient({})
      class HttpRequest {
        [x: string]: any

        @GetRequest('http://localhost/:id/')
        async findAll(@Param('id') myId: string, @Body data: any): Promise<any> {}
      }

      const id = faker.random.numeric(8)
      const obj = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        phone: faker.phone.number(),
      };
      
      const httpRequest = new HttpRequest()
      const response = httpRequest.findAll(id, obj)
      expect(response).toStrictEqual([[id], obj])
    })
  })
})