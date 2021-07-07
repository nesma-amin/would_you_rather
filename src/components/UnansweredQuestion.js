import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatDate} from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import { addUserAnswer } from '../actions/users'

import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'



class UnansweredQuestion extends Component{
  constructor() {
    super();
    this.state = {
      selectedOption: '',
    toHome: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  static propTypes = {
    // users: PropTypes.array.isRequired,
    
    // questions: PropTypes.func.isRequired,
  }

    handleSubmit =(e)=>{

        e.preventDefault()

        const { dispatch, authedUser,question,users} = this.props
        const id = question.id
 
        dispatch(handleAnswerQuestion(authedUser,id,this.state.selectedOption)).then 
        (()=>dispatch(addUserAnswer(users,id,authedUser, this.state.selectedOption)))
        
    
        this.setState(() => ({
              toHome: true,

          })) 
    }
    handleChange=(e)=>{
      this.setState({selectedOption: e.target.value})


    }
  
   
      render() {
        const { question, users } = this.props

        if (question===undefined) {
          return <Redirect to= {`/notFound`} />
        }
        const {
          author, timestamp,optionOne ,optionTwo , id, 
        } = question

          if (this.state.toHome === true) {
        return <Redirect to= {`/AnsweredQuestion/${id}`} />
      }
        if (question === null) {
          return <p>This Question doesn't existd</p>
        }

        const avatar = users[author].avatarURL
        return (
            <div>
            <img
              src={avatar}
              alt={`Avatar of ${author}`}
              className='avatar'
            />
            <div className='question-info'>
              <div >
                
                <span>{author}</span>
                <div>{formatDate(timestamp)}</div>
                <div >
                <h3>Would You Rather?</h3>
                <div >
                <label>
                <input type="radio" value="optionOne"  
                  onChange={this.handleChange}/> {optionOne.text}
                </label>
                </div>
                    <div >
                    <label>
                    <input type="radio" value="optionTwo" 
                    onChange={this.handleChange}/>{optionTwo.text}
                    </label>
                    </div>
                </div>
                <div></div>
                <button className='center' onClick={this.handleSubmit.bind(this)}>
                    Submit Answer
                    </button>
               
            </div>
            </div>
            </div>
            // </Link>
        )
      }
    }
    
    function mapStateToProps ( {authedUser,questions,users},props) {
      const { id } = props.match.params
      if (questions[id]===undefined) {
        return <Redirect to= {`/notFound`} />
      }

      return {
        authedUser,
        users,
        question: questions[id]
          
        }
      }
      
      export default withRouter(connect(mapStateToProps)(UnansweredQuestion))
