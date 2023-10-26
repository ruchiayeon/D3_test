import { useRef, useEffect } from "react";
import {
    select,
    line,
    easeLinear,
    CurveFactory,
    CurveCardinalFactory,
    CurveCatmullRomFactory,
} from "d3";

export default function Linchart(props: {
    data: [number, number][][];
    curveType: CurveFactory | CurveCardinalFactory | CurveCatmullRomFactory;
    option: {
        width: number;
        height: number;
        intervalWidth: number;
        color: string;
        strokeWidth: number;
    };
}) {
    const { data, curveType, option } = props;

    const gRef = useRef(null);

    useEffect(() => {
        const svg = select(gRef.current); // selection 객체

        // line 객체를 만들자
        const customLine = line()
            .curve(curveType)
            .x((d, index, data) => index * option.intervalWidth)
            .y((d, index, data) => d[0]);

        // console.log(customLine());

        // 라인 그래프 그리기
        svg.selectAll("path")
            .data(data) //데이터가 다양해도 하나로 만들어서 보내주면 라인차트 가능하다.
            .join(
                (enter) => enter.append("path"),
                (update) => update,
                (exit) => exit.remove()
            )
            .transition()
            .duration(1000)
            .ease(easeLinear)
            //스타일
            .attr("stroke-width", 3)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-dasharray", "0 5")
            .attr("fill", "none")
            .attr("stroke", option.color)
            .attr("transform", `translate(${82},40)`)
            //값 넣어주기
            .attr("d", (value) => customLine(value));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return <g ref={gRef} width={option.width} />;
}
