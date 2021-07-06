import React, {Component} from 'react'
import {connect} from 'react-redux'
import { formatDate} from '../utils/helpers'
import Progress from 'react-progressbar';
import { Redirect } from 'react-router-dom'


class AnsweredQuestion extends Component{
    
      render() {
        const { question, users,authedUser } = this.props
        console.log("Question Props", question)
        if (question === null) {
          return <p>This Question doesn't existd</p>
        }
        if (question===undefined) {
          return <Redirect to= {`/notFound`} />
        }
        const {author, timestamp,optionOne ,optionTwo , id, } = question
        const loggedUser = authedUser;
        console.log("")
        const avatar = users[authedUser].avatarURL
        const styles = {
            border: '1px solid rgba(0, 0, 0, 0.09)', 
            borderColor: 'blue'
       };
       const percentage = ((optionOne.votes.length)*100)/(optionOne.votes.length + optionTwo.votes.length)
       const AuthedUserselection = (this.props.question.optionOne.votes.includes(authedUser))?
       this.props.question.optionOne.text:
       this.props.question.optionTwo.text
       console.log("authedUser[0]",authedUser)
       console.log("(this.props.question.optionOne.votes.includes(authedUser[0]))",
       (this.props.question.optionOne.votes.includes(authedUser[0])))
       console.log("(this.props.question.optionTne.votes.includes(authedUser[0]))",
       (this.props.question.optionTwo.votes.includes(authedUser[0])))
        return (
            <div>
            <img
              src={avatar}
              alt={`Avatar of ${authedUser}`}
              className='avatar'
            />
            <div className='question-info'>
              <div>
                
                <span>{authedUser}</span>
                <div>{formatDate(timestamp)}</div>
              {/* <Form> */}
                <div className='option-one' style={styles}>
                  <div> You Selected Option: {AuthedUserselection}</div>
                  <div> Would You Rather...?</div>
                  <div>
                  <input type="radio" value={optionOne.text} checked={optionOne.text===AuthedUserselection}/>{optionOne.text}
                  <Progress completed={percentage}><div>{percentage}%</div></Progress>
                  <p>{optionOne.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes</p>
                  </div>
                  <div>
                  <input type="radio" value={optionTwo.text} checked={optionTwo.text===AuthedUserselection}/>{optionTwo.text}
                  <Progress completed={100-percentage}> <div>{100-percentage}%</div></Progress>
                <p>{optionTwo.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes</p>
                </div>



               
{/* </Form> */}
               </div>
               
              </div>

            </div>
            </div>
        )
      }
    }
    
    function mapStateToProps ( {authedUser,questions,users},props) {
        const { id } = props.match.params
      const question = questions[id]
      if (questions[id]===undefined) {
        return <Redirect to= {`/notFound`} />
      }
    console.log("id",id)
    console.log("questions",questions)
    console.log("users[question.author.name]",question.author)
      return {
        authedUser:authedUser[0],
        users,
        question: question

          
        }
      }
      
    //   export default withRouter(connect(mapStateToProps)(AnsweredQuestion)) 
    export default connect(mapStateToProps)(AnsweredQuestion)