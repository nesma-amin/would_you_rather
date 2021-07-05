import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestion, formatDate} from '../utils/helpers'
// import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'
import { Link, withRouter } from 'react-router-dom'

class Leader extends Component{
 
  
      render() {
        const { user, id } = this.props      
        console.log("id", id)
        console.log("user", user)
        const avatar = user.avatarURL
        const score=(user.questions.length)+(Object.keys(user.answers).length)
        const styles = {
            border: '1px solid rgba(0, 0, 0, 0.09)', 
            borderColor: 'blue'
       };
        return (
            <Link to={`/leaderBoard`} className='Leader'>
            <div className='center' style= {styles}>
                <img
                src={avatar}
                alt={`Avatar of ${user.name}`}
                className='avatar'
                />
                <div className='question-info'>                
                    <span>{user.name}</span>
                    <p> Answered Questions {Object.keys(user.answers).length}</p>
                    <div></div>
                    <p> Created Questions {user.questions.length}</p>
                    <div></div>
                    <p> Score {score}</p>
                
              </div>
              
            </div> 
            </Link>
        )
      }
    }
    
    function mapStateToProps ( {users},{id}) {
        console.log("id",id)
        return {
          user:users[id],
          id
          }
        }
      
      export default connect(mapStateToProps)(Leader)
