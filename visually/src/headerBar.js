import * as React from 'react';
import './stylesheets/headerBar.css';
import {Bootstrap, DropdownButton, MenuItem, ButtonToolbar, Button, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {addStyle} from 'react-bootstrap/lib/utils/bootstrapUtils.js';

addStyle(DropdownButton, 'btn-hamburgerMenu');


class HamburgerMenu extends React.Component{
	render(){
		return(
			<div>
				<ButtonToolbar>
					<DropdownButton
						bsStyle="hamburgerMenu"
						id="dropdown-size-large"
						noCaret
						title={<span class="glyphicon glyphicon-menu-hamburger hamburgerMenuGlyph"></span>}
					>
						<MenuItem eventKey="1" href="index.html">
							Home
						</MenuItem>
						<MenuItem eventKey="2" href="search.html">
							Search
						</MenuItem>
						<MenuItem eventKey="3" href="graph.html">
							Graphs
						</MenuItem>
						<MenuItem eventKey="4" href="settings.html">
							Settings
						</MenuItem>
					</DropdownButton>
				</ButtonToolbar>
			</div>
		)
	}
}


export class HeaderBar extends React.Component {
  render() {
    return (
		<div class="headerBar">
			<div class="hamburgerArea">
				<HamburgerMenu/>
			</div>
			<div class="logoArea">
				<span class="headerMainText">Visually</span>
			</div>
		</div>
	)
  }
}