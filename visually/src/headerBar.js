import * as React from 'react';
import './stylesheets/headerBar.css';
import logo from './assets/logo.svg';
import {Route, NavLink, HashRouter} from 'react-router-dom';

class HamburgerMenu extends React.Component{
	render(){
		return(
			<div class="hamburger">
				<div class="hamburgerBtn"></div>
				<div class="hamburgerContent">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/search">Search</NavLink>
					<NavLink to="/graphs">Graphs</NavLink>
					<NavLink to="/settings">Settings</NavLink>
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
				Some sort of catchy phrase can go here
			</div>
		</div>
	)
  }
}