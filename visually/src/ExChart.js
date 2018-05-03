import { Chart } from 'react-google-charts';
import React from 'react';

export class ExChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Men vs. Women',
        hAxis: { title: 'Sex', minValue: 0, maxValue: 15 },
        vAxis: { title: 'Percent', minValue: 0, maxValue: 15 },
        legend: 'none',
    },
      // data: [
      //   ['Sex', 'Percent'],
      //   ['S', 12],
      //   ['4', 5.5]
      // ],
    };
  }
  render() {

    var randomData = () => {
        var sex = [
            "Male",
            "Female"
        ];
      var x = [["Sex", "Percent"]]
      for (var i = 0; i < 2; i++){
          var rand = Math.floor(Math.random() * 10000);
          x.push([sex[i], rand])
      }
      // console.log("x", x);
      return x;
    }
    // console.log(this.state.data);
    // console.log(randomData())
    var randData = randomData()

    return (
      <Chart
        chartType="PieChart"
        data={randData}
        options={this.state.options}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    );
  }
}
export default ExChart;
