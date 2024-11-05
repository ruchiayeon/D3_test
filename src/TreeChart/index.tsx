import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataNode {
    groupName: string;
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

// interface Column {
//     format?: (value: number, d: CustomHierarchyNode) => string;
// }

interface ChartProps {
    data: DataNode;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
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

        // const format = d3.format(","); // 천 단위로 포맷팅
        const nodeSize = 25;
        const width = 928;
        const height = (nodes.length + 1) * nodeSize;

        // const columns: Column[] = [
        //     {
        //         format,
        //     },
        //     {
        //         format: (value, d) => (d.children ? format(value) : "-"),
        //     },
        // ];

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-5, -nodeSize, width, height])
            .attr("style", "height: auto; font: 11pt sans-serif; ");

        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#999")
            .selectAll("path")
            .data(roots.links())
            .join("path")
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
            .join("g")
            .attr("transform", (d) => `translate(0,${d.index * nodeSize})`);

        // function mouseDown() {
        //     console.log("mouseDown");
        // }

        function mouseUp() {
            console.log("mouseUp");
        }

        function mouseClick() {
            console.log("mouseClick");
        }

        node.append("circle")
            .attr("cx", (d) => d.depth * nodeSize)
            .attr("r", 3)
            .attr("fill", (d) => (d.children ? null : "red"));

        node.append("text")
            .attr("dy", "0.32em")
            .attr("x", (d) => d.depth * nodeSize + 6)
            .attr("style", "cursor: pointer;")
            .on("mousedown", (d) => {
                console.log(d.data.groupName);
            })
            .on("mouseup", mouseUp)
            .on("click", mouseClick)
            .text((d) => d.data.groupName);

        node.append("title").text((d) =>
            d
                .ancestors()
                .reverse()
                .map((d) => d.data.groupName)
                .join("/")
        );

        // for (const { format } of columns) {
        //     // svg.append("text")
        //     //     .attr("dy", "0.32em")
        //     //     .attr("y", -nodeSize)
        //     //     .attr("text-anchor", "end")
        //     //     .attr("font-weight", "bold");
        //     // node.append("text")
        //     //     .attr("dy", "0.32em")
        //     //     .attr("text-anchor", "end")
        //     //     .attr("fill", (d) => (d.children ? null : "#555"))
        //     //     .data(roots.copy().descendants() as CustomHierarchyNode[])
        //     //     .text((d) => (format ? format(d.value || 0, d) : ""));
        // }
    }, [roots, nodes]);

    return (
        <section style={{ height: "100vh", overflow: "scroll", width: 500 }}>
            <svg ref={svgRef} />
        </section>
    );
};

export default Chart;

// import React from "react";
// import * as d3 from "d3";

// interface IData {
//     name: string;
//     value: number;
//     children?: IData[];
// }

// interface CustomHierarchyNode extends d3.HierarchyNode<IData> {
//     index: number;
// }

// function TreeChart({ data }: { data: IData }) {
//     const treeRef = React.useRef<SVGSVGElement | null>(null);

//     React.useEffect(() => {
//         Test(data);
//     }, [data]);

//     function Test(data: IData) {
//         const format = d3.format(",");
//         const svg = d3.select(treeRef.current);
//         const nodeSize = 20;
//         const root = d3.hierarchy(data).eachBefore((dataNode, index) => {
//             return (index = index++);
//         });
//         const nodes = root.descendants();
//         const width = 928;
//         const height = (nodes.length + 1) * nodeSize;

//         console.log(root);
//         console.log(nodes);

//         const columns = [
//             {
//                 label: "Size",
//                 value: (d: IData) => d.value,
//                 format,
//                 x: 280,
//             },
//             {
//                 label: "Count",
//                 value: (d: IData) => (d.children ? 0 : 1),
//                 format: (value: number, d: IData) =>
//                     d.children ? format(value) : "-",
//                 x: 340,
//             },
//         ];

//         svg.attr("width", width)
//             .attr("height", height)
//             .attr("viewBox", [
//                 -nodeSize / 2,
//                 (-nodeSize * 3) / 2,
//                 width,
//                 height,
//             ])
//             .attr(
//                 "style",
//                 "max-width: 100%; height: auto; font: 9pt sans-serif; overflow: visible;"
//             );

//         svg.append("g")
//             .attr("fill", "none")
//             .attr("stroke", "#999")
//             .selectAll()
//             .data(root.links())
//             .join("path")
//             .attr(
//                 "d",
//                 (d, index) => `
//                   M${d.source.depth * nodeSize},${index * nodeSize}
//                   V${(index + 1) * nodeSize}
//                   h${nodeSize}
//                 `
//             );

//         const node = svg
//             .append("g")
//             .selectAll()
//             .data(nodes)
//             .join("g")
//             .attr(
//                 "transform",
//                 (d, index) => `translate(0,${index * nodeSize})`
//             );

//         node.append("circle")
//             .attr("cx", (d) => d.depth * nodeSize)
//             .attr("r", 2.5)
//             .attr("fill", (d) => (d.children ? null : "#999"));

//         node.append("text")
//             .attr("dy", "0.32em")
//             .attr("x", (d) => d.depth * nodeSize + 6)
//             .text((d) => d.data.name);

//         node.append("title").text((d) =>
//             d
//                 .ancestors()
//                 .reverse()
//                 .map((d) => d.data.name)
//                 .join("/")
//         );

//         for (const { label, value, format, x } of columns) {
//             svg.append("text")
//                 .attr("dy", "0.32em")
//                 .attr("y", -nodeSize)
//                 .attr("x", x)
//                 .attr("text-anchor", "end")
//                 .attr("font-weight", "bold")
//                 .text(label);

//             node.append("text")
//                 .attr("dy", "0.32em")
//                 .attr("x", x)
//                 .attr("text-anchor", "end")
//                 .attr("fill", (d) => (d.children ? null : "#555"))
//                 .data(
//                     root
//                         .copy()
//                         .sum(value)
//                         .descendants() as CustomHierarchyNode[]
//                 )
//                 .text((d) => (format ? format(d.value || 0, d.data) : ""));
//         }
//     }

//     // function Test(data: IData) {
//     //     const format = d3.format(",");
//     //     const nodeSize = 17;
//     //     const root = d3.hierarchy(data).eachBefore(
//     //         (
//     //             (i) => (d) =>
//     //                 (d.index = i++)
//     //         )(0)
//     //     );
//     //     const nodes = root.descendants();
//     //     const width = 928;
//     //     const height = (nodes.length + 1) * nodeSize;

//     //     const columns = [
//     //         {
//     //             label: "Size",
//     //             value: (d) => d.value,
//     //             format,
//     //             x: 280,
//     //         },
//     //         {
//     //             label: "Count",
//     //             value: (d) => (d.children ? 0 : 1),
//     //             format: (value, d) => (d.children ? format(value) : "-"),
//     //             x: 340,
//     //         },
//     //     ];

//     //     const svg = d3
//     //         .create("svg")
//     //         .attr("width", width)
//     //         .attr("height", height)
//     //         .attr("viewBox", [
//     //             -nodeSize / 2,
//     //             (-nodeSize * 3) / 2,
//     //             width,
//     //             height,
//     //         ])
//     //         .attr(
//     //             "style",
//     //             "max-width: 100%; height: auto; font: 10px sans-serif; overflow: visible;"
//     //         );

//     //     const link = svg
//     //         .append("g")
//     //         .attr("fill", "none")
//     //         .attr("stroke", "#999")
//     //         .selectAll()
//     //         .data(root.links())
//     //         .join("path")
//     //         .attr(
//     //             "d",
//     //             (d) => `
//     //           M${d.source.depth * nodeSize},${d.source.index * nodeSize}
//     //           V${d.target.index * nodeSize}
//     //           h${nodeSize}
//     //         `
//     //         );

//     //     const node = svg
//     //         .append("g")
//     //         .selectAll()
//     //         .data(nodes)
//     //         .join("g")
//     //         .attr("transform", (d) => `translate(0,${d.index * nodeSize})`);

//     //     node.append("circle")
//     //         .attr("cx", (d) => d.depth * nodeSize)
//     //         .attr("r", 2.5)
//     //         .attr("fill", (d) => (d.children ? null : "#999"));

//     //     node.append("text")
//     //         .attr("dy", "0.32em")
//     //         .attr("x", (d) => d.depth * nodeSize + 6)
//     //         .text((d) => d.data.name);

//     //     node.append("title").text((d) =>
//     //         d
//     //             .ancestors()
//     //             .reverse()
//     //             .map((d) => d.data.name)
//     //             .join("/")
//     //     );

//     //     for (const { label, value, format, x } of columns) {
//     //         svg.append("text")
//     //             .attr("dy", "0.32em")
//     //             .attr("y", -nodeSize)
//     //             .attr("x", x)
//     //             .attr("text-anchor", "end")
//     //             .attr("font-weight", "bold")
//     //             .text(label);

//     //         node.append("text")
//     //             .attr("dy", "0.32em")
//     //             .attr("x", x)
//     //             .attr("text-anchor", "end")
//     //             .attr("fill", (d) => (d.children ? null : "#555"))
//     //             .data(root.copy().sum(value).descendants())
//     //             .text((d) => format(d.value, d));
//     //     }
//     // }

//     return <svg ref={treeRef} />;
// }

// export default TreeChart;
