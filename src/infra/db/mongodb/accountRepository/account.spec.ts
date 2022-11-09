import { MongoHelper } from '../helper/mongoHelper'
import { AccountMongoRepository } from './account'

beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
})

afterAll(async () => {
    await MongoHelper.disconnect()
})

describe('Account MongoDB Adapter', () => {
    test('Should return an account on success', async () => {
        const sut = new AccountMongoRepository()
        const account = await sut.add({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toEqual('any_name')
        expect(account.email).toEqual('any_email@email.com')
        expect(account.password).toEqual('any_password')
    })
})