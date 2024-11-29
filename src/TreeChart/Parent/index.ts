import * as d3 from "d3";
import { ITreeCheckBox } from "../Interface";
import CheckBox from "../CheckBox";
import { ChgChildIsChildChecked } from "../Child";
import CheckedWithParent from "./CheckedWithParent";

export function ParentRecursion({ node, color, type }: ITreeCheckBox) {
    //ancestors - 상향식
    return d3
        .hierarchy(node)
        .ancestors()
        .map((p) => {
            CheckedWithParent(p);
            if (!p.parent) {
                return ChgParentIsChildChecked({
                    node: p.data,
                    color: color,
                    type: type,
                });
            }
        });
}

//재귀의 형태로 체크 진행한다.
function ChgParentIsChildChecked({ node, color, type }: ITreeCheckBox) {
    if (!node) {
        return;
    }

    if (node.children) {
        const childCheckStatus = ChgChildIsChildChecked(node);

        node.isChildrenChecked = childCheckStatus.includes(true);

        node.isChildrenAllChecked = !childCheckStatus.includes(false);

        new CheckBox({
            node: node,
            type: type,
            color: node.isChildrenChecked
                ? node.isChecked
                    ? color
                    : "#939292"
                : node.isChecked
                ? color
                : "black",
        }).setCheckbox();
    }

    if (node.parent) {
        ChgParentIsChildChecked({ node: node.parent, color, type });
    }

    return;
}
