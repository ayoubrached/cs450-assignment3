import React, {Component} from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("Component has mounted.");
  }

  componentDidUpdate() {
    var data = this.props.data;
    var margin = { top: 30, right: 10, bottom: 30, left: 40 },
        w = 1200 - margin.left - margin.right,
        h = 350 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg");

    container
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .select(".g_2")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    container
        .append("text")
        .attr("class", "title")
        .attr("x", (w + margin.left + margin.right) / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Average Tip by Day");

    container
        .append("text")
        .attr("class", "xtitle")
        .attr("x", (w + margin.left + margin.right) / 2)
        .attr("y", h + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Day");

    container
        .append("text")
        .attr("class", "ytitle")
        .attr("x", -(h / 2))
        .attr("y", (margin.left - 10) / 2)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .style("font-size", "16px")
        .text("Average Tip");

    const averageTipData = d3.flatRollup(
        data,
        v => d3.mean(v, d => d.tip),
        d => d.day
    ).map(([day, average_tip]) => ({ day, average_tip }));

    const x_scale = d3.scaleBand()
        .domain(averageTipData.map(d => d.day))
        .range([0, w])
        .padding(0.2);

    const y_scale = d3.scaleLinear()
        .domain([0, d3.max(averageTipData, d => d.average_tip)])
        .range([h, 0]);

    container
        .selectAll(".x_axis_g")
        .data([0])
        .join("g")
        .attr("class", "x_axis_g")
        .attr("transform", `translate(0, ${h})`)
        .call(d3.axisBottom(x_scale));

    container
        .selectAll(".y_axis_g")
        .data([0])
        .join("g")
        .attr("class", "y_axis_g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y_scale));

    container
        .selectAll("rect")
        .data(averageTipData)
        .join("rect")
        .attr("x", function (d) {
            return x_scale(d.day);
        })
        .attr("y", function (d) {
            return y_scale(d.average_tip);
        })
        .attr("width", x_scale.bandwidth())
        .attr("height", function (d) {
            return h - y_scale(d.average_tip);
        })
        .style("fill", "#69b3a2");
    }

  render() {
    return <svg className="child2_svg">
        <g className="g_2"></g>
    </svg>
  }
}

export default Child2;