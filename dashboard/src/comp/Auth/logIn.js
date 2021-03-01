import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom'
import './auth.css';
import logo from "../logo.jpg"
import coverBG from "./cover.jpg"
//
class LogIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      redirect: false

    }


  }

  getTheInfo(event) {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "email")
      this.state.emailError = ""
    if (event.target.name === "password")
      this.state.passwordError = ""
  }

  submit() {
    // e.preventDefault();
    if (!this.state.email) {
      this.state.emailError = "Email required ";

    }
    if (!this.state.password) {
      this.state.passwordError = "Password required ";
    }
    if (this.state.emailError || this.state.passwordError) {
      this.setState({ emailError: this.state.emailError, passwordError: this.state.passwordError });
    }
    else {
      this.setState({ loading: true });
    
    var data = {
      email: this.state.email,
      password: this.state.password,

    }
    var that = this
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/signin',
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function (data) {
        console.log("data", data)
        localStorage.setItem('token', data.token)
        if (data.result[0].userId === 1) {
          window.location = '/home';
        }
        else {
          // window.location = '/signup';
        }
      },
      error: function (err) {
        console.log("err", err)
        that.setState({ emailError: err.responseText })
      }
    })}
  }

  render() {
    const mystyle = {
      width: "550px",
      marginLeft: "450px",
      marginTop: "80px"
    };

    return (

      <div style={{ backgroundImage: `url(${coverBG})`,  backgroundRepeat: 'no-repeat',
      width:'100%',  position: 'fixed',height:"100%",backgroundSize:"cover"  }} >

        <form style={mystyle} className="FORM">
          <div class="form-group">
          <img className="logo" src={logo}   />
            <br/><br/>
            <input type="email" class="form-control" placeholder="Email" name="email" required="required" onChange={(e) => this.getTheInfo(e)} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.emailError}
            </div>
          </div>  
          <br />

          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" name="password" required="required" onChange={(e) => this.getTheInfo(e)} />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.passwordError}
            </div>
          </div>
          <br />

          <div class="form-group">
            <button type="button" style={{ fontWeight: 'bold', fontSize: "22px", width: "500px" }} className="butt btn btn-warning btn-lg text-white " onClick={() => this.submit()}>Log In</button>
          </div>

        </form>

      </div>
    );
  }
}
export default LogIn;



