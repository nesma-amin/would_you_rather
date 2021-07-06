import React, {Component,  useState } from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import {TabPanel,Tabs, TabList, Tab} from 'react-tabs'
import 'react-tabs/style/react-tabs.css';

class Dashboard extends Component{
  state={
    tabIndex:0
  }
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


  setTabIndex=(e)=>{
    console.log("**********index",e)
    this.setState({
      tabIndex: e
    })
  }
    render(){
      const answeredIds = this.answeredQuestionsID()
      const unansweredIs = this.unansweredQuestionsID()
      const className0= (this.state.tabIndex===0)?' .active':'tab'
      const className1= this.state.tabIndex===1?' .active':'tab'

      // const className1= this.state.tabIndex===1?' tab-list-active':'tab'

      const CustomTab =({children})=>(
        <Tab>
          <p>{children}</p>
        </Tab>
      )
      CustomTab.tabsRole='Tab';
      console.log("answeredIds",answeredIds)
      console.log("unansweredIs",unansweredIs)
      // const tabIndex=0
        console.log("Dashboard props",this.props)
        console.log("**********this.state.tabindex",this.state.tabIndex)

        return(



          // ************************************************************************************
            <div>
                <h3 className='center'>Your Timeline</h3>
                <Tabs default={1} selectedIndex={this.state.tabIndex}  
                onSelect= {index=>this.setTabIndex(index)}
                className='.active'
              > 
                    <TabList default={1}  >
                    <CustomTab  default='true' className='.active' >Unanswered Question</CustomTab>
                      <CustomTab activeClassName={(this.state.tabIndex===0)?{className0}:{className1}}>Answered Question</CustomTab>
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
                      <TabPanel  selectedIndex={this.state.tabIndex}>
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
export default connect(mapStateToProps)(Dashboard)