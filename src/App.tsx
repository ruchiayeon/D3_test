import { useState } from "react";
import { curveLinear } from "d3";

import XYScale from "./Utils/Scale";
import Linchart from "./Utils/LineChart";
import BarChart from "./Utils/BarChart/index";

export default function App() {
    const [lineData, setLineData] = useState<[number, number][][]>([]);
    const XDataSet = ["오사카", "도쿄", "오사카2", "도쿄2"];

    const height = 600;
    const padding = 40;
    const width = 1200;
    return (
        <>
            {/* <BarChart /> */}
            <svg width={width + padding} height={height + padding}>
                <XYScale
                    height={height}
                    width={width}
                    padding={padding}
                    XScaleList={XDataSet}
                    YScaleList={[0, 1000]}
                >
                    <Linchart
                        data={lineData}
                        curveType={curveLinear}
                        option={{
                            width: width,
                            height: height,
                            intervalWidth: 88,
                            color: "green",
                            strokeWidth: 1,
                        }}
                    />
                </XYScale>
            </svg>

            {/* <XYScale>
                <Linchart />
            </XYScale> */}

            <button
                onClick={() => {
                    setLineData([
                        [
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                        ],
                        [
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                            [Math.random() * 100, Math.random() * 100],
                        ],
                    ]);
                }}
            >
                dddd
            </button>
        </>
    );
}
