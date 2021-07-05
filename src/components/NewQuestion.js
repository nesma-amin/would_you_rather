import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'


import {formatQuestion, formatDate} from '../utils/helpers'

class NewQuestion extends Component {
  static propTypes = {
    // books: PropTypes.array.isRequired,
    
    // updateShelf: PropTypes.func.isRequired,
  }
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,

  }
  handleChangeOptionOne = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionOne:text
    }))
  }
  handleChangeOptionTwo = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionTwo:text
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch, id, authedUser} = this.props

    // todo: Add Question to Store

    console.log('Option one: ', optionOne)
    console.log('Option Two: ', optionTwo)
    // const question = formatQuestion(optionOne, optionTwo, authedUser)

    console.log('Option one: ', this.state.optionOne)
    console.log('Option Two: ', this.state.optionTwo)
    console.log('user: ', authedUser)

    // dispatch(handleAddQuestion(question))
    dispatch(handleAddQuestion(optionOne,optionTwo,authedUser))

    this.setState(() => ({
      optionOne: '',
      optionTwo:'',
        toHome: id ? false : true,
      }))   
  }
  render() {
    const { optionOne,optionTwo, toHome } = this.state

    if (toHome === true) {
        return <Redirect to='/' />
      }
    // const tweetLeft = 280 - text.length

    return (
      <div>
        <h3 className='center'>Would You Rather</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <div>
          <textarea
            placeholder="Option1"
            value={optionOne}
            onChange={this.handleChangeOptionOne}
            className='textarea1'
            maxLength={280}
          />
          </div>
          <div>
           <textarea
            placeholder="Option2"
            value={optionTwo}
            onChange={this.handleChangeOptionTwo}
            className='textarea2'
            maxLength={280}
          />
          </div>
          {/* {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )} */}
          <button
            className='btn'
            type='submit'
            disabled={(optionOne === '') && (optionTwo === '')}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}
function mapStateToProps ( {authedUser},props) {
  const { id } = props.match.params

return {
  authedUser,
 id
    
  }
}

export default connect(mapStateToProps)(NewQuestion)

// export default connect()(NewQuestion) 