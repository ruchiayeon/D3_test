import * as d3 from "d3";
import { CustomHierarchyNode, ITreeCheckBox } from "../Interface";

export class SetCheckBox {
    node: CustomHierarchyNode;
    color: { defaultColor: string; typeColor: string };
    type: "default" | "remove" | "add";
    nodeSize: number;
    duration: number;

    constructor({ node, color, type }: ITreeCheckBox) {
        this.node = node;
        this.color = color;
        this.nodeSize = 35;
        this.type = type;
        this.duration = 100;
    }

    box() {}
    text() {}
    marker() {}

    // 필요한 메서드들을 여기에 추가하세요
}

class CheckedDefaultText extends SetCheckBox {
    text() {
        //text css 변경
        d3.select(
            document.getElementById(`${this.node.data.groupCode} groupText`)
        )
            .transition()
            .duration(this.duration)
            .text(this.node.data.groupName)
            .style(
                "fill",
                this.node.isChecked
                    ? this.color.typeColor
                    : this.color.defaultColor
            )
            .style("font-weight", 400)
            .style("opacity", this.node.isOpen ? 1 : 0)
            .style("display", this.node.isOpen ? "block" : "none");

        return this;
    }
}

class CheckedRemovedText extends SetCheckBox {
    text() {
        //text css 변경
        d3.select(
            document.getElementById(`${this.node.data.groupCode} groupText`)
        )
            .transition()
            .duration(this.duration)
            .text(this.node.data.groupName)
            .style(
                "fill",
                this.node.isRemoved
                    ? this.node.isChecked
                        ? this.color.typeColor
                        : "red"
                    : this.color.defaultColor
            )
            .style("font-weight", 400)
            .style("opacity", this.node.isOpen ? 1 : 0)
            .style("display", this.node.isOpen ? "block" : "none");

        return this;
    }
}

class CheckDefaultBoxColor extends SetCheckBox {
    box() {
        //체크박스 css 변경
        d3.select(
            document.getElementById(`${this.node.data.groupCode} checkbox`)
        )
            .transition()
            .duration(this.duration)
            .style(
                "fill",
                this.node.isChecked
                    ? this.color.typeColor
                    : this.color.defaultColor
            )
            .style(
                "stroke",
                this.node.isChecked
                    ? this.color.typeColor
                    : this.color.defaultColor
            )
            .style("display", this.node.isOpen ? "block" : "none");

        return this;
    }
}

class CheckRemoveBoxColor extends SetCheckBox {
    box() {
        d3.select(
            document.getElementById(`${this.node.data.groupCode} checkbox`)
        )
            .transition()
            .duration(this.duration)
            .style(
                "fill",
                this.node.isRemoved
                    ? this.node.isChecked
                        ? this.color.typeColor
                        : "red"
                    : this.color.defaultColor
            )
            .style(
                "stroke",
                this.node.isRemoved
                    ? this.node.isChecked
                        ? this.color.typeColor
                        : "red"
                    : this.color.defaultColor
            )
            .style("display", this.node.isOpen ? "block" : "none");

        return this;
    }
}

//Check box mark 설정
class CheckDefaultBoxMark extends SetCheckBox {
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
                        ? this.color.typeColor
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
                        ? this.color.typeColor
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
                .style(
                    "stroke",
                    this.node.isOpen ? this.color.typeColor : "white"
                )
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

class CheckRemoveBoxMark extends SetCheckBox {
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
                        ? this.color.typeColor
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
                        ? this.color.typeColor
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
                .style(
                    "stroke",
                    this.node.isOpen ? this.color.typeColor : "white"
                )
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

export {
    CheckedDefaultText,
    CheckedRemovedText,
    CheckDefaultBoxColor,
    CheckRemoveBoxColor,
    CheckDefaultBoxMark,
    CheckRemoveBoxMark,
};
