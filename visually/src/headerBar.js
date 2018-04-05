import * as React from 'react';
import './stylesheets/headerBar.css';
import logo from './assets/logo.png';

class HamburgerMenu extends React.Component{
	render(){
		return(
			<div class="hamburger">
				<div class="hamburgerBtn"></div>
				<div class="hamburgerContent">
					<a href="#">Home</a>
					<a href="#">Search</a>
					<a href="#">Graphs</a>
					<a href="#">Settings</a>
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
				<img src={logo} height="50px"/>
			</div>
		</div>
	)
  }
}