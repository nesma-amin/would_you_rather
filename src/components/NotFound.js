import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

class NotFound extends Component {
    
        render() {

       
          return (
               <div className='center' >
                    <h2>404 page not found</h2>
                    <div >
                    <button 
                     
                    onClick={<Redirect to='/' />}
                    placeholder="LogIn" />
                    </div>
                </div>
          )
        }
      }

        
      export default NotFound
  


   

