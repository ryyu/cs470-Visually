import React, { Component } from 'react';
import {SearchBar} from '../searchBar.js';
import '../stylesheets/pages/search.css';
import infoIcon from '../assets/infoIcon.svg';

var empty = {
	height: "40%",
	width: "100%",
	display: "block"
}

export class Search extends Component {
  render() {
    return (
		<div class="searchArea">
			<span class="titleText">Search for...</span>
			<SearchBar/>
			<br/>
			<br/>
			<br/>
			<img src={infoIcon} height="20px"></img>
			<span class="tipText">
				Tip: If you can't find the profile that you are looking for, make sure 
				it is a public account.
			</span>
		</div>

    );
  }
}

