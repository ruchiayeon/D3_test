import React from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

import CheckBox from "./CheckBox";
import OpenCloseGroupItem from "./Accodian";
import { ParentRecursion } from "./Parent";
import { ChildChgCheck } from "./Child";
import CheckedData from "./CheckOptions";
import CheckedList from "./CheckedMap";
import { ConvertColor } from "./CheckBox/setColor";

//Interface
import { CustomHierarchyNode, ChartProps, IChecked } from "./Interface";

//css
import "./test.css";

function TeamChart() {
    const [nodes, setNodes] = React.useState<CustomHierarchyNode[]>([]);
    const [checkednodes, setCheckedNodes] = React.useState<
        Map<string, IChecked>
    >(new Map());
    const [nodeHeight, setNodeHeight] = React.useState<number>(0);
    const [nodewidth, setNodeWidth] = React.useState<number>(0);
    const getStore = useSelector(
        (state: { groups: ChartProps }) => state.groups
    );

    const svgRef = React.useRef<SVGSVGElement | null>(null);

    const svg = d3
        .select(svgRef.current)
        .attr("width", nodewidth)
        .attr("height", nodeHeight)
        .attr("viewBox", [0, 20, nodewidth, nodeHeight])
        .attr("style", "font: 1rem");

    function ClickCheckBox(event: Event, node: CustomHierarchyNode) {
        if (!event.isTrusted) {
            return;
        }

        if (getStore.type === "remove" && !node.isRemoved) {
            return;
        }

        if (getStore.type === "add" && node.isAdd) {
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
            .selectAll("g")
            .data(nodes)
            .join("g")
            .attr("id", (d) => `${d.data.groupCode} groupItem`)
            .attr(
                "transform",
                (d) => `translate(0,${d.index * getStore.nodeSize.height - 5})`
            );

        node.append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .attr("id", (d) => `${d.data.groupCode} treecheckbox`)
            .attr("x", (d) => d.depth * getStore.nodeSize.height - 30)
            .attr("y", 1)
            .attr("rx", 3)
            .attr("ry", 3)
            .on("click", TreeAcodian)
            .join("rect")
            .style("stroke", "#505050")
            .style("stroke-width", 1.5)
            .style("fill-opacity", 0)
            .style("cursor", "pointer")
            .style("display", (d) => `${d.isOpen ? "block" : "none"}`);

        //프리 오픈 여부 checkbos
        node.append("path")
            .attr("id", (d) => `${d.data.groupCode} treecheckboxmark`)
            .on("click", TreeAcodian)
            .join("path")
            .attr(
                "d",
                (d) =>
                    `${
                        d.isChildOpen || !d.children
                            ? `M${
                                  d.depth * getStore.nodeSize.height - 27
                              } 8.5 H${
                                  d.depth * getStore.nodeSize.height - 27
                              } ${d.depth * getStore.nodeSize.height - 18}`
                            : `M${
                                  d.depth * getStore.nodeSize.height - 22.5
                              } 4 L${
                                  d.depth * getStore.nodeSize.height - 22.5
                              } 13
                                M${
                                    d.depth * getStore.nodeSize.height - 27
                                } 8.5 H${
                                  d.depth * getStore.nodeSize.height - 27
                              } ${d.depth * getStore.nodeSize.height - 18}`
                    }
                     `
            )
            .style("stroke", "#505050")
            .style("stroke-width", 1.5)
            .style("stroke-linecap", "round")
            .style("stroke-linejoin", "round")
            .style("cursor", "pointer")
            .style("display", (d) => `${d.isOpen ? "block" : "none"}`);

        node.append("rect")
            .attr("id", (d) => `${d.data.groupCode} checkbox`)
            .attr("x", (d) => d.depth * getStore.nodeSize.height - 5)
            .attr("width", 17)
            .attr("height", 17)
            .attr("rx", 3)
            .attr("ry", 3)
            .on("click", ClickCheckBox)
            .style("fill-opacity", 0)
            .style("cursor", "pointer")
            .style("display", (d) => (d.isOpen ? "block" : "none"))
            .join("rect");

        node.append("polyline")
            .attr("id", (d) => `${d.data.groupCode} mark`)
            .attr("width", 17)
            .attr("height", 17)
            .style("cursor", "pointer")
            .style("stroke-width", 3)
            .style("stroke-linecap", "round")
            .style("fill-opacity", 0)
            .style("display", (d) => (d.isOpen ? "block" : "none"))
            .on("click", ClickCheckBox)
            .join("polyline");

        node.append("text")
            .attr("dy", "0.33em")
            .attr("id", (d) => `${d.data.groupCode} groupText`)
            .attr("x", (d) => d.depth * getStore.nodeSize.height + 20)
            .attr("y", 10)
            .style("cursor", "pointer")
            .style("display", (d) => (d.isOpen ? "block" : "none"))
            .style("fill", "black")
            .join("text");

        node.append("title").text((d) => d.data.fullPath);
    }

    function TreeAcodian(event: Event, node: CustomHierarchyNode) {
        if (!event.isTrusted || !node.children) return;

        if (node.isChildOpen) {
            node.isChildOpen = false;
            node.descendants().map((n, i) => {
                if (i > 0) {
                    n.isOpen = false;
                    n.isChildOpen = false;
                    OpenCloseGroupItem(n, getStore);
                }
            });

            CheckTranslate();

            return TreeAcodianTranslate();
        }

        //첫번째 전체 선택 기능 삭제 및 전체 open close 삭제
        if (!node.isChildOpen) {
            node.isChildOpen = true;
            node.children.map((child) => {
                child.isOpen = !child.isOpen;
                OpenCloseGroupItem(child, getStore);
            });

            CheckTranslate();

            return TreeAcodianTranslate();
        }
    }

    function TreeAcodianTranslate() {
        const nodesOpen = nodes.filter((n) => n.isOpen);

        setNodeHeight(
            (nodes.filter((n) => n.isOpen).length + 2) *
                getStore.nodeSize.height
        );
        setNodeWidth(
            200 +
                nodes.filter((n) => n.isOpen)[nodesOpen.length - 1].depth *
                    getStore.nodeSize.width
        );

        return;
    }

    function CheckTranslate() {
        let i: number = 0;
        const depth: number = 1;

        nodes
            .filter((nv) => nv.isOpen && nv.depth === depth)
            .map((v) =>
                v.eachBefore((cv) => {
                    if (!cv.isOpen) return;
                    i++;

                    d3.select(
                        document.getElementById(
                            `${cv.data.groupCode} groupItem`
                        )
                    )
                        .transition()
                        .duration(getStore.duration)
                        .attr(
                            "transform",
                            `translate(0,${i * getStore.nodeSize.height - 5})`
                        );

                    d3.select(
                        document.getElementById(
                            `${cv.data.groupCode} groupText`
                        )
                    )
                        .transition()
                        .duration(getStore.duration)
                        .style("opacity", 1)
                        .style(
                            "fill",
                            cv.isOpen && cv.isChecked
                                ? getStore.color.typeColor
                                : getStore.color.defaultColor
                        )

                        .text(cv.data.groupName);
                })
            );
    }

    React.useEffect(() => {
        if (!getStore.data) {
            return;
        }

        const dataJson = JSON.parse(getStore.data);

        if (!dataJson.groupCode) {
            return;
        }

        const root = CheckedData.createEventFunction(getStore.type, {
            checked: getStore.checked,
            type: getStore.type,
            data: dataJson,
            defaultView: 1,
        });

        const checkedroot = CheckedList({
            data: dataJson,
            type: getStore.type,
            checked: getStore.checked,
        });

        if (!root) return;

        setCheckedNodes(checkedroot);

        const nodes = root.descendants() as CustomHierarchyNode[];

        setNodes(nodes);

        const nodesOpen = nodes.filter((n) => n.isOpen);

        setNodeHeight((nodesOpen.length + 1) * getStore.nodeSize.height);
        setNodeWidth(
            200 +
                nodes.filter((n) => n.isOpen)[nodesOpen.length - 1].depth *
                    getStore.nodeSize.width
        );
    }, [getStore]);

    React.useEffect(() => {
        MakeDefaultTree();
        nodes.map((n) => {
            if (!n.children) {
                return new CheckBox({
                    node: n,
                    color: {
                        typeColor: ConvertColor(n, getStore.color.typeColor),
                        defaultColor: getStore.color.defaultColor,
                    },
                    type: getStore.type,
                }).setCheckbox();
            }

            const childCheckStatus = n.children.map((c) => c.isChecked);

            n.isChildrenChecked = childCheckStatus.includes(true);

            n.isChildrenAllChecked = !childCheckStatus.includes(false);

            return new CheckBox({
                node: n,
                color: {
                    typeColor: ConvertColor(n, getStore.color.typeColor),
                    defaultColor: getStore.color.defaultColor,
                },
                type: getStore.type,
            }).setCheckbox();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes]);

    return (
        <section style={{ height: "80vh", overflow: "scroll", width: 350 }}>
            <svg ref={svgRef} />
        </section>
    );
}

export default TeamChart;
