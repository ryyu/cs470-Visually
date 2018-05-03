import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/signup.css';
import {login, isLoggedIn} from './loginConnection.js';
import {Redirect} from 'react-router-dom';
import {NavLink} from 'react-router-dom';



export class SignUpBox extends Component {
  render() {
    return (
      <div id="signup-box">
        <SignUpForms/>
      </div>
    );
  }
}

class SignUpForms extends Component {

  state = {
    name: '',
    username: '',
    password: ''
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name
    this.setState({[name]: event.target.value});
  }

  handleSubmit = event => {

  }

  render() {
    return(
      <div class="signup-form">
        <form class="form" onSubmit={this.handleSubmit}>
          <h1>Join Visually</h1>
          <br/>
          <input placeholder="Name" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
          <br/>
          <input placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
            <br/>
          <input placeholder="Password" type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
            <br/>
            <NavLink to={"/login"}><input type="submit" value="Submit"/></NavLink>
        </form>
      </div>
    );
  }
}
