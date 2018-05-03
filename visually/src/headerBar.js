import * as React from 'react';
import './stylesheets/headerBar.css';
import logo from './assets/logo.svg';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import {isLoggedIn, logout} from './loginConnection.js';

class HamburgerMenu extends React.Component{
	render(){
		return(
			<div class="hamburger">
				<div class="hamburgerBtn"></div>
				<div class="hamburgerContent">
				{!isLoggedIn() &&
					<div>
						<NavLink to="/login">Log In</NavLink>
						<NavLink to="/signup">Sign Up</NavLink>
					</div>
				}
					{isLoggedIn() &&
						<div>
						<NavLink to="/userHomepage">Home</NavLink>
						<NavLink to="/search">Search</NavLink>
						<NavLink to="/login" onClick={logout}>Log Out</NavLink>
						</div>
					}

				</div>
			</div>
		)
	}
}

export class HeaderBar extends React.Component {
  render() {
    return (
		<div class="headerBar">
			<div class="hamburgerContainer">
				<HamburgerMenu/>
			</div>
			<div class="logoArea">
				<img src={logo} height="50px"></img>
			</div>
			<div class="catchPhraseArea">
			Where we visualize your data
			</div>
		</div>
	)
  }
}
