import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("Component has mounted.");
  }

  componentDidUpdate() {
    var data = this.props.data;

    var margin = { top: 30, right: 10, bottom: 30, left: 50 },
        w = 300 - margin.left - margin.right,
        h = 350 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg");

    container
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    container
      .append("text")
      .attr("class", "title")
      .attr("x", (w + margin.left + margin.right) / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Total Bill vs Tips");

    container
      .append("text")
      .attr("class", "xtitle")
      .attr("x", (w + margin.left + margin.right) / 2)
      .attr("y", h + 40)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Total Bill");

    container
      .append("text")
      .attr("class", "ytitle")
      .attr("x", -(h / 2))
      .attr("y", margin.left / 2)
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "16px")
      .text("Tips");

    const maxTotalBill = d3.max(data, d => d.total_bill);
    const maxTip = d3.max(data, d => d.tip);

    const x_scale = d3.scaleLinear().domain([0, maxTotalBill]).range([margin.left, w]);
    const y_scale = d3.scaleLinear().domain([0, maxTip]).range([h, 0]);

    // Add X axis
    container
      .append("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    // Add Y axis
    container
      .append("g")
      .attr("class", "y_axis_g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y_scale));

    container
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", function (d) {
        return x_scale(d.total_bill);
      })
      .attr("cy", function (d) {
        return y_scale(d.tip);
      })
      .attr("r", 3)
      .style("fill", "#69b3a2");
  }

  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default Child1;
