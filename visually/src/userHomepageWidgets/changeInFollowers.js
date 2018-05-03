import React, { Component } from 'react';
import '../stylesheets/pages/userHomepage.css';

class ChangeArea extends Component {
	render() {
		return(
				<div class="numberArea">
					<span>
					in the last {this.props.days} days
					<br/>
					<span class="changeNumber greenFont">+{this.props.change}</span> 
					</span>
				</div>
		)
	}
}


export class ChangeInFollowers extends Component {
	
	/*
		Hashes the number of followers into a number of followers gained for
		a single day.
	*/
	getChangeInDay = () => {
		var divider = 100000;
		if (this.props.followers > 1000000){
			divider = 4000000;
		} else if (this.props.followers > 100000){
			divider = 1000000;
		} 
		var multiplier = ((this.props.followers % 50) + 1) / divider;
		var addition = (this.props.followers % 7);
		console.log(multiplier);
		return Math.ceil(this.props.followers * multiplier + addition);
	}
	
	render(){
		return (
			<div class="changeInFollowersWidget">
				<div class="sectionTitleArea">
						Change in followers 
				</div>
				<ChangeArea
					change={this.getChangeInDay() * 7}
					days={7}
				/>
				<ChangeArea
					change={this.getChangeInDay() * 30}
					days={30}
				/>
			</div>
		)
	}
}