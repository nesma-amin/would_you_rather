import React, { Component, Fragment,Switch } from 'react'
import{BrowserRouter as Router,Route} from 'react-router-dom'
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



class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
         <Router>
          {/* <Switch> */}

        <Fragment>
          <LoadingBar />
          <div className='container'>            
            {this.props.loading === true
              ? <Route path='/' exact component={Login}/> 
              : <div>
                 <Nav />
                 <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:id' component={QuestionPage} />
                  <Route path='/answeredQuestion/:id' component={AnsweredQuestion} />
                  <Route path='/unansweredQuestion/:id' component={UnansweredQuestion} />
                  <Route path='/new' component={NewQuestion} />
                  <Route path='/leaderBoard' component={LeaderBoard} />
                  <Route path='/logIn' component={Login} />
                  <Route path='/logIn' component={LogOut} />
                </div>    
                </div>
                }
                <Route path='/NotFound' component={NotFound} />
          </div>
            
        </Fragment>
         {/* </Switch> */}

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
// export default App