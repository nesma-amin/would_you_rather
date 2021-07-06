import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatDate} from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component{
  
  handleSubmit =()=>{
 
}
    
      render() {
        const { question, users,authedUser,userIds } = this.props
        const { author, timestamp,optionOne ,optionTwo , id, } = question
        const page=((this.props.question.optionOne.votes.includes(authedUser))||
        (this.props.question.optionTwo.votes.includes(authedUser)))?
        `/answeredQuestion/${question.id}`:
        `/unansweredQuestion/${question.id}`;
        console.log(" user",users)
        console.log(" authedUser",authedUser)
        console.log(" this.props.question.optionOne.votes",this.props.question.optionOne.votes)
        console.log(" this.props.question.optionTwo.votes",this.props.question.optionTwo.votes)

        console.log(" this.props.question.optionOne.votes.includes(authedUser)",
        this.props.question.optionOne.votes.includes(authedUser))
        console.log(" this.props.question.optionTwo.votes.includes(authedUser)",
        this.props.question.optionTwo.votes.includes(authedUser))

        console.log("********page", page)

    console.log("Question Props", question)
        if (question === null) {
          return <p>This Question doesn't existd</p>
        }
       
       
        //this variable to filter the answered and unanswered questions
        console.log("author")
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
      console.log("id",id)

      const question =id? questions[id]:null
      console.log("question",question)
      // const temp_authedUser = 'sarahedo'
    console.log("questions.optionOneText",question.optionOne.text)
    console.log("questions.optionTwoText",question.optionTwo.text)
    console.log("users[question.author.name]",question.author)
      return {
        authedUser:authedUser[0],
        userIds: Object.keys(users) ,
        users,
        question: questions[id]

          
        }
      }
      
      export default withRouter(connect(mapStateToProps)(Question)) 
    //export default Question