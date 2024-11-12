import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

import { DataNode, CustomHierarchyNode, ChartProps } from "./Interface";
import { ParentRecursion, CheckedWithParent } from "./Parent";
import { CheckedWithChild } from "./Children";
import { ChgCheckBoxStyle } from "./Style";
import "./test.css";

function Chart({ data }: ChartProps) {
    const [roots, setRoots] = React.useState<d3.HierarchyNode<DataNode>>();
    const [nodes, setNodes] = React.useState<CustomHierarchyNode[]>([]);
    const svgRef = useRef<SVGSVGElement | null>(null);

    React.useEffect(() => {
        const root = d3.hierarchy(data).eachBefore(
            ((i) => (d) => {
                (d as CustomHierarchyNode).index = i++;
                (d as CustomHierarchyNode).isChecked = false;
                (d as CustomHierarchyNode).isChildrenChecked = false;
                (d as CustomHierarchyNode).isChildrenAllChecked = false;
                (d as CustomHierarchyNode).isRemoved = false;
                (d as CustomHierarchyNode).isDisabled = false;
                (d as CustomHierarchyNode).isOpen = false;
            })(0)
        );
        setRoots(root);
        setNodes(root.descendants() as CustomHierarchyNode[]);
    }, [data]);

    function ClickCheckBox(event: Event, node: CustomHierarchyNode) {
        if (event.isTrusted) {
            //하위 children 이벤트
            ChildChgCheck(node);

            // //상위 parent 이벤트
            ParentRecursion(node);
        }
    }

    //하위 체크
    function ChildChgCheck(node: CustomHierarchyNode) {
        d3.hierarchy(node)
            .descendants()
            .map((n) => {
                CheckedWithParent(n);
                CheckedWithChild(n);

                ChgCheckBoxStyle({
                    node: n.data,
                    controlPoint: n.data.isChecked ? "green" : "black",
                });
            });

        // ParentRecursion(node);

        return;
        //1. 하위 체크 / 논체크
        //2. 하위
    }

    useEffect(() => {
        if (!roots) {
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
            .text((d) => `${d.data.groupName} - ${d.isChecked}`);

        node.append("title").text((d) => d.data.fullPath);
    }, [roots, nodes]);

    return (
        <section style={{ height: "100vh", overflow: "scroll", width: 700 }}>
            <svg ref={svgRef} />
        </section>
    );
}

export default Chart;
