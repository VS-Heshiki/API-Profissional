import { EmailValidator } from './protocols/emailValidator'
import { ValidatorComposite, Validator, ValidatorEmail, ValidatorInputRequired } from '../../src/validator/validations'
import { newLoginValidator } from '../../src/main/factories/controllers/login/loginValidatorFactory'

jest.mock('../../src/validator/validations/validatorComposite')

const newEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid (email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('Login Validator', () => {
    test('Should call Validator Composite with all Validators', () => {
        newLoginValidator()
        const validations: Validator[] = []
        const inputs = ['email', 'password']
        inputs.forEach(input => {
            validations.push(new ValidatorInputRequired(input))
        })
        validations.push(new ValidatorEmail('email', newEmailValidator()))
        expect(ValidatorComposite).toHaveBeenCalledWith(validations)
    })
})
