import React from "react";
import * as d3 from "d3";

interface DataPoint {
    name: string;
    value: number;
}

interface BarChartProps {
    data: DataPoint[];
}

function BarChart({ data }: BarChartProps) {
    const svgRef = React.useRef<SVGSVGElement | null>(null);

    // Specify the chart’s dimensions.
    const width = 928;
    const height = 500;
    const marginTop = 20;
    const marginRight = 0;
    const marginBottom = 30;
    const marginLeft = 40;

    React.useEffect(() => {
        Test({ data });
    }, [data]);

    // function LoadBarChart({ data }: BarChartProps) {
    //     console.log(svgRef.current);
    //     const svg = d3.select(svgRef.current);

    //     // SVG 크기 설정
    //     svg.attr("width", width).attr("height", height);
    //     // Declare the x (horizontal position) scale.
    //     const x = d3
    //         .scaleUtc()
    //         .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    //         .range([marginLeft, width - marginRight]);

    //     // Declare the y (vertical position) scale.
    //     const y = d3
    //         .scaleLinear()
    //         .nice()
    //         .domain([0, 100])
    //         .range([height - marginBottom, marginTop]);

    //     // Add the x-axis.
    //     svg.append("g")
    //         .attr("transform", `translate(0,${350})`)
    //         .call(d3.axisBottom(x));

    //     // Add the y-axis.
    //     svg.append("g")
    //         .attr("style", "max-width: 100%; height: inherit;")
    //         .attr("transform", `translate(${marginLeft},0)`)
    //         .call(d3.axisLeft(y));

    //     // x, y 스케일 설정
    //     const xScale = d3
    //         .scaleBand<string>()
    //         .domain(d3.sort(data, (d) => -d.value).map((d) => d.name))
    //         .range([marginLeft, width - marginRight])
    //         .padding(0.1);

    //     const yScale = d3
    //         .scaleLinear()
    //         .domain([0, d3.max(data, (d) => d.value) || 0])
    //         .nice()
    //         .range([height - marginBottom, marginTop]);

    //     // 바 차트 그리기
    //     svg.selectAll(".bar")
    //         .data(data)
    //         .join("rect")
    //         .attr("class", "bar")
    //         .attr("x", (d) => xScale(d.name)!)
    //         .attr("y", (d) => yScale(d.value))
    //         .attr("width", xScale.bandwidth())
    //         .attr("style", "max-width: 100%; height: inherit;")
    //         .attr("height", (d) => height - yScale(d.value))
    //         .attr("fill", "steelblue");
    // }

    function Test({ data }: BarChartProps) {
        const svg = d3.select(svgRef.current);

        svg.attr("width", width).attr("height", height);

        // Create the horizontal scale and its axis generator.
        const x = d3
            .scaleBand<string>()
            .domain(d3.sort(data, (d) => -d.value).map((d) => d.name))
            .range([marginLeft, width - marginRight])
            .padding(0.1);

        const xAxis = d3.axisBottom(x).tickSizeOuter(0);

        // Create the vertical scale.
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value) || 0])
            .range([height - marginBottom, marginTop]);

        // Append the bars.
        svg.append("g")
            .attr("class", "bars")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d) => x(d.name)!)
            .attr("y", (d) => y(d.value))
            .attr("height", (d) => y(0) - y(d.value))
            .attr("width", x.bandwidth());

        // Append the axes.
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y))
            .call((g) => g.select(".domain").remove());

        svg.transition().duration(250);
    }

    return <svg ref={svgRef}></svg>;
}

export default BarChart;
