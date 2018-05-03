import React, { Component } from 'react';
import '../stylesheets/pages/userHomepage.css';
import {TopRecentPosts} from '../userHomepageWidgets/topRecentPosts.js';
import {PageTitle} from '../userHomepageWidgets/pageTitle.js';
import {SampleGraph} from '../userHomepageWidgets/recentPostsGraph.js';
import {ChangeInFollowers} from '../userHomepageWidgets/changeInFollowers.js';

export class UserHomepage extends Component {
	
	constructor(props){
		super(props);
		this.state = {	
			topRecentPostsAvailable: ""
		};
		this.getInfoFromInstagram("seawolfliving");
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
						recentPostsJson: results["entry_data"]["ProfilePage"][0]["graphql"]["user"]["edge_owner_to_timeline_media"]["edges"],
						username: results["entry_data"]["ProfilePage"][0]["graphql"]["user"]["username"],
						profilePic: results["entry_data"]["ProfilePage"][0]["graphql"]["user"]["profile_pic_url"],
						followers: results["entry_data"]["ProfilePage"][0]["graphql"]["user"]["edge_followed_by"]["count"],
						following: results["entry_data"]["ProfilePage"][0]["graphql"]["user"]["edge_follow"]["count"]
					}
				);
				console.log("What we got");
				console.log(this.state.recentPostsJson);
				console.log(results["entry_data"]["ProfilePage"][0]["graphql"]["user"]["edge_owner_to_timeline_media"]["edges"]);
				console.log(results);
			}
		}
	}
	
	
	 render() {
		return (
			<div id="userPageContainer">
				<div id="leftColumn">
					<PageTitle
						username={this.state.username}
						profilePic={this.state.profilePic}
						followers={this.state.followers}
						following={this.state.following}
					/>
					<ChangeInFollowers
						followers={this.state.followers}
						numDays={7}
					/>
				</div>
				<div id="rightColumn">
					<TopRecentPosts recentPostsJson={this.state.recentPostsJson}/>
					<SampleGraph recentPostsJson={this.state.recentPostsJson} />
				</div>
			</div>
		);
	 }
}
