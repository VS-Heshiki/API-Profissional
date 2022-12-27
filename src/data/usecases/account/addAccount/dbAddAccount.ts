import { AccountModel, AddAccount, AddAccountParams, AddAccountRepository, Hasher, LoadAccountByEmailRepository } from './dbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
    constructor (
        private readonly hasher: Hasher,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    ) {}

    async add (accountData: AddAccountParams): Promise<AccountModel> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
        if (!account) {
            const hashedPassword = await this.hasher.genHash(accountData.password)
            const newAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
            return newAccount
        }
        return null
    }
}