/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import * as d3 from "d3";
import { useEffect, useState } from "react";
import "../styles/chart.css";

const BarChart = ({ width, height }) => {
  const [data, setData] = useState([]);
  const ids = [
    "physics",
    "chemistry",
    "biology",
    "math",
    "history",
    "geography",
    "botany",
  ];
  function graphIt() {
    const myValue = [];
    ids.map((item) => {
      let obj = {};
      let score = Math.round(Math.random() * 100);
      obj.name = item;
      obj.score = score;
      myValue.push(obj);
      setData(myValue);
    });
  }

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    } else {
      graphIt();
    }
    return () => {};
  }, [data]);

  //10% total padding
  //D3 fix the gap between the items

  const drawChart = () => {
    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    //Domain allows how many items
    x.domain(data.map((d) => d.name));

    //d3 looks out max value
    y.domain([0, d3.max(data, (d) => d.score) + 3]);

    const chartContainer = d3
      .select("#container")
      .attr("width", width)
      .attr("height", height);

    const chart = chartContainer.append("g");

    //    enter for missing data check
    //    append new Element
    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("width", x.bandwidth())
      .attr("height", (data) => height - y(data.score))
      .attr("x", (data) => x(data.name))
      .attr("y", (data) => y(data.value));

    chart
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .text((data) => data.score)
      .attr("x", (data) => x(data.score) + 1)
      .attr("y", (data) => y(data.score) - 20);
  };

  return <div id="container"></div>;
};

export default BarChart;
