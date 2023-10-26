import React, { useState, useRef, useEffect } from "react";
import { select } from "d3";

export default function BarChart(props: any): React.ReactElement {
    const [data, setData] = useState<number[]>([]);

    const svgRef = useRef(null);
    // const svgRef2 = useRef(null);

    useEffect(() => {
        const svg = select(svgRef.current);

        // 막대 차트를 위한 초기 셀렉터를 설정한다.
        svg.selectAll("div")
            // 데이터를 해당 셀렉터에 바인딩한다.
            .data(data)
            // .attr("d", data)
            // 바인딩된 데이터에 따라 입력될 막대 요소를 지정한다.
            .join("div")
            .attr("fill", "steelblue")
            .selectAll()
            .data(data)
            .join("rect")
            //   .attr("x", (d) => x(d.letter))
            //   .attr("y", (d) => y(d.frequency))
            //   .attr("height", (d) => y(0) - y(d.frequency))
            //   .attr("width", x.bandwidth());
            .transition()
            // 각 막대의 스타일을 정의한다.
            .style("background", "blue")
            .style("color", "white")
            .style("font-weight", "bold")
            .style("padding", "5px")
            .style("margin", "1px")
            .style("height", (d) => `${d}px`)
            .style("height", (d) => `${10}px`)
            // 각 막대 안에 들어갈 text를 설정한다.
            .text((d) => d);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <section>
            {/**div 안에 path 받아서 tester */}
            <div className="tester" ref={svgRef} />
            {props.children}
            <button
                onClick={() => {
                    setData([...data, Math.random() * 100]);
                }}
            >
                new line chart
            </button>
            <button
                onClick={() => {
                    setData([]);
                }}
            >
                reset
            </button>
        </section>
    );
}
