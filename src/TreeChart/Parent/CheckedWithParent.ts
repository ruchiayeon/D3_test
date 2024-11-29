import { CustomHierarchyNode } from "../Interface";

export default function CheckedWithParent(
    node: d3.HierarchyNode<CustomHierarchyNode>
) {
    if (node.parent) {
        node.data.isChecked = node.parent.data.isChecked;
        node.data.isChildrenChecked = node.parent.data.isChecked;
        node.data.isChildrenAllChecked = node.parent.data.isChecked;
        return;
    }
}
