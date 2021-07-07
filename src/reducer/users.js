import {RECEIVE_USERS} from '../actions/users'
import {ADD_USER_ANSWER,ADD_USER_Question} from '../actions/users'

export default function users(state={}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return{
                ...state,
                ...action.users
            }
            case ADD_USER_ANSWER:
                const { authedUser, id,answer } = action;
            return{
                ...state,
            [authedUser]: {
              ...state[authedUser],
              answers: {
                ...state[authedUser].answers,
                [id]: answer
              }
            }
            }

            case ADD_USER_Question:
                const author= action.question.author; 

            return{

                    ...state,
                    [author]: {
                      ...state[author],
                      questions: state[author].questions.concat([action.question.id])
                    }
                  
            }
        default:
            return state
    }
}