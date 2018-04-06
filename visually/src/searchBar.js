import * as React from 'react';
import './stylesheets/searchBar.css';

class SearchResult extends React.Component {
	render() {
		return(
			<div class="searchResult">
				<img src={this.props.profilePic} class="resultPic"/>
				<div class="resultTextArea">
				{this.props.username}
				</div>
			</div>
		)
	}
}



export class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {	showResults: false, 
						infoToDisplay: [],
						searchString: ""
					 };
	}
	
	
	/*	Returns an array of objects that contain profile picture links
		and user names. To get values from this array, refer to the
		objects with varName[idx].name
	*/
	getPicsAndNames = (jsonObject) => {
		var picsAndNames = [];
		for (var i = 0; i < jsonObject.users.length; i++) {
			picsAndNames.push({
				pic: jsonObject.users[i].user.profile_pic_url, 
				name: jsonObject.users[i].user.username,
				id: jsonObject.users[i].user.pk
			});
		}
		console.log(picsAndNames);
		return picsAndNames;
	}
	
	
	
	handleChange = event => {
		const target = event.target;
		const name = target.name
		this.setState({[name]: event.target.value});
	}
	
	
	
	/*	Checks to see if the response from the request is ready to
		be used.
	*/
	isValidHttpResponse = (request) => {
		return request.readyState == 4 && request.status == 200;
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
		var url = "https://www.instagram.com/web/search/topsearch/?context=blended&query=" + this.state.searchString;
		
		request.open("GET", url, true);
		request.send();
		
		//Parse the JSON once it is received
		request.onreadystatechange = () => {
			if (this.isValidHttpResponse(request)) {
				results = JSON.parse(request.responseText);
				this.setState(
					{
						showResults:true, 
						infoToDisplay: this.getPicsAndNames(results)
					}
				);
			} 
		}
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
											username={resultObject.name}
											id={resultObject.id}
										/>
							});
		return <div>{listOfResults}</div>;
	}
	
	
	
	renderResults = () => {
		if (this.state.showResults == true) {
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
			<div class="searchBarContainer">
				<form onSubmit={(event) => this.handleSearch(event)}>
					<input 
						class="mainSearchBar"
						type="text"
						placeholder={initialText}
						name="searchString"
						onChange={this.handleChange}
						autocomplete="off"
					/>

					<input class="searchBtn" type="submit" value="" ></input>
				</form>
				{this.renderResults()}
			</div>
			
		)
  }
}