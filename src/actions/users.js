export const RECEIVE_USERS= 'RECEIVE_USERS'
export const ADD_USER_ANSWER= 'ADD_USER_ANSWER'
export const ADD_USER_Question= 'ADD_USER_Question'
export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function addUserAnswer(users,id,authedUser,answer){
    return {
        type: ADD_USER_ANSWER,
        users,
        id,
        authedUser:authedUser[0],
        answer
    }
}

export function addUserQuestion(question){
    return {
        type: ADD_USER_Question,
        question
    }
}