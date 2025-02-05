import * as d3 from "d3";
import { ITreeCheckBox } from "../Interface";
import CheckBox from "../CheckBox";
import { ChgChildIsChildChecked } from "../Child";
import CheckedWithParent from "./CheckedWithParent";
import { ConvertColor } from "../CheckBox/setColor";

export function ParentRecursion({ node, color, type }: ITreeCheckBox) {
    const changeChecked = new Map();

    //ancestors - 상향식
    d3.hierarchy(node)
        .ancestors()
        .map((p) => {
            CheckedWithParent(p);
            if (!p.parent) {
                return ChgParentIsChildChecked({
                    node: p.data,
                    color: color,
                    type: type,
                    changeChecked: changeChecked,
                });
            }
        });

    return changeChecked;
}

//재귀의 형태로 체크 진행한다.
export function ChgParentIsChildChecked({
    node,
    color,
    type,
    changeChecked,
}: ITreeCheckBox) {
    if (!node) {
        return;
    }

    if (node.children) {
        const childCheckStatus = ChgChildIsChildChecked(node);

        node.isChildrenChecked = childCheckStatus.includes(true);

        node.isChildrenAllChecked = !childCheckStatus.includes(false);

        changeChecked?.set(node.data.groupCode, {
            isChecked: node.isChecked,
            isChildrenChecked: node.isChildrenChecked,
            isChildrenAllChecked: node.isChildrenAllChecked,
        });

        new CheckBox({
            node: node,
            type: type,
            color: {
                typeColor: ConvertColor(node, color.typeColor),
                defaultColor: color.defaultColor,
            },
        }).setCheckbox();
    }

    if (node.parent) {
        ChgParentIsChildChecked({
            node: node.parent,
            color,
            type,
            changeChecked,
        });
    }

    return changeChecked;
}
