import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';


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
  /*
  constructor(props) {
    super(props);
    this.state = {value:''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  */
/*
  handleChange(event) {

  }
*/
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
    alert('Username submitted: ' + this.state.username + ' Password submitted: ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
        </label>
        <br/>
        <label>
          Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange}/>
        </label>
        <br/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default LoginBox
