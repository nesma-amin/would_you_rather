import React, {Component} from 'react'
import {connect} from 'react-redux'
import Leader from './Leader'
import { Link, withRouter } from 'react-router-dom'

class LeaderBoard extends Component{
 
      render() {
        const { users } = this.props

        if (users === null) {
          return <p>No users exist</p>
        }
                
        return (
            <Link to='/leaderBoard' className='leaderBoard'>
                <div >
                <h3 className='center'>Your Leader Board</h3>
                <ul className='dashboard-list'>
                    {this.props.usersIds.map((id)=>(
                        <li key ={id}>
                            <Leader id={id}/> 
                        </li>
                    ))}
                </ul>
                </div>
            </Link>
        )
      }
    }
    
    function mapStateToProps ( {users}) {
      console.log("users", users)

      return {
        users,
        // usersIds: Object.keys(users),
        usersIds: Object.keys(users) 
        .sort((a,b)=>  ((users[b].questions.length)+(Object.keys(users[b].answers).length)) - 
        ((users[a].questions.length)+(Object.keys(users[a].answers).length)))
        }
      }
      
      export default withRouter(connect(mapStateToProps)(LeaderBoard)) 
