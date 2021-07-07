import React, {Component } from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import {TabPanel,Tabs, TabList, Tab} from 'react-tabs'
import { withRouter } from 'react-router-dom'
import 'react-tabs/style/react-tabs.css';

class Dashboard extends Component{
  
  answeredQuestionsID=()=>{
    const{authedUser}=this.props
    let answeredIdsArray=[];
    this.props.questionIds.forEach(element => {
      if((this.props.questions[element].optionOne.votes.includes(authedUser[0]))||
      (this.props.questions[element].optionTwo.votes.includes(authedUser[0])))
      {
        answeredIdsArray= [ ...answeredIdsArray, element ]
      }
      
    });
    return answeredIdsArray
  }
  unansweredQuestionsID=()=>{
    const{authedUser}=this.props
    let unansweredIdsArray=[];
    
    this.props.questionIds.forEach(element => {
      if((this.props.questions[element].optionOne.votes.includes(authedUser[0]))||
      (this.props.questions[element].optionTwo.votes.includes(authedUser[0])))
      {
        //do nothing
      }
      else
      {
        unansweredIdsArray= [ ...unansweredIdsArray, element ]
      }
      
    });
       
    
    return unansweredIdsArray
  }

    render(){
      const answeredIds = this.answeredQuestionsID()
      const unansweredIs = this.unansweredQuestionsID()

        return(
            <div>
                <h3 className='center'>Your Timeline</h3>
                <Tabs > 
                    <TabList >

                      <Tab >Unanswered Question</Tab>
                      <Tab >Answered Question</Tab>
                      </TabList>   
               
                      <TabPanel >
                      <ul className='unanswered questions-list'>
                                    {unansweredIs.map((id)=>(
                                        <li key ={id}>
                                            <Question id={id}/> 
                                            </li>
                                    ))}
                                </ul>
                      </TabPanel>
                      <TabPanel >
                      <ul className='answered questions-list'>
                                    {answeredIds.map((id)=>(
                                        <li key ={id}>
                                            <Question id={id}/> 
                                            </li>
                                    ))}
                                </ul>
                      </TabPanel>
                      
                </Tabs>
               
             </div>
        );
        
    }
}

function mapStateToProps( {questions, authedUser} ){
    return { 
      questions,
      authedUser,
        questionIds: Object.keys(questions) 
        .sort((a,b)=> questions[b].timestamp - questions[a].timestamp)
    };
  }
export default withRouter(connect(mapStateToProps)(Dashboard))