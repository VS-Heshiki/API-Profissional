import { badRequest, serverError, success } from '../../helpers/http/httpHelpers'
import { HttpRequest, HttpResponse, Controller, AddAccount, Validator } from './signUpControllerProtocols'

export class SignUpController implements Controller {
    constructor (
        private readonly addAccount: AddAccount,
        private readonly validator: Validator
        ) {}

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validator.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }

            const { name, password, email } = httpRequest.body

            const account = await this.addAccount.add({
                name,
                email,
                password
            })
            return success(account)
        } catch (err) {
            return serverError(err)
        }
    }
}
