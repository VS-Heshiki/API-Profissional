import { HashCompare } from '../../protocols/cryptography/hashCompare'
import { LoadAccountByEmailRepository } from '../../protocols/db/loadAccountByEmailRepository'
import { Authenticate, AuthenticateModel } from './../../../domain/usecases/authenticate'
import { TokenGenerator } from './../../protocols/cryptography/tokenGenerator'

export class DbAuthenticator implements Authenticate {
    private readonly loadAccountByEmail: LoadAccountByEmailRepository
    private readonly hashCompare: HashCompare
    private readonly tokenGenerator: TokenGenerator

    constructor (
        loadAccountByEmail: LoadAccountByEmailRepository,
        hashCompare: HashCompare,
        tokenGenerator: TokenGenerator
    ) {
        this.loadAccountByEmail = loadAccountByEmail
        this.hashCompare = hashCompare
        this.tokenGenerator = tokenGenerator
    }

    async auth (authenticate: AuthenticateModel): Promise<string> {
        const account = await this.loadAccountByEmail.load(authenticate.email)
        if (account) {
            const compare = await this.hashCompare.compare(authenticate.password, account.password)
            if (compare) {
                const accessToken = await this.tokenGenerator.generate(account.id)
                return accessToken
            }
        }
        return null
    }
}
