import * as React from 'react';
import './stylesheets/graph.css';

import * as d3 from "d3";
import * as qs from "query-string"
import locationIcon from './assets/locationIcon.svg';
import hashtagIcon from './assets/hashtagIcon.svg';
import {NavLink} from 'react-router-dom';
import {Chart} from 'react-google-charts';
import {JTGraph} from './jt_graph.js';

export class Graph extends React.Component {

    constructor(props) {
        super(props);
      }

    render() {
        var name = qs.parse(this.props.location.search).text;
        var profilePic = qs.parse(this.props.location.search).src;
        var secondText = qs.parse(this.props.location.search).secText;
        console.log("secondText", secondText);
        return (
            <div className="graphWrapper">
                <h1>Overview for: {name} </h1>
                <img src={profilePic}/>
                <BarChart width={500} height={500} range={secondText}/>
                <br/>
                <LineChart width={500} height={500} />
                <br/>
                <JTGraph/>
            </div>
        )
    }

}

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
        console.log("temp[3]", temp[3]);
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
    '2',
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
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Value vs Date Graph");

    }

    render() {
        return <div className="graphResult"> </div>;
    }
}

export class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.createLineChart = this.createLineChart.bind(this);
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
        hAxis: { title: 'Time'},
        vAxis: { title: 'Number of Posts', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      rows: [
        /*
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7],
        */
        [1949,11],[1949.08333333333,11],[1949.16666666667,13],[1949.25,12],[1949.33333333333,12],[1949.41666666667,13],[1949.5,14],[1949.58333333333,14],[1949.66666666667,136],[1949.75,119],[1949.83333333333,104],[1949.91666666667,118],[1950,115],[1950.08333333333,126],[1950.16666666667,141],[1950.25,135],[1950.33333333333,125],[1950.41666666667,149],[1950.5,170],[1950.58333333333,170],[1950.66666666667,158],[1950.75,133],[1950.83333333333,114],[1950.91666666667,140],[1951,145],
        [1951.08333333333,150],[1951.16666666667,178],[1951.25,163],[1951.33333333333,172],[1951.41666666667,178],[1951.5,199],[1951.58333333333,199],[1951.66666666667,184],[1951.75,162],[1951.83333333333,146],[1951.91666666667,166],[1952,171],[1952.08333333333,180],[1952.16666666667,193],[1952.25,181],[1952.33333333333,183],[1952.41666666667,218],[1952.5,230],[1952.58333333333,242],[1952.66666666667,209],[1952.75,191],[1952.83333333333,172],[1952.91666666667,194],[1953,196],
        [1953.08333333333,196],[1953.16666666667,236],[1953.25,235],[1953.33333333333,229],[1953.41666666667,243],[1953.5,264],[1953.58333333333,272],[1953.66666666667,237],[1953.75,211],[1953.83333333333,180],[1953.91666666667,201],[1954,204],[1954.08333333333,188],[1954.16666666667,235],[1954.25,227],[1954.33333333333,234],[1954.41666666667,264],[1954.5,302],[1954.58333333333,293],[1954.66666666667,259],[1954.75,229],[1954.83333333333,203],[1954.91666666667,229],[1955,242],
        [1955.08333333334,233],[1955.16666666667,267],[1955.25,269],[1955.33333333334,270],[1955.41666666667,315],[1955.5,364],[1955.58333333334,347],[1955.66666666667,312],[1955.75,274],[1955.83333333334,237],[1955.91666666667,278],[1956,284],[1956.08333333334,277],[1956.16666666667,317],[1956.25,313],[1956.33333333334,318],[1956.41666666667,374],[1956.5,413],[1956.58333333334,405],[1956.66666666667,355],[1956.75,306],[1956.83333333334,271],[1956.91666666667,306],[1957,315],
        [1957.08333333334,301],[1957.16666666667,356],[1957.25,348],[1957.33333333334,355],[1957.41666666667,422],[1957.5,465],[1957.58333333334,467],[1957.66666666667,404],[1957.75,347],[1957.83333333334,305],[1957.91666666667,336],[1958,340],[1958.08333333334,318],[1958.16666666667,362],[1958.25,348],[1958.33333333334,363],[1958.41666666667,435],[1958.5,491],[1958.58333333334,505],[1958.66666666667,404],[1958.75,359],[1958.83333333334,310],[1958.91666666667,337],[1959,360],
        [1959.08333333334,342],[1959.16666666667,406],[1959.25,396],[1959.33333333334,420],[1959.41666666667,472],[1959.5,548],[1959.58333333334,559],[1959.66666666667,463],[1959.75,407],[1959.83333333334,362],[1959.91666666667,405],[1960,417],[1960.08333333334,391],[1960.16666666667,419],[1960.25,461],[1960.33333333334,472],[1960.41666666667,535],[1960.5,622],[1960.58333333334,606],[1960.66666666667,508],[1960.75,461],[1960.83333333334,390],[1960.91666666667,432]
      ],
      columns: [
        {"label":"day","type":"number"},
        {"label":"number of posts","type":"number"},
        /*
        {
          type: 'number',
          label: 'Age',
        },
        {
          type: 'number',
          label: 'Weight',
        },*/
      ],
    };
  }

  generateData = () => {
    var days = [
    1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,
    27,28,29,30];

    var a = [];
    for(var i = 0; i < days.length; i++) {
        var rand = Math.floor(Math.random() * 25);
        a.push([days[i], rand]);
    }
    console.log('a',a);
    return a;
  }

  createLineChart(props) {

  }

  render() {
      var data = this.generateData();
      return <div className="lineResult">
        <Chart
        chartType="LineChart"
        rows={data}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        chartEvents={this.chartEvents}
        />
      </div>;
  }
}
