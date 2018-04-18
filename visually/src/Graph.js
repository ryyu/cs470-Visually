import * as React from 'react';
import './stylesheets/graph.css';

import * as d3 from "d3";
import locationIcon from './assets/locationIcon.svg';
import hashtagIcon from './assets/hashtagIcon.svg';
import {NavLink} from 'react-router-dom';

export class Graph extends React.Component {

    constructor(props) {
        super(props);
      }

    render() {
        const filteredAppdata = [30, 86, 168, 281, 303, 365];

        return (
            <div className="graphWrapper">
                <BarChart data={filteredAppdata} width={500} height={500}/>
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

    componentDidUpdate() {
        this.createBarChart()
    }
/*

    createBarChart(props) {

        const da = this.props.data;

        d3.select(".graphResult")
            .selectAll("div")
            .data(da)
            .enter()
            .append("div")
            .style("width", function (d) {
                return d + "px";
            })
            .style("background-color", function(d) {
                return "white";
            })
            .text(function (d) {
                return d;
            });
    }
*/

  generateData = () => {
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
        var rand = Math.floor(Math.random() * 100);
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
      var fullHeight = 200;
      // the width and height values will be used in the ranges of our scales
      var width = fullWidth - margin.right - margin.left;
      var height = fullHeight - margin.top - margin.bottom;
      var svg = d3.select('.graphResult').append('svg')
      .attr('width', fullWidth)
      .attr('height', fullHeight)
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

    }

    render() {
        return <div className="graphResult"> </div>;    
    }
}
