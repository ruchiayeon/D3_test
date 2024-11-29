// bar chart
/**
 * 1. 날짜 또는 시간 순서대로 데이터 순차로 보여야한다.
 * 2. 줌인 , 줌아웃 가능하게
 * 3. 선택시 tooltip 보여지기
 * 4. 클릭시 해당 데이터 관련 값을 전달
 * 5. 매끄러운 애니메이션
 * 6. windows 사이즈 변환에 따른 차트 변화
 * 7. bar와 line을 같이 보이게 (시각적 용이성)
 */

import React from "react";
import * as d3 from "d3";
import { BarChartProps } from "./Interface";

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
        LoadBarChart({ data });
    }, [data]);

    function LoadBarChart({ data }: BarChartProps) {
        const svg = d3.select(svgRef.current);

        svg.attr("width", width).attr("height", height);

        // Create the horizontal scale and its axis generator.
        const x = d3
            .scaleBand<string>()
            .domain(data.map((d) => d.date))
            .range([marginLeft, width - marginRight])
            .padding(0.1);

        // const xAxis = d3.axisBottom(x).tickSizeOuter(0);

        // Create the vertical scale.
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.count) || 0])
            .range([height - marginBottom, marginTop]);

        // Append the bars.
        svg.append("g")
            .attr("class", "bars")
            .attr("fill", "steelblue")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", (d) => x(d.date)!)
            .attr("y", (d) => y(d.count))
            .attr("height", (d) => y(0) - y(d.count))
            .attr("width", x.bandwidth());

        // Append the axes.
        // svg.append("g")
        //     .attr("class", "x-axis")
        //     .attr("transform", `translate(0,${height - marginBottom})`)
        //     .call(xAxis);

        // svg.append("g")
        //     .attr("class", "y-axis")
        //     .attr("transform", `translate(${marginLeft},0)`)
        //     .call(d3.axisLeft(y))
        //     .call((g) => g.select(".domain").remove());

        svg.transition().duration(250);
    }

    return <svg ref={svgRef} />;
}

export default BarChart;
