import React from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

import { DataNode, CustomHierarchyNode, ChartProps } from "./Interface";
import { ParentRecursion } from "./Parent";
import { ChildChgCheck } from "./Child";
import CheckedData from "./CheckedData";
import "./test.css";

function Chart() {
    const [roots, setRoots] = React.useState<d3.HierarchyNode<DataNode>>();
    const [nodes, setNodes] = React.useState<CustomHierarchyNode[]>([]);
    const getStore = useSelector(
        (state: { groups: ChartProps }) => state.groups
    );

    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const nodeSize = 35;
    const width = 928;
    const height = (nodes.length + 1) * nodeSize;

    const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [25, -25, width, height])
        .attr("style", "height: auto; font: 11pt sans-serif; ");

    const ClickCheckBox = React.useCallback(
        (event: Event, node: CustomHierarchyNode) => {
            if (event.isTrusted) {
                //하위 children 이벤트
                ChildChgCheck({
                    node,
                    color: getStore.color,
                    type: getStore.type,
                });

                // //상위 parent 이벤트
                ParentRecursion({
                    node,
                    color: getStore.color,
                    type: getStore.type,
                });
            }
        },
        [getStore]
    );

    function MakeDefaultTree() {
        if (!roots || !nodes) {
            return;
        }

        const node = svg
            .append("g")
            .selectAll("g")
            .data(nodes)
            .join(
                (enter) => enter.append("g"),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr("id", (d) => `${d.data.groupCode} groupItem`)
            .attr(
                "transform",
                (d) =>
                    `translate(0,${
                        d.isOpen
                            ? d.index * nodeSize - 5
                            : d.index * nodeSize - 15
                    })`
            );

        node.append("polyline")
            .attr("width", 17)
            .attr("height", 17)
            .attr("id", (d) => `${d.data.groupCode} arrow`)
            .attr("x", (d) => d.depth * nodeSize + 5)
            .on("click", ClickCheckBox)
            .join(
                (enter) => enter.append("polyline"),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr(
                "points",
                (d) =>
                    `${d.depth * nodeSize - 6},${nodeSize - 32} ${
                        d.depth * nodeSize - 1
                    },${nodeSize - 26} ${d.depth * nodeSize - 6},${
                        nodeSize - 20
                    }`
            )
            .style("fill", (d) => `${d.isChecked ? getStore.color : "black"}`)
            .attr(
                "style",
                "cursor: pointer; fill:none;stroke:red;stroke-width:3; stroke-linecap: round;"
            );

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
            .style("fill", (d) => `${d.isChecked ? getStore.color : "black"}`)
            .style("stroke", (d) => `${d.isChecked ? getStore.color : "black"}`)
            .style("stroke-width", 1.5)
            .style("fill-opacity", (d) => `${d.isChecked ? 1 : 0}`)
            .style("cursor", "pointer")
            .style("display", (d) => `${!d.isOpen && "none"}`);

        node.append("polyline")
            .attr("width", 17)
            .attr("height", 17)
            .attr("id", (d) => `${d.data.groupCode} mark`)
            .on("click", ClickCheckBox)
            .join(
                (enter) => enter.append("polyline"),
                (update) => update,
                (exit) => exit.remove()
            )
            .attr(
                "points",
                (d) =>
                    `${d.depth * nodeSize + 8},${nodeSize - 26} ${
                        d.depth * nodeSize + 13
                    },${nodeSize - 22} ${d.depth * nodeSize + 19},${
                        nodeSize - 30
                    }`
            )
            .attr(
                "style",
                "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
            )
            .style("cursor", "pointer")
            .style("display", (d) => `${!d.isOpen && "none"}`);

        node.append("text")
            .attr("dy", "0.33em")
            .attr("id", (d) => `${d.data.groupCode} groupText`)
            .attr("x", (d) => d.depth * nodeSize + 30)
            .attr("y", 10)
            .on("click", TreeAcodian)
            .attr(
                "style",
                (d) =>
                    `${
                        d.isOpen
                            ? "cursor: pointer; opacity: 1;"
                            : "display: none;"
                    }`
            )
            .join(
                (enter) => enter.append("text"),
                (update) => update,
                (exit) => exit.remove()
            )
            .text((d) => `${d.data.groupName} - ${d.isChecked} ${d.isOpen}`);

        node.append("title").text((d) => d.data.fullPath);
    }

    function TreeAcodian(event: Event, node: CustomHierarchyNode) {
        //첫번째 전체 선택 기능 삭제 및 전체 open close 삭제
        if (event.isTrusted && node.children) {
            console.log(node.descendants());
            node.descendants().map((child, index) => {
                if (index) {
                    HiddenGroupItem(child);
                    // AccodianTree();
                }
            });
        }
    }

    function HiddenGroupItem(child: CustomHierarchyNode) {
        child.isOpen = !child.isOpen;

        d3.select(document.getElementById(`${child.data.groupCode} groupItem`))
            .transition()
            .duration(300)
            .attr(
                "transform",
                `translate(0,${
                    child.isOpen
                        ? child.index * nodeSize - 5
                        : child.index * nodeSize - 15
                })`
            );

        d3.select(document.getElementById(`${child.data.groupCode} checkbox`))
            .transition()
            .duration(300)
            .style("fill", `${child.isChecked ? getStore.color : "black"}`)
            .style("stroke", `${child.isChecked ? getStore.color : "black"}`)
            .style("fill-opacity", `${child.isChecked ? 1 : 0}`)
            .style("cursor", "pointer")
            .style("stroke-width", 1.5)
            .style("display", `${child.isOpen ? "" : "none"}`);

        d3.select(document.getElementById(`${child.data.groupCode} groupText`))
            .transition()
            .duration(300)
            .attr(
                "style",
                `${
                    child.isOpen
                        ? "opacity:1; cursor: pointer;"
                        : "display: none;"
                }`
            );
    }

    React.useEffect(() => {
        if (!getStore.data.groupCode) {
            return;
        }

        const root = CheckedData({
            checked: getStore.checked,
            data: getStore.data,
            type: getStore.type,
            defaultView: 2,
        });

        setRoots(root);
        setNodes(root.descendants() as CustomHierarchyNode[]);
    }, [getStore]);

    React.useEffect(() => {
        MakeDefaultTree();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roots, nodes]);

    return (
        <section style={{ height: "100vh", overflow: "scroll", width: 700 }}>
            <svg ref={svgRef} />
        </section>
    );
}

export default Chart;
