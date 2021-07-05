import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestion, formatDate} from '../utils/helpers'
// import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index'
import { handleAnswerQuestion } from '../actions/questions'
import { addUserAnswer } from '../actions/users'

import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'



class UnansweredQuestion extends Component{
  constructor() {
    super();
    this.state = {
      selectedOption: '',
    toHome: false,
    // page:`/unansweredQuestion/${this.prop.question.id}`
    };
    this.handleChange = this.handleChange.bind(this);
  }
  static propTypes = {
    // books: PropTypes.array.isRequired,
    
    // updateShelf: PropTypes.func.isRequired,
  }
  // state = {
  //   selectedOption: '',
  //   question:{},
  //   toHome: false,

  // }
    handleSubmit =(e)=>{

        e.preventDefault()

        let { selectedOption, toHome} = this.state
        const { dispatch, authedUser,question,users} = this.props
        const id = question.id
        // todo: Add Question to Store
    
        console.log('answer ', this.state.selectedOption)
        console.log('authedUser ',{ authedUser})
        console.log('id', {id})
 
    
        // dispatch(handleAddQuestion(question))
        dispatch(handleAnswerQuestion(authedUser,id,this.state.selectedOption)).then 
        (()=>dispatch(addUserAnswer(users,id,authedUser, this.state.selectedOption)))
        
    
        this.setState(() => ({
              toHome: true,

          })) 
    }
    handleChange=(e)=>{
      const text = e.target.value
      console.log("selected Answer",text)
      // e.preventDefault();
      this.setState({selectedOption: e.target.value})
 
      console.log("Updated state Answer",this.state.selectedOption)
      console.log("question****************",this.state.question)


    }
  
   
      render() {
        const { question, users,authedUser } = this.props
        const {
          author, timestamp,optionOne ,optionTwo , id, 
        } = question
        // const page = this.state.toHome?`/AnsweredQuestion/${id}`:`/unansweredQuestion/${id}`
        console.log("Question Props", question)
        console.log("Answer state", this.state.selectedOption)

          if (this.state.toHome === true) {
        return <Redirect to= {`/AnsweredQuestion/${id}`} />
      }
        if (question === null) {
          return <p>This Question doesn't existd</p>
        }

  
        //this variable to filter the answered and unanswered questions
        // const loggedUser = authedUser;
        // console.log("")
        const avatar = users[author].avatarURL
        return (
            // <Link to={page} className='question'>
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
      const question = questions[id]
      // const parentTweet = tweet ? tweets[tweet.replyingTo] : null
    const temp_authedUser = 'sarahedo'
    console.log("id",id)

    console.log("questions.optionOneText",question.optionOne.text)
    console.log("questions.optionTwoText",question.optionTwo.text)
    console.log("users[question.author.name]",question.author)
      return {
        authedUser,
        users,
        question: questions[id]
          
        }
      }
      
      export default connect(mapStateToProps)(UnansweredQuestion)
    {/* //export default Question */}