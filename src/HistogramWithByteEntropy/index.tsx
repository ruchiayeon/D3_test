import React from "react";
import * as d3 from "d3";
import histoData from "./Histogram.json";
import entropyData from "./ByteEntropy.json";
import Tooltip from "./Tooltip";

export default function LineChart() {
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement | null>(null);

  const width = 1500;
  const height = 300;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 60;
  const maxScale = 30;
  const dataSet = histoData.histogram.map((v, i) => [v, i]);
  const dataSet2 = entropyData.byteentropy.map((v, i) => [v, i]);
  const defaultBar = (width - marginLeft) / (255 * 3);

  const x = d3
    .scaleLinear()
    .domain([0, 255])
    .nice()
    .range([marginLeft, width - marginRight]);

  const xAxis = d3
    .axisBottom(x)
    .tickSize(0)
    .ticks(25)
    .tickSizeOuter(10)
    .tickPadding(10);

  const concatyData = ([] as number[]).concat(
    entropyData.byteentropy,
    histoData.histogram
  );

  const ydataSet = d3.max(concatyData) as number;

  const y = d3
    .scaleLinear()
    .domain([0, ydataSet])
    .nice()
    .range([height - marginBottom, marginTop]);

  const yAxis = d3.axisLeft(y);

  //hook
  const [toolTips, setTooltip] = React.useState(0);

  function zoomed(
    event: d3.D3ZoomEvent<SVGSVGElement, unknown>,
    svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>
  ) {
    const zoomScale = event.transform.k; // zoom factor (확대 비율)
    const barwidth = ((width - marginLeft) * zoomScale) / (255 * 3);
    const maxXScale = 25 * zoomScale > 260 ? 255 : 25 * zoomScale;
    const zoomedxAxis = d3
      .axisBottom(x)
      .tickSize(0)
      .ticks(maxXScale)
      .tickSizeOuter(10)
      .tickPadding(10);

    // x range 업데이트
    x.range(
      [marginLeft, width - marginRight].map((d) => event.transform.applyX(d))
    );

    // bars의 x-position 및 width 업데이트
    svg
      .selectAll(".byteentropy-bars rect")
      .attr("transform", `translate(${barwidth * 2},0)`)
      .attr("x", (d) => x((d as number[])[1])) // d[1]은 데이터에서의 x 값
      .attr("width", () => ((width - marginLeft) * zoomScale) / (255 * 3));

    svg
      .selectAll(".histogram-bars rect")
      .attr("transform", `translate(${barwidth},0)`)
      .attr("x", (d) => x((d as number[])[1])) // d[1]은 데이터에서의 x 값
      .attr("width", () => ((width - marginLeft) * zoomScale) / (255 * 3));

    svg
      .selectAll(".byteentropy-section rect")
      .attr("transform", `translate(${barwidth * 2},0)`)
      .attr("x", (d) => x((d as number[])[1])) // d[1]은 데이터에서의 x 값
      .attr("width", () => ((width - marginLeft) * zoomScale) / (255 * 3));

    svg
      .selectAll(".histogram-section rect")
      .attr("transform", `translate(${barwidth},0)`)
      .attr("x", (d) => x((d as number[])[1])) // d[1]은 데이터에서의 x 값
      .attr("width", () => ((width - marginLeft) * zoomScale) / (255 * 3));

    // x-axis 업데이트
    svg.selectAll<SVGGElement, unknown>(".x-axis").call(zoomedxAxis);

    svg
      .selectAll(".x-axis text")
      .style("font-size", "12px")
      .attr("transform", `translate(${barwidth * 2},0)`);
  }

  React.useEffect(() => {
    const tooltip = d3
      .select(tooltipRef.current)
      .style("display", "none")
      .style("position", "absolute")
      .style("color", "black");

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, maxScale])
      .extent([
        [marginLeft, marginBottom],
        [width - marginLeft, height - marginBottom],
      ])
      .translateExtent([
        [marginLeft, marginBottom],
        [width - marginLeft, height - marginBottom],
      ])
      .on("zoom", (e) => zoomed(e, svg));

    svg
      .append("g")
      .attr("class", "histogram-bars")
      .attr("transform", `translate(${defaultBar * 2},0)`)
      .attr("fill", "steelblue")
      .attr("cursor", "pointer")
      .selectAll("rect")
      .data(dataSet)
      .join("rect")
      .attr("x", (d) => x(d[1]))
      .attr("y", (d) => y(d[0]))
      .attr("height", (d) => y(0) - y(d[0]))
      .attr("width", defaultBar);

    svg
      .append("g")
      .attr("class", "histogram-section")
      .attr("transform", `translate(${defaultBar * 2},0)`)
      .attr("fill", "#00800000")
      .attr("cursor", "pointer")
      .selectAll("rect")
      .data(dataSet)
      .join("rect")
      .attr("x", (d) => x(d[1]))
      .attr("height", ydataSet)
      .attr("width", defaultBar)
      .on("mouseover", (e, d) => {
        setTooltip(d[1]);
        return tooltip
          .transition()
          .duration(200)
          .style("display", "block")
          .style("left", `${e.pageX + 20}px`)
          .style("top", `${e.pageY}px`)
          .style("opacity", 1);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 20}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", () => {
        tooltip
          .transition()
          .duration(200)
          .style("display", "none")
          .style("opacity", 0);
      });

    svg
      .append("g")
      .attr("class", "byteentropy-bars")
      .attr("transform", `translate(${defaultBar * 2},0)`)
      .attr("fill", "red")
      .attr("cursor", "pointer")
      .selectAll("rect")
      .data(dataSet2)
      .join("rect")
      .attr("x", (d) => x(d[1]))
      .attr("y", (d) => y(d[0]))
      .attr("height", (d) => y(0) - y(d[0]))
      .attr("width", defaultBar);

    svg
      .append("g")
      .attr("class", "byteentropy-section")
      .attr("transform", `translate(${defaultBar * 2},0)`)
      .attr("fill", "#ff000000")
      .attr("cursor", "pointer")
      .selectAll("rect")
      .data(dataSet2)
      .join("rect")
      .attr("x", (d) => x(d[1]))
      .attr("height", ydataSet)
      .attr("width", defaultBar)
      .on("mouseover", (event, d) => {
        setTooltip(d[1]);
        return tooltip
          .transition()
          .duration(200)
          .style("display", "block")
          .style("left", `${event.pageX + 20}px`)
          .style("top", `${event.pageY}px`)
          .style("opacity", 1);
      })
      .on("mousemove", (event) => {
        tooltip
          .transition()
          .duration(100)
          .style("left", `${event.pageX + 20}px`)
          .style("top", `${event.pageY}px`);
      })
      .on("mouseout", () => {
        tooltip
          .transition()
          .duration(200)
          .style("display", "none")
          .style("opacity", 0);
      });

    // Add the x-axis.
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(xAxis);

    svg
      .selectAll(".x-axis text")
      .style("font-size", "12px")
      .attr("transform", `translate(${defaultBar * 2},0)`);

    // Add the y-axis.
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call((g) =>
        g
          .selectAll(".y-axis line")
          .clone()
          .attr("x2", width)
          .attr("stroke-opacity", 0.05)
      )
      .insert("rect", ":first-child") // Insert rect before the y-axis
      .attr("x", -marginLeft) // Position the rect to cover the entire y-axis area
      .attr("y", 0)
      .attr("width", marginLeft) // Set the width of the background area (equal to marginLeft)
      .attr("height", height) // Set the height of the background area
      .attr("fill", "white");

    if (svgRef.current) {
      d3.select(svgRef.current).call(zoom);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <svg ref={svgRef} />
      <Tooltip
        histogramData={histoData.histogram}
        entropyData={entropyData.byteentropy}
        selectIdx={toolTips}
        tooltipRef={tooltipRef}
        colors={{ histogram: "blue", entropy: "red" }}
      />
    </section>
  );
}
