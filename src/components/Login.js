// import { DropDownList } from "@progress/kendo-react-dropdowns";
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropdown from 'react-dropdown';
import Select from 'react-select'
import 'react-dropdown/style.css';
import { Redirect } from 'react-router-dom'
import {setAuthedUser} from '../actions/authedUser'

class AuthedUser extends Component {
    state = {
        selectedUser:{},
        toHome: false,
    
      }
      handleAuthedUserSelect=(e)=> {
        // e.preventDefault()
        console.log("e.value", e.value)

                this.setState(() => ({
                  selectedUser: e.value,
                    }));
            }
        
        

        handleAuthedUserSubmit=(e)=>
        {
          const { dispatch} = this.props
          e.preventDefault()
          console.log("this.state.selectedUser", this.state.selectedUser)
          dispatch(setAuthedUser(this.state.selectedUser))
        }
        render() {

          const { userIds } = this.props
          console.log("userIds", userIds)
        //   const defaultOption = userIds[0];
        if (this.state.toHome === true) {
            return <Redirect to='/' />
          }

          const styles = {
              border: '1px solid rgba(0.5, 0.5, 0.5, 0.09)', 
              borderColor: 'blue',
              width:'550px',
              high:'850px'

         };
          return (
            //<Link to={this.state.page} className='question'>
               <div className='center' style={styles}>
                    <div>Welcome to would you rather game</div>
                    <div >
                    <Dropdown 
                    options={userIds} 
                    onChange={this.handleAuthedUserSelect}
                    placeholder="Select a user" />
                    </div>
                    <div >
                    <button 
                    className='btn'
                    type='submit'
                    onClick={this.handleAuthedUserSubmit}
                    >LogIn
                    </button>
                    
                    
            
                <option value="" disabled>Please select</option>
                    </div>
                </div>
               // </Link>
          )
        }
      }
      
      function mapStateToProps ( {users}) {
          
      console.log("users",users)
        return {
          userIds:Object.keys(users)
            
          }
        }
        
      export default connect(mapStateToProps)(AuthedUser)
  


   

