import React from 'react';
import { Chart, DataTable } from 'react-google-charts';
import '../stylesheets/pages/userHomepage.css';
 
export class SampleGraph extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	
	/*
		Returns an array with the number of likes for the 10 most recent
		posts, where the elements at the lowest indices are the newest
		posts.
	*/
	getNumLikes = () => {
		var numLikes = [];
		for (var i = 0; i < 10; i++) {
			numLikes.push(parseInt(this.props.recentPostsJson[i]["node"]["edge_liked_by"]["count"]));
		}
		return numLikes;
	}
	
	
	/*
		Given the number of the column, the function will generate and return
		a tooltip for it. For example, if i = 7, then a tooltip is returned
		for the 7th column in the graph.
	*/
	getTooltip = (i) => {
		var dateTaken = new Date(this.props.recentPostsJson[i]["node"]["taken_at_timestamp"] * 1000);
		var currentDate = new Date(Date.now());
		var age = parseInt((currentDate - dateTaken) / (1000 * 60 * 60 * 24));
		var ageString = "posted " + age + " days ago.";
		if (age == 0){
			ageString = "posted today";
		} else if (age == 1){
			ageString = "posted yesterday";
		}
		return "<img src=" + this.props.recentPostsJson[i]["node"]["thumbnail_src"] + ' width="100px"></img> </br>' + ageString;
	}
	
	
	/*
		Sets this.state.rows and this.state.columns to be the data that will
		be used in the graph.
	*/
	fillInData = () => {
		var numLikes = this.getNumLikes();
		console.log(numLikes);
		var newRows = [];
		
		for (var i = 0; i < 10; i++){
			newRows.push([i + 1, numLikes[i], this.getTooltip(i)]
			);
		}
		
		this.state = {
			rows: newRows,
			columns: [
				{
				  type: 'number',
				  label: 'Age',
				},
				{
				  type: 'number',
				  label: 'Weight',
				},
				{
					type: 'string',
					label: 'Tooltip',
					role: 'tooltip',
					'p': {'html': true}
				},
			],
		}
	}
	
	
	renderGraph = () => {
		if(this.props.recentPostsJson === "" || this.props.recentPostsJson==undefined) {
			return (
				<div></div>
			)
		}
		
		this.fillInData();
		return (
			<div className={'chart'}>
				<Chart
					chartType="ColumnChart"
						rows={this.state.rows}
						columns={this.state.columns}
					options={{
						tooltip: {isHtml: true},
						vAxis: { title: "number of likes"},
						hAxis: { gridlines: { count: 10 },
								 title: "posts ordered by date"},

						legend: {position: 'none'},
						colors: ["#70d8ff"]
					}}
					graph_id="ScatterChart"
					width="780px"
					height="150px"
				/>
			</div>
		)
	}
	
	
	render() {
		
		return (
			<div id="recentPostGraphWidget">
				<div class="sectionTitleArea">
					Comparison of likes from recent posts
				</div>
				{this.renderGraph()}
			</div>
      
		);
	}
}