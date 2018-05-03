import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';
import './stylesheets/styles.css';
import {HeaderBar} from './headerBar.js';

import {Search} from './pages/search.js';
import {Login} from './pages/login.js';
import {UserHomepage} from './pages/userHomepage.js';
import {isLoggedIn, checkLogin2} from './loginConnection.js';
import {Graph} from './Graph.js';

import {SignUpBox} from './SignUp.js';

class App extends Component {
	render() {

		return (
			<BrowserRouter>
				<div className="App">
					<HeaderBar></HeaderBar>
					<div className="content">
						<Route exact path="/" component={Login}/>
						<Route exact path="/Graphs" component={Graph}/>
            <Route exact path="/signup" component={SignUpBox}/>
						<Route exact path="/search" render={() =>
							!isLoggedIn() ?
								<Redirect to="/login"/>
							:
								<Search/>
						}/>
						<Route exact path="/login" render={() =>
							!isLoggedIn() ?
								<Login/>
							:
								<Search/>
						}/>
						<Route exact path="/userHomepage" render={() =>
							!isLoggedIn() ?
								<Login/>
							:
								<UserHomepage/>
						}/>
						{/* Any new pages that can be linked to should go in here*/}
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

//ReactDOM.render(<Box />, document.getElementById('form'));

export default App;
