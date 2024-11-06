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
            .join("path", (update) => update.attr("class", "update"))
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
            .join("g", (update) => update.attr("class", "update"))
            .attr("transform", (d) => `translate(0,${d.index * nodeSize})`);

        node.append("rect")
            .attr("width", 17)
            .attr("height", 17)
            .attr("x", (d) => d.depth * nodeSize + 7)
            .attr("y", -9)
            .attr("rx", 3)
            .attr("ry", 3)
            .on("click", (event, d) => {
                d3.select(event.currentTarget).style(
                    "stroke",
                    `${d.isChecked ? "black" : "red"}`
                );

                d.isChecked = !d.isChecked;
            })
            .attr(
                "style",
                "cursor: pointer; fill-opacity: 0; stroke-width: 1.5 ; stroke: black;"
            );

        node.append("text")
            .attr("dy", "0.32em")
            .attr("id", (d) => d.data.groupCode)
            .attr("x", (d) => d.depth * nodeSize + 30)
            .attr("style", `cursor: pointer; opacity:1;`)
            .on("click", (event) =>
                d3.select(event.currentTarget).style("fill", "red")
            )
            .text((d) => d.data.groupName)
            .join("text", (update) => update.attr("class", "update"));

        node.append("title").text((d) => d.data.fullPath);
    }, [roots, nodes]);

    return (
        <section style={{ height: "100vh", overflow: "scroll", width: 500 }}>
            <svg ref={svgRef} />
        </section>
    );
}

export default Chart;
