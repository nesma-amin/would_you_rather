import React, { Component, Fragment } from 'react'
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import{connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Nav from './Nav'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import NotFound from './NotFound'
import LogOut from './LogOut'
import { withRouter } from 'react-router-dom'



class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
         <Router>

          <LoadingBar />
          <div className='container'> 
             <Nav />  
             <Switch> 
               {      
                this.props.loading === true
                //exact removed, now all pathes lead to login if not authedUser
                  ? <Route path='/'  component={Login}/> 
                  : 
                      <Fragment>
                      <Route path='/' exact component={Dashboard} />
                      <Route path='/question/:id' component={QuestionPage} />
                      <Route path='/answeredQuestion/:id' component={AnsweredQuestion} />
                      <Route path='/unansweredQuestion/:id' component={UnansweredQuestion} />
                      <Route path='/new' component={NewQuestion} />
                      <Route path='/leaderBoard' component={LeaderBoard} />
                      <Route path='/logIn' component={Login} />
                      <Route path='/logIn' component={LogOut} />
                      
                      </Fragment>
                }
                {/* <Route path='/notFound'  component={NotFound} /> */}
                </Switch>
          </div>           
      </Router>        
    )
  }
}

function mapStateToProps( {authedUser} ){
  return { 
      loading: authedUser === null 
  };
}
export default connect(mapStateToProps)(App)
