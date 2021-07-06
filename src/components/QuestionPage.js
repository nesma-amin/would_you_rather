import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {
  render() {
    const { id, authedUser,question } = this.props
    console.log("id",id)
    console.log("authedUser",authedUser)
    console.log("questions",question)
    return (
      <div>
        <Question id={id} />
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
}
}

export default connect(mapStateToProps)(QuestionPage) 
