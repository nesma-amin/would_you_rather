import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { addUserQuestion } from '../actions/users'



export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOne, OptionTwo, authedUser) {
  return (dispatch, getState) => {
    console.log("***authedUser",authedUser)
    dispatch(showLoading())
    console.log("optionOneText",optionOne)
    console.log("optionTwoText",OptionTwo)
    console.log("author",authedUser)
    return saveQuestion({
      optionOneText:optionOne,
      optionTwoText:OptionTwo,
      author:authedUser[0],

    })
      .then((question) => dispatch(addQuestion(question)))
      .then((question) => dispatch(addUserQuestion(question.question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function answerQuestion ( id,authedUser,answer) {
  return {
    type: ANSWER_QUESTION,
    id,
    answer,
    authedUser:authedUser[0],
   
  }
}

export function handleAnswerQuestion (authedUser, id,answer) {
  return (dispatch) => {
    dispatch(showLoading())
    console.log("author",authedUser)
    console.log('id', {id})

    return saveQuestionAnswer({
      authedUser:authedUser[0],
      qid:id,
      answer

    })
      .then(() => dispatch(answerQuestion(id, authedUser,answer)))
      .then(() => dispatch(hideLoading()))
  }
}