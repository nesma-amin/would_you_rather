import React, { Component} from 'react'
import { NavLink } from 'react-router-dom'
import {unsetAuthedUser} from '../actions/authedUser'
// import authedUser from '../reducer/authedUser'
// import AuthedUser from './AuthedUser'
import Login from './Login'
// import LogOut from './LogOut'
import {connect} from 'react-redux'



class Nav extends Component {
  render(){
    const { authedUser } = this.props;

  return (
    <nav className='nav'>
      {authedUser&&
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderBoard' activeClassName='active'>
            Leader Board
          </NavLink>
          </li>
        
        <li>
          <NavLink to='/leaderBoard' activeClassName='active'>
            Logged User is:{authedUser}
          </NavLink>
          </li>
        <li>
          <NavLink to='/login' activeClassName='active'>
            LogOut
          </NavLink>
        </li>
      </ul>
  }
    </nav>
  )
} 
}
function mapStateToProps( {authedUser} ){
  return { 
    authedUser:authedUser[0]
  };
}
export default connect(mapStateToProps)(Nav)