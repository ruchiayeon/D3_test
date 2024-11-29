import * as d3 from "d3";
import { CustomHierarchyNode, ITreeCheckBox } from "../Interface";

//class 형태도 사용 가능함
export default class CheckBox implements ITreeCheckBox {
    node: CustomHierarchyNode;
    color: string;
    type: "normal" | "remove" | "add";
    nodeSize: number;

    constructor({ node, color, type }: ITreeCheckBox) {
        this.node = node;
        this.color = color;
        this.nodeSize = 35;
        this.type = type;
    }

    setCheckbox() {
        return this.text().box().marker();
    }

    text() {
        new CheckedText({
            node: this.node,
            color: this.color,
            type: this.type,
        }).text();

        return this;
    }

    box() {
        new CheckBoxColor({
            node: this.node,
            color: this.color,
            type: this.type,
        }).box();

        return this;
    }

    marker() {
        if (this.type === "remove") {
            return new CheckBoxMarkRemove({
                node: this.node,
                color: this.color,
                type: this.type,
            }).marker();
        }

        return new CheckBoxMarkNormal({
            node: this.node,
            color: this.color,
            type: this.type,
        }).marker();
    }
}

class CheckedText extends CheckBox {
    text() {
        //text css 변경
        d3.select(
            document.getElementById(`${this.node.data.groupCode} groupText`)
        )
            .text(
                () =>
                    `${this.node.data.groupName} - ${this.node.isChecked} / ${this.node.isChildrenChecked}/ ${this.node.isChildrenAllChecked}/ ${this.node.isRemoved}/ ${this.node.isDisabled} `
            )
            .style("fill", `${this.node.isChecked ? this.color : "black"}`)
            .style("font-weight", `${this.node.isChecked ? "bold" : 400}`);

        return this;
    }
}

class CheckBoxColor extends CheckBox {
    box() {
        //체크박스 css 변경
        d3.select(
            document.getElementById(`${this.node.data.groupCode} checkbox`)
        )
            .style("fill", `${this.color}`)
            .style("stroke", `${this.color}`)
            .style("fill-opacity", `${this.node.isChecked ? 1 : 0}`);

        return this;
    }
}

//Check box mark 설정
class CheckBoxMarkNormal extends CheckBox {
    marker() {
        //하위 전체 체크 O & 본인도 체크 O
        if (this.node.isChecked && this.node.isChildrenAllChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr(
                    "points",
                    `${this.node.depth * this.nodeSize + 8},${
                        this.nodeSize - 26
                    } ${this.node.depth * this.nodeSize + 13},${
                        this.nodeSize - 22
                    } ${this.node.depth * this.nodeSize + 19},${
                        this.nodeSize - 30
                    }`
                )
                .attr(
                    "style",
                    "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
                );
        }

        //하위 전체 체크 X & 본인 체크 O
        if (this.node.isChecked && !this.node.isChildrenAllChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr(
                    "points",
                    `${this.node.depth * this.nodeSize + 8},${
                        this.nodeSize - 26
                    } ${this.node.depth * this.nodeSize + 19},${
                        this.nodeSize - 26
                    }`
                )
                .attr(
                    "style",
                    "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
                );
        }

        //하위 전체 체크 O & 본인 체크 X
        if (!this.node.isChecked && this.node.isChildrenChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr(
                    "points",
                    `${this.node.depth * this.nodeSize + 8},${
                        this.nodeSize - 26
                    } ${this.node.depth * this.nodeSize + 19},${
                        this.nodeSize - 26
                    }`
                )
                .attr(
                    "style",
                    "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
                );
        }

        //하위 전체 체크 X & 본인 체크 X
        if (!this.node.isChecked && !this.node.isChildrenChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr("points", 0)
                .attr(
                    "style",
                    "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
                );
        }
    }
}

class CheckBoxMarkRemove extends CheckBox {
    marker() {
        //하위 전체 체크 O & 본인도 체크 O
        if (this.node.isChecked && this.node.isChildrenAllChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr(
                    "points",
                    `${this.node.depth * this.nodeSize + 8},${
                        this.nodeSize - 26
                    } ${this.node.depth * this.nodeSize + 13},${
                        this.nodeSize - 22
                    } ${this.node.depth * this.nodeSize + 19},${
                        this.nodeSize - 30
                    }`
                )
                .attr(
                    "style",
                    "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
                );
        }

        //하위 전체 체크 X & 본인 체크 O
        if (this.node.isChecked && !this.node.isChildrenAllChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr(
                    "points",
                    `${this.node.depth * this.nodeSize + 8},${
                        this.nodeSize - 26
                    } ${this.node.depth * this.nodeSize + 19},${
                        this.nodeSize - 26
                    }`
                )
                .attr(
                    "style",
                    "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
                );
        }

        //본인 체크 X
        if (!this.node.isChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr(
                    "points",
                    `${this.node.depth * this.nodeSize + 8},${
                        this.nodeSize - 26
                    } ${this.node.depth * this.nodeSize + 19},${
                        this.nodeSize - 26
                    }`
                )
                .attr(
                    "style",
                    "cursor: pointer; fill:none;stroke:white;stroke-width:3; stroke-linecap: round;"
                );
        }
    }
}
