import React from "react";
import * as d3 from "d3";

import { DataNode, CustomHierarchyNode, ChartProps } from "./Interface";
import { ParentRecursion } from "./Parent";
import { ChildChgCheck } from "./Children";
import CheckedData from "./CheckedData";
import "./test.css";

function Chart({ data, type, color, checked }: ChartProps) {
    const [roots, setRoots] = React.useState<d3.HierarchyNode<DataNode>>();
    const [nodes, setNodes] = React.useState<CustomHierarchyNode[]>([]);
    const svgRef = React.useRef<SVGSVGElement | null>(null);

    React.useEffect(() => {
        if (!data.groupCode) {
            return;
        }

        const root = CheckedData({ checked, data, type });

        setRoots(root);
        setNodes(root.descendants() as CustomHierarchyNode[]);
    }, [data, checked, type]);

    const ClickCheckBox = React.useCallback(
        (event: Event, node: CustomHierarchyNode) => {
            if (event.isTrusted) {
                //하위 children 이벤트
                ChildChgCheck({ node, color: color, type });

                // //상위 parent 이벤트
                ParentRecursion({ node, color: color, type });
            }
        },
        [color, type]
    );

    React.useEffect(() => {
        if (!roots || !nodes) {
            return;
        }

        const nodeSize = 35;
        const width = 928;
        const height = (nodes.length + 1) * nodeSize;

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-5, -nodeSize, width, height])
            .attr("style", "height: auto; font: 11pt sans-serif; ");

        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#eee")
            .attr("stroke-width", "1")
            .selectAll("path")
            .data(roots.links())
            .join(
                (enter) => enter.append("path"),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr(
                "d",
                (d) => `
        M${d.source.depth * nodeSize},${
                    (d.source as CustomHierarchyNode).index * nodeSize
                }
        V${(d.target as CustomHierarchyNode).index * nodeSize}
        h${nodeSize}
      `
            );

        const node = svg
            .append("g")
            .selectAll("g")
            .data(nodes)
            .join(
                (enter) => enter.append("g"),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr("transform", (d) => `translate(0,${d.index * nodeSize - 5})`);

        node.append("rect")
            .attr("width", 17)
            .attr("height", 17)
            .attr("id", (d) => `${d.data.groupCode} checkbox`)
            .attr("x", (d) => d.depth * nodeSize + 5)
            .attr("rx", 3)
            .attr("ry", 3)
            .on("click", ClickCheckBox)
            .join(
                (enter) => enter.append("rect"),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr(
                "style",
                "cursor: pointer; fill-opacity: 0; stroke-width: 1.5 ; stroke: black;"
            );

        node.append("polyline")
            .attr("id", (d) => `${d.data.groupCode} mark`)
            .on("click", ClickCheckBox)
            .attr("width", 17)
            .attr("height", 17)
            .join(
                (enter) => enter.append("polyline"),
                (update) => update,
                (exit) => exit.remove()
            );

        node.append("text")
            .attr("dy", "0.33em")
            .attr("id", (d) => `${d.data.groupCode} groupText`)
            .attr("x", (d) => d.depth * nodeSize + 30)
            .attr("y", 10)
            .on("click", (event, d) => {
                console.log(event);
                console.log(d);
            })
            .attr("style", `cursor: pointer; opacity: 1;`)
            .join(
                (enter) => enter.append("text"),
                (update) => update,
                (exit) => exit.remove()
            )
            .text((d) => `${d.data.groupName} - ${d.isRemoved}`);

        node.append("title").text((d) => d.data.fullPath);
    }, [roots, nodes, ClickCheckBox]);

    return (
        <section style={{ height: "100vh", overflow: "scroll", width: 700 }}>
            <svg ref={svgRef} />
        </section>
    );
}

export default Chart;
