import { LoadSurveyResultController } from '@/presentation/controller/surveyResults/loadSurveyResult/loadSurveyResultController'
import { LoadSurveyById, LoadSurveyResult } from '@/presentation/controller/surveyResults/saveSurveyResult/saveSurveyResultControllerProtocols'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/httpHelpers'
import { mockSurveyResultRequest, throwError } from '@/tests/mocks'
import { mockLoadSurveyById, mockLoadSurveyResult } from '@/tests/presentation/survey/stubs/surveyStubs'

type SutTypes = {
    sut: LoadSurveyResultController
    loadSurveyByIdStub: LoadSurveyById
    loadSurveyResultStub: LoadSurveyResult
}

const newSut = (): SutTypes => {
    const loadSurveyByIdStub = mockLoadSurveyById()
    const loadSurveyResultStub = mockLoadSurveyResult()
    const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub)
    return {
        sut,
        loadSurveyByIdStub,
        loadSurveyResultStub
    }
}

describe('LoadSurveyResult Controller', () => {
    test('Should call LoadSurveyById with correct value', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        const loadByIdSpyOn = jest.spyOn(loadSurveyByIdStub, 'loadById')
        await sut.handle(mockSurveyResultRequest())
        expect(loadByIdSpyOn).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 403 if LoadSurveyById returns null', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(null)
        const httpResponse = await sut.handle(mockSurveyResultRequest())
        expect(httpResponse).toEqual(forbidden(new InvalidParamError('any_survey_id')))
    })

    test('Should return 500 if LoadSurveyById throws', async () => {
        const { sut, loadSurveyByIdStub } = newSut()
        jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockSurveyResultRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should call LoadSurveyResult with correct value', async () => {
        const { sut, loadSurveyResultStub } = newSut()
        const loadByIdSpyOn = jest.spyOn(loadSurveyResultStub, 'load')
        await sut.handle(mockSurveyResultRequest())
        expect(loadByIdSpyOn).toHaveBeenCalledWith('any_survey_id')
    })

    test('Should return 500 if LoadSurveyResult throws', async () => {
        const { sut, loadSurveyResultStub } = newSut()
        jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockSurveyResultRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})