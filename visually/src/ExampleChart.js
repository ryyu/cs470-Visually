import { Chart } from 'react-google-charts';
import React from 'react';

class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'My Graph',
        hAxis: { title: 'Month', minValue: 0, maxValue: 10 },
        vAxis: { title: 'Follows', minValue: 0, maxValue: 10 },
        legend: 'none',
      }
    };

    // this.componentDidMount = this.componentDidMount.bind(this);
} // constructor

// componentDidMount() {
//     this.setState(this.data());
// }

  //
  // var data = [];
  // var range = Math.floor(Math.random())
  // for (i = 0; i < 24; i++) {
  //
  // }




  render() {
    var randomData = () => {
          var months = [
              'January',
              'Febuary',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'];

        var x = [["Month", "Follows"]]
        for (var i = 0; i < 12; i++){
            var rand = Math.floor(Math.random() * 100);
            x.push([months[i], rand])
        }
        // console.log("x", x);
        return x;
      }
    // console.log(this.state.data);
    // console.log(randomData())
    var randData = randomData()
    return (

      <Chart
        chartType="LineChart"
        data= {randData}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    );
  }
}
export default ExampleChart;
