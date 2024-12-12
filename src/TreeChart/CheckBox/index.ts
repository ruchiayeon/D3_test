import * as d3 from "d3";
import { CustomHierarchyNode, ITreeCheckBox } from "../Interface";

//class 형태도 사용 가능함
export default class CheckBox implements ITreeCheckBox {
    node: CustomHierarchyNode;
    color: string;
    type: "normal" | "remove" | "add";
    nodeSize: number;
    duration: number;

    constructor({ node, color, type }: ITreeCheckBox) {
        this.node = node;
        this.color = color;
        this.nodeSize = 35;
        this.type = type;
        this.duration = 300;
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
        return new CheckBoxMark({
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
            .transition()
            .duration(this.duration)
            .text(() => this.node.data.groupName)
            .style("fill", this.node.isChecked ? this.color : "black")
            .style("font-weight", this.node.isChecked ? 600 : 400)
            .style("opacity", this.node.isOpen ? 1 : 0)
            .style("display", this.node.isOpen ? "block" : "none");

        return this;
    }
}

class CheckBoxColor extends CheckBox {
    box() {
        //체크박스 css 변경
        d3.select(
            document.getElementById(`${this.node.data.groupCode} checkbox`)
        )
            .transition()
            .duration(this.duration)
            .style("fill", this.node.isChecked ? this.color : "black")
            .style("stroke", this.node.isChecked ? this.color : "black")
            .style("display", this.node.isOpen ? "block" : "none");

        return this;
    }
}

//Check box mark 설정
class CheckBoxMark extends CheckBox {
    marker() {
        //하위 그룹없음 && 본인체크 X
        if (!this.node.children && !this.node.isChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr("points", "0,0 0,0")
                .style("display", "none");
        }

        //하위 전체 체크 O & 본인도 체크 O
        if (this.node.isChecked && this.node.isChildrenAllChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr(
                    "points",
                    `${this.node.depth * this.nodeSize - 1},${
                        this.nodeSize - 26
                    } ${this.node.depth * this.nodeSize + 3},${
                        this.nodeSize - 22
                    } ${this.node.depth * this.nodeSize + 8},${
                        this.nodeSize - 30
                    }`
                )
                .style(
                    "stroke",
                    this.node.isOpen && this.node.isChecked
                        ? this.color
                        : "white"
                )
                .style("display", this.node.isOpen ? "block" : "none");
        }

        //하위 전체 체크 X & 본인 체크 O
        if (this.node.isChecked && !this.node.isChildrenAllChecked) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr(
                    "points",
                    `${this.node.depth * this.nodeSize - 1},${
                        this.nodeSize - 26
                    } ${this.node.depth * this.nodeSize + 8},${
                        this.nodeSize - 26
                    }`
                )
                .style(
                    "stroke",
                    this.node.isOpen && this.node.isChecked
                        ? this.color
                        : "white"
                )
                .style("display", this.node.isOpen ? "block" : "none");
        }

        //하위 체크 O & 본인 체크 X
        if (
            !this.node.isChecked &&
            (this.node.isChildrenAllChecked || this.node.isChildrenChecked)
        ) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr(
                    "points",
                    `${this.node.depth * this.nodeSize - 1},${
                        this.nodeSize - 26
                    } ${this.node.depth * this.nodeSize + 8},${
                        this.nodeSize - 26
                    }`
                )
                .style("stroke", this.node.isOpen ? this.color : "white")
                .style("display", this.node.isOpen ? "block" : "none");
        }

        //하위 전체 체크 X & 본인 체크 X
        if (
            !this.node.isChecked &&
            !(this.node.isChildrenAllChecked || this.node.isChildrenChecked)
        ) {
            return d3
                .select(
                    document.getElementById(`${this.node.data.groupCode} mark`)
                )
                .attr("points", "0,0 0,0")
                .style("display", "none");
        }
    }
}
