import React from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

import { CustomHierarchyNode, ChartProps, IChecked } from "./Interface";
import { ParentRecursion } from "./Parent";
import { ChildChgCheck } from "./Child";
import CheckedData from "./CheckedData";
import CheckedList from "./CheckedMap";
import "./test.css";
// import { setTreeHierarchy } from "../Redux/reducer";

function Chart() {
    // const dispatch = useDispatch();
    const [nodes, setNodes] = React.useState<CustomHierarchyNode[]>([]);
    const [checkednodes, setCheckedNodes] = React.useState<
        Map<string, IChecked>
    >(new Map());
    const [nodeHeight, setNodeHeight] = React.useState<number>(0);
    const getStore = useSelector(
        (state: { groups: ChartProps }) => state.groups
    );

    const svgRef = React.useRef<SVGSVGElement | null>(null);
    const nodeSize = 35;
    const width = 928;

    const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", nodeHeight)
        .attr("viewBox", [0, -26, width, nodeHeight])
        .attr("style", "height: auto; font: 11pt sans-serif; ");

    function ClickCheckBox(event: Event, node: CustomHierarchyNode) {
        if (!event.isTrusted) {
            return;
        }

        //하위 children 이벤트
        const child = ChildChgCheck({
            node,
            color: getStore.color,
            type: getStore.type,
        });

        // //상위 parent 이벤트
        const parent = ParentRecursion({
            node,
            color: getStore.color,
            type: getStore.type,
        });

        child.forEach((v, k) => checkednodes.set(k, v));
        parent.forEach((v, k) => checkednodes.set(k, v));

        setCheckedNodes(checkednodes);

        return;
    }

    function MakeDefaultTree() {
        if (!nodes) {
            return;
        }

        const node = svg
            .append("g")
            .attr("id", "group_tree")
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

        node.append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .attr("id", (d) => `${d.data.groupCode} treecheckbox`)
            .attr("x", (d) => d.depth * nodeSize - 30)
            .attr("y", 1)
            .attr("rx", 3)
            .attr("ry", 3)
            .on("click", TreeAcodian)
            .join(
                (enter) => enter.append("rect"),
                (update) => update,
                (exit) => exit.remove()
            )
            .style("fill", "#505050")
            .style("stroke", "#505050")
            .style("stroke-width", 1.5)
            .style("fill-opacity", 0)
            .style("cursor", "pointer")
            .style("display", (d) => `${d.isOpen ? "block" : "none"}`);

        //프리 오픈 여부 checkbos
        node.append("path")
            .attr("id", (d) => `${d.data.groupCode} treecheckboxmark`)
            .on("click", TreeAcodian)
            .attr(
                "d",
                (d) =>
                    `${
                        d.isChildOpen && d.height
                            ? `M${d.depth * nodeSize - 27} 8.5 H${
                                  d.depth * nodeSize - 27
                              } ${d.depth * nodeSize - 18}`
                            : `M${d.depth * nodeSize - 22.5} 4 L${
                                  d.depth * nodeSize - 22.5
                              } 13
                                M${d.depth * nodeSize - 27} 8.5 H${
                                  d.depth * nodeSize - 27
                              } ${d.depth * nodeSize - 18}`
                    }
                     `
            )
            .style("fill", "#505050")
            .style("stroke", "#505050")
            .style("stroke-width", 1.5)
            .style("fill-opacity", 0)
            .style("stroke-linecap", "round")
            .style("stroke-linejoin", "round")
            .style("cursor", "pointer")
            .style("display", (d) => `${d.isOpen ? "block" : "none"}`);

        node.append("rect")
            .attr("width", 17)
            .attr("height", 17)
            .attr("id", (d) => `${d.data.groupCode} checkbox`)
            .attr("x", (d) => d.depth * nodeSize - 5)
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
            .style("fill-opacity", 0)
            .style("cursor", "pointer")
            .style("display", (d) => `${d.isOpen ? "block" : "none"}`);

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
                    `${d.depth * nodeSize - 1},${nodeSize - 26} ${
                        d.depth * nodeSize + 3
                    },${nodeSize - 22} ${d.depth * nodeSize + 8},${
                        nodeSize - 30
                    }`
            )
            .style("stroke", (d) => `${d.isChecked ? getStore.color : ""}`)
            .style("cursor", "pointer")
            .style("fill", "none")
            .style("stroke-width", 3)
            .style("stroke-linecap", "round")
            .style("display", (d) => `${d.isOpen ? "block" : "none"}`);

        node.append("text")
            .attr("dy", "0.33em")
            .attr("id", (d) => `${d.data.groupCode} groupText`)
            .attr("x", (d) => d.depth * nodeSize + 20)
            .attr("y", 10)
            .style("cursor", "pointer")
            .style("opacity", 1)
            .style("display", (d) => `${d.isOpen ? "block" : "none"}`)
            .join(
                (enter) => enter.append("text"),
                (update) => update,
                (exit) => exit.remove()
            )
            .text(
                (d) =>
                    `${d.data.groupName}/${d.data.groupCode} - ${d.isChecked} ${d.isOpen}`
            );

        node.append("title").text((d) => d.data.fullPath);
    }

    function TreeAcodian(event: Event, node: CustomHierarchyNode) {
        //첫번째 전체 선택 기능 삭제 및 전체 open close 삭제
        if (event.isTrusted && node.children) {
            node.descendants().map((child, index) => {
                if (index) {
                    HiddenGroupItem(child);
                }
            });
        }
    }

    function HiddenGroupItem(child: CustomHierarchyNode) {
        child.isOpen = !child.isOpen;
        child.isChildOpen = !child.isChildOpen;

        //svg 각 그룹
        d3.select(document.getElementById(`${child.data.groupCode} groupItem`))
            .transition()
            .duration(300)
            .style(
                "display",
                `${child.isOpen && child.parent?.isOpen ? "block" : "none"}`
            )
            .attr(
                "transform",
                `translate(0,${
                    child.isOpen
                        ? child.index * nodeSize - 5
                        : child.index * nodeSize - 15
                })`
            );

        if (child.parent) {
            d3.select(
                document.getElementById(
                    `${child.parent.data.groupCode} treecheckboxmark`
                )
            ).attr(
                "d",
                child.isChildOpen || child.height
                    ? `M${child.parent.depth * nodeSize - 27} 8.5 H${
                          child.parent.depth * nodeSize - 27
                      } ${child.parent.depth * nodeSize - 18}`
                    : `M${child.parent.depth * nodeSize - 22.5} 4 L${
                          child.parent.depth * nodeSize - 22.5
                      } 13
                                M${child.parent.depth * nodeSize - 27} 8.5 H${
                          child.parent.depth * nodeSize - 27
                      } ${child.parent.depth * nodeSize - 18}`
            );
        }

        d3.select(
            document.getElementById(`${child.data.groupCode} treecheckbox`)
        )
            .transition()
            .duration(300)
            .style(
                "display",
                `${child.isOpen && child.parent?.isOpen ? "block" : "none"}`
            );

        d3.select(
            document.getElementById(`${child.data.groupCode} treecheckboxmark`)
        )
            .transition()
            .duration(300)
            .style(
                "display",
                `${child.isOpen && child.parent?.isOpen ? "block" : "none"}`
            );

        //선택 체크박스
        d3.select(document.getElementById(`${child.data.groupCode} checkbox`))
            .transition()
            .duration(300)
            .style("fill", `${child.isChecked ? getStore.color : "black"}`)
            .style("stroke", `${child.isChecked ? getStore.color : "black"}`)
            .style("fill-opacity", 0)
            .style("opacity", `${child.isOpen && child.parent?.isOpen ? 1 : 0}`)
            .style(
                "display",
                `${child.isOpen && child.parent?.isOpen ? "" : "none"}`
            );

        //선택 체크박스 마크 상태
        d3.select(document.getElementById(`${child.data.groupCode} mark`))
            .transition()
            .duration(300)
            .attr(
                "points",
                `${child.depth * nodeSize - 1},${nodeSize - 26} ${
                    child.depth * nodeSize + 3
                },${nodeSize - 22} ${child.depth * nodeSize + 8},${
                    nodeSize - 30
                }`
            )
            .style("stroke", `${child.isChecked ? getStore.color : ""}`)
            .style("opacity", `${child.isOpen && child.parent?.isOpen ? 1 : 0}`)
            .style(
                "display",
                `${child.isOpen && child.parent?.isOpen ? "" : "none"}`
            );

        //그룹명
        d3.select(document.getElementById(`${child.data.groupCode} groupText`))
            .transition()
            .duration(300)
            .style("opacity", `${child.isOpen && child.parent?.isOpen ? 1 : 0}`)
            .style(
                "display",
                `${!child.isOpen && child.parent?.isOpen ? "none" : ""}`
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

        const checkedroot = CheckedList({
            data: getStore.data,
            type: getStore.type,
            checked: getStore.checked,
        });

        setCheckedNodes(checkedroot);

        const nodes = root.descendants() as CustomHierarchyNode[];
        setNodes(nodes);

        setNodeHeight((nodes.filter((n) => n.isOpen).length + 1) * nodeSize);
    }, [getStore]);

    React.useEffect(() => {
        MakeDefaultTree();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes]);

    return (
        <section style={{ height: "100vh", overflow: "scroll", width: 700 }}>
            <svg ref={svgRef} />
        </section>
    );
}

export default Chart;
