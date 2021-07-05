import React, {Component} from 'react'
import {connect} from 'react-redux'
import Leader from './Leader'
import { Link, withRouter } from 'react-router-dom'

class LeaderBoard extends Component{
 
      render() {
        const { users,usersIds } = this.props
        
         console.log("Leaderboard users", users)
         console.log("Leaderboard usersIds", usersIds)

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
        usersIds: Object.keys(users) 
        }
      }
      
      export default withRouter(connect(mapStateToProps)(LeaderBoard)) 
