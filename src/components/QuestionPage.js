import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import NewQuestion from './NewQuestion'

class QuestionPage extends Component {
  render() {
    const { id, authedUser,question } = this.props
    console.log("id",id)
    console.log("authedUser",authedUser)
    console.log("questions",question)
    return (
      <div>
        <Question id={id} />
        {/* <NewQuestion id={id} /> */}
      
        {/* {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet id={replyId}/>
            </li>
          ))}
        </ul> */}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions }, props) {
    const { id } = props.match.params

  return {
    id,
    authedUser,
    question:questions[id]
    // questions: !questions[id]
    // ? []
    // : questions[id].sort((a,b,) => questions[b].timestamp - questions[a].timestamp)
}
}

export default connect(mapStateToProps)(QuestionPage) 
//export default QuestionPage