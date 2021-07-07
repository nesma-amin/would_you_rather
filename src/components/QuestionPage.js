import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { withRouter } from 'react-router-dom'

class QuestionPage extends Component {
  render() {
    const { id} = this.props
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

export default withRouter(connect(mapStateToProps)(QuestionPage) )
