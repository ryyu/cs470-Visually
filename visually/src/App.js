import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, BrowserRouter} from 'react-router-dom';
import './App.css';
import {HeaderBar} from './headerBar.js';

import {Search} from './pages/search.js';
import {Login} from './pages/login.js';

class App extends Component {
  render() {
    return (
		<BrowserRouter>
			<div className="App">
				<HeaderBar></HeaderBar>
				<div className = "content">
					<Route exact path="/" component={Login}/>
					<Route exact path="/login" component={Login}/>
					<Route exact path="/search" component={Search}/>
					{/* Any new pages that can be linked to should go in here*/}
				</div>
			</div>
	  	</BrowserRouter>
    );
  }
}

//ReactDOM.render(<Box />, document.getElementById('form'));

export default App;
