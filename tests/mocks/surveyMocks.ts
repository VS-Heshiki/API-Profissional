import { SurveyModel } from '@/domain/model/surveyModel'
import { SurveyResultModel } from '@/domain/model/surveyResultModel'
import { AddSurveyParams, SaveSurveyResultParams } from '@/domain/usecases/survey/useCasesSurveyProtocols'

export const mockSurveyData = (): AddSurveyParams => ({
    question: 'any_question',
    answers: [{
        image: 'any_image_1',
        answer: 'any_answer_1'
    }, {
        image: 'other_image_2',
        answer: 'other_answer_2'
    }, {
        image: 'other_image_3',
        answer: 'other_answer_3'
    }],
    date: new Date()
})

export const mockSurvey = (): SurveyModel => {
    return {
        id: 'any_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }
}

export const mockSurveys = (): SurveyModel[] => {
    return [{
        id: 'any_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answer: 'any_answer'
        }],
        date: new Date()
    }, {
        id: 'another_id',
        question: 'another_question',
        answers: [{
            image: 'another_image',
            answer: 'another_answer'
        }],
        date: new Date()
    }]
}

export const mockSurveyResultData = (): SaveSurveyResultParams => {
    return {
        surveyId: 'survey_id',
        accountId: 'account_id',
        answer: 'any_answer',
        date: new Date()
    }
}

export const mockSurveyResult = (): SurveyResultModel => ({
    surveyId: 'any_survey_id',
    question: 'any_question',
    answers: [{
        image: 'any_image',
        answer: 'any_answer',
        count: 1,
        percent: 50
    }, {
        image: 'other_image',
        answer: 'other_answer',
        count: 1,
        percent: 80
    }],
    date: new Date()
})
