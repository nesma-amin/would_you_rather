import { getInitialData } from '../utils/api'
import {receiveUsers} from '../actions/users'
import {receiveQuestions} from './questions'
import {setAuthedUser,unsetAuthedUser} from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

// const Authed_ID = null
export function handleInitialData (){
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
        .then(({users, questions})=>{
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
    }
}