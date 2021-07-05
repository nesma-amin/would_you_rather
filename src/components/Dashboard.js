import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import {TabPanel,Tabs, TabList, Tab} from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

class Dashboard extends Component{
  answeredQuestionsID=()=>{
    const{authedUser}=this.props
    let answeredIdsArray=[];
    console.log("this.props.questionsIds",this.props.questionIds)
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
      const CustomTab =({children})=>(
        <Tab>
          <h2>{children}</h2>
        </Tab>
      )
      CustomTab.tabsRole='Tab';
      console.log("answeredIds",answeredIds)
      console.log("unansweredIs",unansweredIs)

        console.log("Dashboard props",this.props)
        return(



          // ************************************************************************************
            <div>
                <h3 className='center'>Your Timeline</h3>
                <Tabs>  
                    <TabList>
                      <CustomTab>Answered Question</CustomTab>
                      <CustomTab>Unanswered Question</CustomTab>
                      </TabList>   
               
              
                      <TabPanel>
                      <ul className='answered questions-list'>
                                    {answeredIds.map((id)=>(
                                        <li key ={id}>
                                            <Question id={id}/> 
                                            </li>
                                    ))}
                                </ul>
                      </TabPanel>
                      <TabPanel>
                      <ul className='unanswered questions-list'>
                                    {unansweredIs.map((id)=>(
                                        <li key ={id}>
                                            <Question id={id}/> 
                                            </li>
                                    ))}
                                </ul>
                      </TabPanel>
                </Tabs>
                {/* <ul className='dashboard-list'>
                    {this.props.questionIds.map((id)=>(
                        <li key ={id}>
                            <Question id={id}/> 
                            </li>
                    ))}
                </ul>  */}
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
export default connect(mapStateToProps)(Dashboard)