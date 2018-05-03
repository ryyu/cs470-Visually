import * as React from 'react';
import './stylesheets/graph.css';

import * as d3 from "d3";
import * as qs from "query-string"
import locationIcon from './assets/locationIcon.svg';
import hashtagIcon from './assets/hashtagIcon.svg';
import {NavLink} from 'react-router-dom';
import {Chart} from 'react-google-charts';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {JTGraph} from './jt_graph.js';
import {ExampleChart} from './ExampleChart.js'

export class Graph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          type: 'Likes vs Time',
        }
      }

    handleChange = option => {
      console.log("option", option.value);
      this.setState({type: option.value});
    }

    RenderGraphs(text) {
      console.log("rendering graphs")
      const type = this.state.type;
      console.log(text);
      if (type === 'Likes vs Time') {
        return <BarChart width={500} height={500} range={text}/>
      }
      else if (type === 'HashTags vs Likes') {
        return <JTGraph />
      }
      else if (type === 'Number of Posts Per Month') {
        return <ExampleChart />
      }
      return <LineChart width={500} height={500} />
    }

    render() {
        var name = qs.parse(this.props.location.search).text;
        var profilePic = qs.parse(this.props.location.search).src;
        var secondText = qs.parse(this.props.location.search).secText;
        console.log("secondText", secondText);
        const options = ['Likes vs Time', 'Post Frequency', 'HashTags vs Likes', 'Number of Posts Per Month'];
        return (
            <div className="graphWrapper">
                <h1>Overview for: {name} </h1>
                <img src={profilePic} class="rounded"/>
                <br/>
                {this.RenderGraphs(secondText)}
                <br/>
                <Dropdown options={options} onChange={this.handleChange} value={options[0]} placeholder="Select an option" />
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

/*
export class BarChart extends React.Component {
  constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
      this.createBarChart()
  }

  generateData = () => {
    let r = this.props.range;
    let parseText = () => {
        let temp = this.props.range;
        let ret = 1;
        for(var i = 0; i < temp.length; i++) {
          if(temp[i] === 'm') {
            ret = 1000000;
          }
        }
        return ret;
    };

    let mod = parseText();
    console.log("mod", mod);
    let range = parseInt(r) * mod; // maybe need to multiply by some factor
                             // 'm' => * 1,000,000 if js can handle numbers that big
    if(range === NaN || range === 0) {
      range = 100;
    }

    console.log("range", range);
    var times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'];

    var a = [];
    for(var i = 0; i < 24; i++) {
        var rand = Math.floor(Math.random() * range);
        a.push({
          likes: rand,
          times: times[i]
        });
    }


    return a;
  }

  createBarChart(props) {

      var data = this.generateData();
      var times = data.map(function(t) {
      return t.times
      });

      var margin = {top: 5, right: 5, bottom: 50, left: 50};
      // here, we want the full chart to be 700x200, so we determine
      // the width and height by subtracting the margins from those values
      var fullWidth = 1400;
      var fullHeight = 300;
      // the width and height values will be used in the ranges of our scales
      var width = fullWidth - margin.right - margin.left;
      var height = fullHeight - margin.top - margin.bottom;
      var svg = d3.select('.graphResult').append('svg')
      .attr('width', fullWidth)
      .attr('height', fullHeight)
      .style('padding-top', '25px')
      // this g is where the bar chart will be drawn
      .append('g')
      // translate it to leave room for the left and top margins
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // x value determined by month
      var timesScale = d3.scaleBand()
      .domain(times)
      .range([0, width])
      .paddingInner(0.1)
      .paddingOuter(0.1);

      // the width of the bars is determined by the scale
      var bandwidth = timesScale.bandwidth();

      // y value determined by temp
      var maxlikes = d3.max(data, function(d) { return d.likes; });
      var likesScale = d3.scaleLinear()
      .domain([0, maxlikes])
      .range([height, 0])
      .nice();

      var xAxis = d3.axisBottom(timesScale);
      var yAxis = d3.axisLeft(likesScale);

      // draw the axes
      svg.append('g')
      .classed('x axis', true)
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

      var yAxisEle = svg.append('g')
      .classed('y axis', true)
      .call(yAxis);

      // add a label to the yAxis
      var yText = yAxisEle.append('text')
      .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .attr('dy', '-2.5em')
      .style('font-size', 14)
      .text('Number of Likes');

      var barHolder = svg.append('g')
      .classed('bar-holder', true);

      // draw the bars
      var bars = barHolder.selectAll('rect.bar')
      .data(data)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', function(d, i) {
        // the x value is determined using the
        // month of the datum
        return timesScale(d.times)
      })
      .attr('width', bandwidth)
      .attr('y', function(d) {
        // the y position is determined by the datum's temp
        // this value is the top edge of the rectangle
        return likesScale(d.likes);
      })
      .attr('height', function(d) {
        // the bar's height should align it with the base of the chart (y=0)
        return height - likesScale(d.likes);
      });

      svg.append("text")
        .attr("x", "10vw")
        .attr("y", 0 - 15)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Value vs Date Graph");

    }

    render() {
        return <div className="graphResult"> </div>;
    }
}
*/
export class BarChart extends React.Component {
  constructor(props){
      super(props)
      this.chartEvents = [
        {
          eventName: 'select',
          callback(Chart) {
              // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
            console.log('Selected ', Chart.chart.getSelection());
          },
        },
      ];
      this.state = {
        options: {
          title: 'Number of Post Likes Sorted by Time Posted',
          hAxis: { title: 'Time'},
          vAxis: { title: 'Number of Likes'}, // minHeight, maxHeight
          legend: 'none',
          colors: ['#70d8ff'],
        },
        columns: [
          {"label":"day","type":"string"},
          {"label":"likes","type":"number"},
        ],
      };
  }

  generateData = () => {
    if(this.props.range != undefined || this.props.range != null) {
    let r = this.props.range;
    let parseText = () => {
        let temp = this.props.range;
        let ret = 1;
        for(var i = 0; i < temp.length; i++) {
          if(temp[i] === 'm') {
            ret = 1000000;
          }
        }
        return ret;
    };

    let mod = parseText();
    console.log("mod", mod);
    let range = parseInt(r) * mod; // maybe need to multiply by some factor
                             // 'm' => * 1,000,000 if js can handle numbers that big
    if(range === NaN || range === 0) {
      range = 100;
    }

    console.log("range", range);
    var times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'];

    var a = [];
    for(var i = 0; i < 24; i++) {
        var rand = Math.floor(Math.random() * range);
        a.push([times[i], rand]);
    }
    console.log(a);
    return a;
  }
  }

  render() {
      var data = this.generateData();
      return <div className="BarResult">
        <Chart
        chartType="ColumnChart"
        rows={data}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="BarChart"
        width="100%"
        height="300px"
        chartEvents={this.chartEvents}
        />
      </div>;
  }
}

export class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {
            // Returns Chart so you can access props and  the ChartWrapper object from chart.wrapper
          console.log('Selected ', Chart.chart.getSelection());
        },
      },
    ];
    this.state = {
      options: {
        title: 'Post Frequency for the month of April',
        hAxis: { title: 'Day of the Month'},
        vAxis: { title: 'Number of Posts'}, // minHeight, maxHeight
        legend: 'none',
        colors: ['#70d8ff'],
      },
      columns: [
        {"label":"day","type":"number"},
        {"label":"number of posts","type":"number"},
      ],
    };
  }

  generateData = () => {
    var days = [
    1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,
    27,28,29,30];

    var a = [];
    for(var i = 0; i < days.length; i++) {
        var rand = Math.floor(Math.random() * 5);
        a.push([days[i], rand]);
    }
    console.log('a',a);
    return a;
  }

  render() {
      var data = this.generateData();
      return <div className="lineResult">
        <Chart
        chartType="LineChart"
        rows={data}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="LineChart"
        width="100%"
        height="300px"
        chartEvents={this.chartEvents}
        />
      </div>;
  }
}
