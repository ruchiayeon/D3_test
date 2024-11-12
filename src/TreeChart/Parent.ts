import * as d3 from "d3";
import { CustomHierarchyNode } from "./Interface";
import { ChgCheckBoxStyle } from "./Style";
import { ChgChildIsChildChecked } from "./Children";

export function ParentRecursion(node: CustomHierarchyNode) {
    return d3
        .hierarchy(node)
        .ancestors()
        .map((p) => {
            CheckedWithParent(p);
            if (p.parent === null) {
                return ChgParentIsChildChecked(p.data);
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

export function ChgParentIsChildChecked(parent: CustomHierarchyNode | null) {
    if (parent) {
        if (parent.children) {
            console.log("test");

            const childCheckStatus = ChgChildIsChildChecked(parent);

            parent.isChildrenChecked = childCheckStatus.includes(true);

            parent.isChildrenAllChecked = !childCheckStatus.includes(false);

            ChgCheckBoxStyle({
                node: parent,

                controlPoint: parent.isChildrenChecked
                    ? parent.isChecked
                        ? "grren"
                        : "#939292"
                    : parent.isChecked
                    ? "grren"
                    : "black",
            });
        }

        ChgParentIsChildChecked(parent.parent);
    }
}
