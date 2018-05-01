import React, { Component } from 'react';
import '../stylesheets/pages/userHomepage.css';
import {TopRecentPosts} from '../userHomepageWidgets/topRecentPosts.js';

export class UserHomepage extends Component {
	
	constructor(props){
		super(props);
		this.state = {	
			topRecentPostsAvailable: ""
		};
		this.getInfoFromInstagram("therock");
	}
	
	
	/*	Checks to see if the response from the request is ready to
		be used.
	*/
	isValidHttpResponse = (request) => {
		return request.readyState == 4 && request.status == 200;
	}
	
	
	getInfoFromInstagram = (instagramName) => {
		var results = {};
		var request = new XMLHttpRequest();
		var url = "https://www.instagram.com/" + instagramName;

		request.open("GET", url, true);
		request.send();

		//Parse the JSON once it is received
		request.onreadystatechange = () => {
			if (this.isValidHttpResponse(request)) {
				results = request.responseText;
				results = JSON.parse(results.match("window._sharedData = (.*);<\/script>")[1]);
				this.setState(
					{
						recentPostsJson: results["entry_data"]["ProfilePage"][0]["graphql"]["user"]["edge_owner_to_timeline_media"]["edges"]
					}
				);
				console.log("What we got");
				console.log(this.state.recentPostsJson);
				console.log(results);
			}
		}
	}
	
	
	 render() {
		return (
			<div id="userPageContainer">
				<div id="leftColumn">
				</div>
				<div id="rightColumn">
					<TopRecentPosts recentPostsJson={this.state.recentPostsJson}/>
				</div>
			</div>
		);
	 }
}
