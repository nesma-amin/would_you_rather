import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions'

export default function questions(state={}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return{
                ...state,
                ...action.questions
            }
            break;
        case ANSWER_QUESTION :
               const { authedUser, id, answer, } = action;

      return {
        ...state,
        [id]: {
          ...state[id],
          [answer]: {
            ...state[id][answer],
            votes: state[id][answer].votes.concat([authedUser])
          }
        },

       

    
    
    
    }
    break;
    case ADD_QUESTION :
      const { question } = action

  return {
    ...state,
    [action.question.id]: action.question
    }
break;
        default:
            return state
    }
}