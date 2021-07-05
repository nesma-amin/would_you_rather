import {RECEIVE_USERS} from '../actions/users'
import {ADD_USER_ANSWER,ADD_USER_Question} from '../actions/users'

export default function users(state={}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return{
                ...state,
                ...action.users
            }
            break;
            case ADD_USER_ANSWER:
                const { authedUser, id,answer } = action;
                console.log('answer ', {answer})
                console.log('authedUser ',{ authedUser})
                console.log('id', {id})
            return{
                ...state[id],
            [authedUser]: {
              ...state[authedUser],
              answers: {
                ...state[authedUser].answers,
                [id]: answer
              }
            }
            }
            break;

            case ADD_USER_Question:
                const author= action.question.author; 
                console.log('************action.question ', action.question)

            return{

                    ...state,
                    [author]: {
                      ...state[author],
                      questions: state[author].questions.concat([action.question.id])
                    }
                  
            }
            break;
        default:
            return state
    }
}