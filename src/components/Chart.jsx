import React, { Component } from "react";
import CanvasJSReact from "../assets/chart/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class SplineChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "",
      },
      axisX: {
        title: "",
        reversed: true,
      },
      axisY: {
        title: "",
        labelFormatter: this.addSymbols,
        suffix: "x",
      },
      data: [
        {
          lineColor: "#7101ff",
          type: "spline",
          dataPoints: [
            { y: 4, label: "50" },
            { y: 3, label: "40" },
            { y: 2, label: "30" },
            { y: 1, label: "20" },
            { y: 0, label: "10" },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default SplineChart;
