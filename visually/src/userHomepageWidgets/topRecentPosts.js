import React, { Component } from 'react';
import '../stylesheets/pages/userHomepage.css';
import heartIcon from '../assets/heartIcon.svg';
import commentIcon from '../assets/commentIcon.svg';

class RecentPost extends Component {
	
	/*
		inNumber should be a string that contains a numerical value such as "500".
		If inNumber is greater than 10000, the returned value is divided by 1000,
		one decimal place is left on, and a "k" is appended to the end.
	*/
	formatNumber = (inNumber) => {
		var formatted = inNumber;
		if (Number(inNumber) > 1000000){
			formatted = (Math.floor(Number(inNumber/1000))).toString() + "K";
		}
		else if (Number(inNumber) > 10000){
			formatted = (Math.round(Number(inNumber/1000) * 10)/10).toString() + "K";
		}
		return formatted;
	}
	
	
	render() {
		var numLikes = this.formatNumber(this.props.numLikes);
		var numComments = this.formatNumber(this.props.numComments);
		
		return (
			<a target="_blank" href={"https://www.instagram.com/p/" + this.props.shortcode}>
			<div class="recentPost" 
				 style={{backgroundImage: 'url(' + this.props.imageSource + ')'}}
			>

			<div class="recentPostInfoBar">
				<img src={heartIcon} height="20px"></img>
				&nbsp; {numLikes} &nbsp;
				<img src={commentIcon} height="20px"></img>
				&nbsp; {numComments}
			</div>
			
			</div>
			</a>
		)
	}
}

export class TopRecentPosts extends Component {
	/*	The method will query Instagram for search results based on
		this.state.searchString. The id, name, and picture of each user
		will be stored in state.infoToDisplay. The search results
		screen will be displayed.
	*/
	
	renderTopRecentPosts(){
		if(this.props.recentPostsJson === "" || this.props.recentPostsJson==undefined) {
			return (
				<div> </div>
			)
		}
		
		var pics = [];
		for(var i = 0; i < 10; i++) {
			pics.push(<RecentPost 
				imageSource={this.props.recentPostsJson[i]["node"]["thumbnail_src"]}
				numLikes={this.props.recentPostsJson[i]["node"]["edge_liked_by"]["count"]}
				numComments={this.props.recentPostsJson[i]["node"]["edge_media_to_comment"]["count"]}
				shortcode={this.props.recentPostsJson[i]["node"]["shortcode"]}
			/>)
		}
		
		return (
			<div>
			{pics}
			</div>
		)
	}
	
	render() {
		console.log("Rendering");
		return (
			<div id="topRecentPosts">
				<div class="sectionTitleArea">
					Recent posts summary
				</div>
				{this.renderTopRecentPosts()}
			</div>
		);
  }
}