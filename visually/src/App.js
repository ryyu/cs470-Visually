import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, NavLink, BrowserRouter, Redirect} from 'react-router-dom';
import './App.css';
import './stylesheets/styles.css';
import {HeaderBar} from './headerBar.js';

import {Search} from './pages/search.js';
import {Login} from './pages/login.js';
import {isLoggedIn} from './loginConnection.js';

import {Graph} from './Graph.js';

class App extends Component {

	
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<HeaderBar></HeaderBar>
					<div className="content">
						<Route exact path="/search" render={() =>
								!isLoggedIn() ?
									<Redirect to="/login"/>
								:
									<Search/>
							}
						/>
						<Route exact path="/" component={Login}/>
						<Route exact path="/login" component={Login}/>
						<Route exact path="/Graphs" component={Graph}/>
						{/* Any new pages that can be linked to should go in here*/}
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

//ReactDOM.render(<Box />, document.getElementById('form'));

export default App;
