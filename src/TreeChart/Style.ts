import * as d3 from "d3";
import { CustomHierarchyNode } from "./Interface";

export function ChgCheckBoxStyle({
    node,
    controlPoint,
}: {
    node: CustomHierarchyNode;
    controlPoint: string;
}) {
    //체크박스 css 변경
    d3.select(document.getElementById(`${node.data.groupCode} checkbox`))
        .style("fill", `${controlPoint}`)
        .style("stroke", `${controlPoint}`)
        .style("fill-opacity", `${controlPoint === "black" ? 0 : 1}`);

    //text css 변경
    d3.select(document.getElementById(`${node.data.groupCode} groupText`))
        .text(
            () =>
                `${node.data.groupName} - ${node.isChecked} / ${node.isChildrenChecked}/ ${node.isChildrenAllChecked} `
        )
        .style("fill", `${controlPoint}`);

    CheckBoxMark(node);
}

function CheckBoxMark(node: CustomHierarchyNode) {
    const nodeSize = 35;

    if (node.isChecked && node.isChildrenAllChecked) {
        return d3
            .select(document.getElementById(`${node.data.groupCode} mark`))
            .attr(
                "points",
                `${node.depth * nodeSize + 8},${nodeSize - 28} ${
                    node.depth * nodeSize + 13
                },${nodeSize - 22}`
            )
            .attr(
                "style",
                "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
            );
    }

    if (node.isChecked && !node.isChildrenAllChecked) {
        return d3
            .select(document.getElementById(`${node.data.groupCode} mark`))
            .attr("points", 0)
            .attr(
                "style",
                "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
            );
    }

    if (!node.isChecked && node.isChildrenChecked) {
        return d3
            .select(document.getElementById(`${node.data.groupCode} mark`))
            .attr("points", 0)
            .attr(
                "style",
                "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
            );
    }

    if (!node.isChecked) {
        return d3
            .select(document.getElementById(`${node.data.groupCode} mark`))
            .attr("points", 0)
            .attr(
                "style",
                "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
            );
    }

    if (node.isRemoved) {
        return;
    }
}
