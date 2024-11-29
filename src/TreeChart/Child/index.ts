import * as d3 from "d3";
import { CustomHierarchyNode, ITreeCheckBox } from "../Interface";
import CheckedWithParent from "../Parent/CheckedWithParent";
import CheckBox from "../CheckBox";

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

function CheckedWithChild(node: d3.HierarchyNode<CustomHierarchyNode>) {
    if (!node.parent) {
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

//기준점 체크
export function ChildChgCheck({ node, color, type }: ITreeCheckBox) {
    //descendants -> 하양식
    return d3
        .hierarchy(node)
        .descendants()
        .map((n) => {
            //기준점에서 부모 node 확인
            CheckedWithParent(n);

            //기준점에서 자식 node 확인
            CheckedWithChild(n);

            //클릭한 기준점만 체크한다.
            return new CheckBox({
                node: n.data,
                color: n.data.isChecked ? color : "black",
                type,
            }).setCheckbox();
        });
}
