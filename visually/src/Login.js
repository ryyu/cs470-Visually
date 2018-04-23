import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/login.css';
import {login} from './loginConnection.js';
import {Redirect} from 'react-router-dom';



class LoginBox extends Component {
  render() {
    return (
      <div id="login-box">
        <LoginForms/>
      </div>
    );
  }
}

class LoginForms extends Component {

  state = {
    username: '',
    password: ''
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name
    this.setState({[name]: event.target.value});
  }

  handleSubmit = event => {
    //alert('Username submitted: ' + this.state.username + ' Password submitted: ' + this.state.password);
	login(this.state.username, this.state.password);
    event.preventDefault();
  }

  render() {
    return(
      <div class="login-form">
        <form class="form" onSubmit={this.handleSubmit}>
          <h1>Welcome</h1>
          <input placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            <br/>
          <input placeholder="Password" type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
            <br/>
          <input type="submit" value="Submit" />
          <p class="message">Not registered? <a href="#">Create an account</a></p>
        </form>
      </div>
    );
  }
}

export default LoginBox
