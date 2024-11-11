import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./test.css";

interface DataNode {
    groupCode: string;
    groupName: string;
    depth: number;
    fullPath: string;
    fullPathCode: string;
    children?: DataNode[];
}

interface CustomHierarchyNode extends d3.HierarchyNode<DataNode> {
    index: number;
    isChecked: boolean;
    isChildrenChecked: boolean;
    isRemoved: boolean;
    isDisabled: boolean;
    isOpen: boolean;
}

interface ChartProps {
    data: DataNode;
}

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
            return ChildChgCheck(node);
        }
    }

    function CheckedWithParent(node: d3.HierarchyNode<CustomHierarchyNode>) {
        if (node.parent) {
            node.data.isChecked = node.parent.data.isChecked;
            node.data.isChildrenChecked = node.parent.data.isChecked;

            return;
        }
        node.data.isChildrenChecked = !node.data.isChecked;
        return (node.data.isChecked = !node.data.isChecked);
    }

    function IsChildAllChecked(node: CustomHierarchyNode) {
        // const childChecked: boolean[] = [];
        ParentRecursion(node);
    }

    function ParentRecursion(node: CustomHierarchyNode) {
        d3.hierarchy(node)
            .ancestors()
            .map((p) => {
                if (p.parent === null) {
                    return ChgParentIsChildChecked(p.data);
                }
            });
    }

    function ChgParentIsChildChecked(parent: CustomHierarchyNode | null) {
        console.log(parent);
        if (parent) {
            return ChgParentIsChildChecked(parent.parent);
        }
    }

    //하위 체크
    function ChildChgCheck(node: CustomHierarchyNode) {
        IsChildAllChecked(node);
        d3.hierarchy(node)
            .descendants()
            .map((n) => {
                CheckedWithParent(n);

                //체크박스 css 변경
                d3.select(
                    document.getElementById(`${n.data.data.groupCode} checkbox`)
                )
                    .style("fill", `${n.data.isChecked ? "red" : "white"}`)
                    .style("stroke", `${n.data.isChecked ? "red" : "black"}`)
                    .style("fill-opacity", `${n.data.isChecked ? "1" : "0"}`);

                //text css 변경
                d3.select(
                    document.getElementById(
                        `${n.data.data.groupCode} groupText`
                    )
                )
                    .text(
                        () =>
                            `${n.data.data.groupName} - ${n.data.isChecked} / ${n.data.isChildrenChecked}`
                    )
                    .style("fill", `${n.data.isChecked ? "red" : "black"}`);
            });

        return;
        //1. 하위 체크 / 논체크
        //2. 하위
    }

    useEffect(() => {
        if (!roots) {
            return;
        }

        const nodeSize = 30;
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
            .attr("transform", (d) => `translate(0,${d.index * nodeSize})`);

        node.append("rect")
            .attr("width", 17)
            .attr("height", 17)
            .attr("id", (d) => `${d.data.groupCode} checkbox`)
            .attr("x", (d) => d.depth * nodeSize + 7)
            .attr("y", -9)
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

        node.append("text")
            .attr("dy", "0.32em")
            .attr("id", (d) => `${d.data.groupCode} groupText`)
            .attr("x", (d) => d.depth * nodeSize + 30)
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
        <section style={{ height: "100vh", overflow: "scroll", width: 500 }}>
            <svg ref={svgRef} />
        </section>
    );
}

export default Chart;
