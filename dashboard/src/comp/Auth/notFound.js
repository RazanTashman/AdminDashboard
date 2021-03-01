import React from 'react';
import Nav from "../navBar/nav"
import NF from "./404.gif"
import "./auth.css"
import { Redirect } from 'react-router-dom'

class NotFoundPage extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        redirect: false,  
      }
    }

    
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }
    render(){
    return(
    <div>
        <div className ="container">
         <div className = "row">
            <div className = "col-sm-8">
                <img className="img" src={NF} alt="loading..." />
            </div>
            <div className = "col-sm-8">
                {this.renderRedirect()}
                <button className="btnNF btn "onClick={this.setRedirect}><b>Go Back Home</b></button>
            </div>   
            </div>
        </div>
    </div>)
    }
}

export default NotFoundPage;