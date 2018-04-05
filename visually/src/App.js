import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoginBox from './Login.js'
import logo from './logo.svg';
import './App.css';
import {HeaderBar} from './headerBar.js'

class App extends Component {
  render() {
    return (
      <div className="App">
		<HeaderBar></HeaderBar>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <LoginBox/>
      </div>
    );
  }
}

//ReactDOM.render(<Box />, document.getElementById('form'));

export default App;
