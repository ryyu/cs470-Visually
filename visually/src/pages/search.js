import React, { Component } from 'react';
import {SearchBar} from '../searchBar.js';

export class Search extends Component {
  render() {
    return (
      <div>
	  <h1>Search Page</h1>
        <SearchBar/>
      </div>
    );
  }
}

