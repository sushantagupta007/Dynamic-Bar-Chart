/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as d3 from "d3";
import { useEffect, useState } from "react";
import "../styles/chart.css";

const Chart = (props) => {
  const { width, height } = props;
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
  let myArray = [];
  const handleClick = () => {
    window.location.reload(false);
  };
  const drawChart = () => {
    const margin = { top: 70, right: 50, bottom: 70, left: 50 };

    // create the svg that holds the chart
    const svg = d3
      .select("#histogram")
      .append("svg")
      .style("background-color", "white")

      .attr("width", width)
      .attr("height", height)
      .append("g");
    // .attr("transform", `translate(0,-${margin.bottom - 10})`);

    // create the x axis scale, scaled to the states
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

    // create the y axis scale, scaled from 0 to the max
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.score + 3)])
      .range([height - margin.bottom, margin.top]);

    // create a scale between colors that varies by the frequency
    const barColors = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.score)])
      .range(["blue", "red", "green"]);

    // set the x axis on the bottom.
    // tilts the axis text so it's readable and not smushed.
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "15px")
      .attr("dx", "-.8em")
      .attr("dy", ".2em")
      .attr("transform", "rotate(-40)");

    // set the y axis on the left
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // create the actual bars on the graph, appends a 'rect' for every data element
    // sets the x and y positions relative to the scales already established
    // sets the height according to the yscale
    // static bar width, color is scaled on the y axis
    // finally the bars have an outline
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.score))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => yScale(0) - yScale(d.score))
      .style("padding", "2px")
      .style("margin", "1px")
      .style("width", (d) => `${d * 10}px`)
      .attr("fill", function (d) {
        return barColors(d.score);
      })
      .attr("stroke", "black")
      .attr("stroke-width", 1);
  };

  useEffect(() => {
    if (data.length > 0) {
      drawChart();
    } else {
      graphIt();
    }
    return () => {};
  }, [data]);

  return (
    <div id="BarChart">
      <h1> Bar Digram </h1>
      <p> Dynamic Data</p>
      <div id="histogram"></div>
      <button type="button" onClick={handleClick}>
        Change Data
      </button>
    </div>
  );
};

export default Chart;
