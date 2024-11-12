import * as d3 from "d3";
import { CustomHierarchyNode } from "./Interface";

import { ChgCheckBoxStyle } from "./Style";

//바로 하위 그룹 체크여부 확인
export function ChgChildIsChildChecked(children: CustomHierarchyNode) {
    const underChildChecked: boolean[] = [];
    d3.hierarchy(children)
        .descendants()
        .map((child) => {
            underChildChecked.push(child.data.isChecked);
        });
    return underChildChecked;
}

export function CheckedWithChild(node: d3.HierarchyNode<CustomHierarchyNode>) {
    if (!node.parent) {
        console.log(node);
        if (node.children) {
            node.data.isChecked = !node.data.isChecked;
            node.data.isChildrenChecked = !node.data.isChecked;
            node.data.isChildrenAllChecked = !node.data.isChecked;
            return;
        }

        node.data.isChecked = !node.data.isChecked;
        node.data.isChildrenChecked = true;
        node.data.isChildrenAllChecked = true;
        return;
    }
}

//하위 체크
export function ChildRecursion(node: CustomHierarchyNode) {
    return d3
        .hierarchy(node)
        .descendants()
        .map((n) => {
            CheckedWithChild(n);

            ChgCheckBoxStyle({
                node: n.data,
                controlPoint: n.data.isChecked ? "green" : "black",
            });
        });
}
