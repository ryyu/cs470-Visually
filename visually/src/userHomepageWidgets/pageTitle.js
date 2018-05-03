import React, { Component } from 'react';
import '../stylesheets/pages/userHomepage.css';

export class PageTitle extends Component {
	render(){
		return (
			<div id="pageTitle">
				<img src={this.props.profilePic} id="profilePic"></img>
				
				<span class="AccountNameText">&nbsp; {this.props.username}</span>
				
				<hr id="pageTitleDivider"/>
				
				Followers: <b>{this.props.followers}</b>
				&nbsp; &nbsp; &nbsp;
				Following: <b>{this.props.following}</b>
			</div>
		)
	}
}