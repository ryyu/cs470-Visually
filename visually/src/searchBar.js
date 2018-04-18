import * as React from 'react';
import './stylesheets/searchBar.css';
import locationIcon from './assets/locationIcon.svg';
import hashtagIcon from './assets/hashtagIcon.svg';
import {NavLink} from 'react-router-dom';

class SearchResult extends React.Component {
	render() {
		return(
			//<NavLink to={"/graph?type=" + this.props.type + "&id=" + this.props.id}>
			<NavLink to={"/graphs"}>
			<div class="searchResult">
				<img src={this.props.profilePic} class="resultPic"/>
				<div class="resultTextArea">
					<span class="mainText">{this.props.mainText} </span>
					<span class="secondText"> {this.props.secondText}</span>
				</div>
			</div>
			</NavLink>
		)
	}
}



export class SearchBar extends React.Component {
	/*	State properties:
			showResults		When true, the search results box will be rendered.
							When false, it will remain invisible.
			infoToDisplay	An array of all of the objects that store the info
							to be displayed in each SearchResult.
			searchString	What the user has typed into the search bar
	*/
	constructor(props){
		super(props);
		this.state = {	showResults: false,
						infoToDisplay: [],
						searchString: ""
					 };
	}


	/*	Returns an array of objects with the following properties:
			pic 		The picture to be displayed with the result
			name 		The name that will be displayed in the results box
			id 			The ID of the result
			position	The order that the results are meant to be displayed in
			type		"user", "hashtag", or "location"
		The array will be sorted so that objects with the lowest position
		property are at the beginning and higher positions are at the end.
	*/
	getUsableData = (jsonObject) => {
		var usableData = [];

		//Go through all of the users
		for (var i = 0; i < jsonObject.users.length; i++) {
			if(!jsonObject.users[i].user.is_private){
				usableData.push({
					pic: jsonObject.users[i].user.profile_pic_url,
					name: jsonObject.users[i].user.username,
					id: jsonObject.users[i].user.pk,
					position: jsonObject.users[i].position,
					type: "user",
					secondText: jsonObject.users[i].user.byline
				});
				console.log(jsonObject.users[i].user.byline);
			}
		}
		//Go through all of the hashtags
		for (var i = 0; i < jsonObject.hashtags.length; i++) {
			usableData.push({
				pic: hashtagIcon,
				name: "#" + jsonObject.hashtags[i].hashtag.name,
				id: jsonObject.hashtags[i].hashtag.id,
				position: jsonObject.hashtags[i].position,
				type: "hashtag",
				secondText: jsonObject.hashtags[i].hashtag.media_count + " posts"
			});
		}
		//Go through all of the places
		for (var i = 0; i < jsonObject.places.length; i++) {
			usableData.push({
				pic: locationIcon,
				name: jsonObject.places[i].place.title,
				id: jsonObject.places[i].place.location.pk,
				position: jsonObject.places[i].position,
				type: "place",
				secondText: jsonObject.places[i].place.subtitle
			});
		}

		this.sortByPosition(usableData)
		console.log(usableData);
		return usableData;
	}


	/*	Given an array of objects that all have a "position" property, the
		array is modified to be sorted so that objects with the lowest
		position value are at the beginning and ones with the highest
		position value are at the end.
	*/
	sortByPosition = (arrayOfObjects) => {
		arrayOfObjects.sort(function( obj1, obj2){
			return obj1.position - obj2.position;
		})
	}



	/*	Checks to see if the response from the request is ready to
		be used.
	*/
	isValidHttpResponse = (request) => {
		return request.readyState == 4 && request.status == 200;
	}


	/* 	Returns the correct URL to get the results from Instagram
		based on the given string.
	*/
	buildSourceUrl = (searchString) => {
		var url = "https://www.instagram.com/web/search/topsearch/?context=blended&query=";

		if (searchString.charAt(0) == "#") {
			url += "%23" + searchString.substring(1);
		} else {
			url += searchString;
		}

		return url;
	}



	/*	The method will query Instagram for search results based on
		this.state.searchString. The id, name, and picture of each user
		will be stored in state.infoToDisplay. The search results
		screen will be displayed.
	*/
	handleSearch = (event) => {
		event.preventDefault();
		var results = {};
		var request = new XMLHttpRequest();
		var url = this.buildSourceUrl(this.state.searchString);

		request.open("GET", url, true);
		request.send();

		//Parse the JSON once it is received
		request.onreadystatechange = () => {
			if (this.isValidHttpResponse(request)) {
				results = JSON.parse(request.responseText);
				this.setState(
					{
						showResults:true,
						infoToDisplay: this.getUsableData(results)
					}
				);
			}
		}
	}


	handleChange = event => {
		const target = event.target;
		const name = target.name
		this.setState({[name]: event.target.value});
	}


	/*	Given an array of objects that contain profilePic and username
		data members, the method will return a div filled with SearchResult
		components usisng those pictures and names in the order that they
		were in the array.
	*/
	searchResults = (picsAndNames) => {
		var listOfResults = picsAndNames.map(function(resultObject) {
								return <SearchResult
											profilePic={resultObject.pic}
											mainText={resultObject.name}
											secondText={resultObject.secondText}
											id={resultObject.id}
											type={resultObject.type}
										/>
							});
		return <div>{listOfResults}</div>;
	}


	/*	Returns the HTML for all of the SearchResults inside of
		a div. If state.infoToDisplay is empty, there will be
		no SearchResults produced.
	*/
	renderResults = () => {
		if (this.state.showResults == true && this.state.searchString != "") {
			return (
				<div class="searchResultContents">
				{this.searchResults(this.state.infoToDisplay)}
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}



	render() {
		console.log("Rerendering everything");
		var initialText="Search for a user, location, or hashtag";
		return (
			<div class="searchBarWidget">
				<form onSubmit={(event) => this.handleSearch(event)}>
					<div class="searchBar">
						<input
							class="textArea"
							type="text"
							placeholder={initialText}
							name="searchString"
							onChange={this.handleChange}
							autocomplete="off"
						/>

						<input class="searchBtn" type="submit" value="" ></input>
					</div>
				</form>
				{this.renderResults()}
			</div>

		)
  }
}
