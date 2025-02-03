import { CustomHierarchyNode } from "../Interface";
export function convertColor(node: CustomHierarchyNode, color: string) {
    if (node.isChecked) return color;
    if (
        node.isDisabled ||
        (node.children && node.isChildrenChecked && !node.isChecked)
    )
        return "#939292";
    if (!node.children && !node.isChecked) return "white";

    return "#17171B";
}
