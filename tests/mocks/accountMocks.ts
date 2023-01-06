import { AccountModel } from '@/domain/model/accountModel'
import { AddAccount, Authenticate } from '@/domain/usecases/account/useCasesAccountProtocols'
import { faker } from '@faker-js/faker'

export const mockAddAccountData = (): AddAccount.Params => ({
    name: 'any_name',
    email: 'any_mail@email.com',
    password: 'any_password'
})

export const mockAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_mail@email.com',
    password: 'hashed_password'
})

export const mockAuthenticate = (): Authenticate.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})
