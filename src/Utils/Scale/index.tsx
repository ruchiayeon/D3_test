import React, { useRef, useEffect, useState } from "react";
import {
    select,
    scaleBand,
    scaleLinear,
    axisLeft,
    axisBottom,
    scaleTime,
} from "d3";

export default function XYScale(props: {
    children?: JSX.Element;
    XScaleList: string[];
    YScaleList: number[];
    width: number;
    height: number;
    padding: number;
}) {
    const { XScaleList, YScaleList, width, padding, height } = props;

    const lineRef = useRef(null);
    const XScale = scaleTime()
        .rangeRound([padding, width - padding])
        .domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
    // .domain(XScaleList)

    // console.log(XScale.bandwidth());

    const YScale = scaleLinear().range([height, padding]).domain(YScaleList);

    useEffect(() => {
        LineXYScale();
    }, []);

    function LineXYScale() {
        const svg = select(document.getElementById("tester123123")); // selection 객체

        //Y축 그리기
        svg.append("g")
            // .transition()
            .attr("transform", `translate(${padding},0)`)
            .call(axisLeft(YScale));

        //X축 그리기
        svg.append("g")
            // .transition()
            .attr("transform", `translate(0,${height})`)
            .call(axisBottom(XScale));

        return;
    }

    return (
        <g
            id="tester123123"
            style={{ padding: "0 1rem" }}
            ref={lineRef}
            width={window.innerWidth}
            height="600"
        >
            {props.children}
        </g>
    );
}
