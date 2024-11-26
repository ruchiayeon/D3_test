import * as d3 from "d3";
import { CustomHierarchyNode, ITreeCheckBox } from "./Interface";
import CheckBox from "./Style";
import { ChgChildIsChildChecked } from "./Children";

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

export function CheckedWithParent(node: d3.HierarchyNode<CustomHierarchyNode>) {
    if (node.parent) {
        node.data.isChecked = node.parent.data.isChecked;
        node.data.isChildrenChecked = node.parent.data.isChecked;
        node.data.isChildrenAllChecked = node.parent.data.isChecked;
        return;
    }
}

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
