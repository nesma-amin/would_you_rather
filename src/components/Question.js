import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatDate} from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component{
  
  handleSubmit =()=>{
 
}
    
      render() {
        const { question, users,authedUser } = this.props
        const { author, timestamp,optionOne ,optionTwo  } = question
        const page=((this.props.question.optionOne.votes.includes(authedUser))||
        (this.props.question.optionTwo.votes.includes(authedUser)))?
        `/answeredQuestion/${question.id}`:
        `/unansweredQuestion/${question.id}`;
        
        if (question === null) {
          return <p>This Question doesn't existd</p>
        }
              
        const avatar = users[author].avatarURL
        return (
            <Link to={page} className='question'>
            <div className='question'>
            <img
              src={avatar}
              alt={`Avatar of ${author}`}
              className='avatar'
            />
            <div className='question-info'>
              <div>                
                <span>{author}</span>
                <div>{formatDate(timestamp)}</div>
                <h3>Would You Rather?</h3>
                <p>- {optionOne.text}</p>
                <p>-----OR----</p>
                <p>- {optionTwo.text}</p>
                <button className='center' onClick={this.handleSubmit}>
                    View Question
                    </button>
                    </div>
            </div>
            </div>
            </Link>
        )
      }
    }
    
    function mapStateToProps ( {authedUser,questions,users},{id}) {
      // const question =id? questions[id]:null
      return {
        authedUser:authedUser[0],
        userIds: Object.keys(users) ,
        users,
        question: questions[id]

          
        }
      }
      
      export default withRouter(connect(mapStateToProps)(Question)) 
