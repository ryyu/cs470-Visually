import React, { Component } from 'react';
import {SearchBar} from '../searchBar.js';



export class Search extends Component {
  render() {
    return (
		<div id="searchArea">
			<h1>Search for...</h1>
			<SearchBar/>
		</div>

    );
  }
}

