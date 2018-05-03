import React from 'react';
import {Chart, Datatable} from 'react-google-charts';

export class JTGraph extends React.Component {

	addData = () =>{

	let newvals = [];
	for (let i = 0; i < 11; i++){
			newvals.push([i, Math.floor(Math.random() * 100)]);
	}


		this.state = {
			rows: newvals,
			columns: [
				{
					type: 'number',
					label: 'hashtags',
				},
				{
					type: 'number',
					label: 'likes',
				},
			]
		}
	}

	render() {
		this.addData();
		return (
			<div className={'chart'}>
                <Chart
                    chartType="BarChart"
                        rows={this.state.rows}
                        columns={this.state.columns}
                    options={{
                    	title: 'How Many Hashtags to Number of Likes',
                        //tooltip: {isHtml: true},
                        vAxis: { gridlines: {count: 11}, title: "number of hashtags", baselineColor: 'none',
                        textPosition: 'none'},
                        hAxis: {title: "number of likes", bold: false, },
                        bar: {groupWidth: '95%'},
                        legend: {position: 'none'},
                        colors: ["#70d8ff"]
                    }}
                    graph_id="HorizontalBarChart"

                    width="100%"
                    height="100vh"
                    />
                    </div>
            )
		}
}