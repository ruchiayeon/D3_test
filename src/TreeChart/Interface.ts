interface DataNode {
    groupCode: string;
    groupName: string;
    depth: number;
    fullPath: string;
    fullPathCode: string;
    children?: DataNode[];
}

interface CustomHierarchyNode extends d3.HierarchyNode<DataNode> {
    index: number;
    isChecked: boolean;
    isChildrenChecked: boolean;
    isChildrenAllChecked: boolean;
    isRemoved: boolean;
    isAdd: boolean;
    isDisabled: boolean;
    isOpen: boolean;
}

interface ITreeType {
    type: "normal" | "remove" | "add";
}

interface ITreeCheckBox extends ITreeType {
    node: CustomHierarchyNode;
    color: string;
}

interface ICheckedDataNode {
    groupCode: string;
    groupName: string;
    fullPathCode: string;
}

interface ChartProps extends ITreeType {
    data: DataNode;
    color: string;
    checked: ICheckedDataNode[];
}

export type {
    DataNode,
    CustomHierarchyNode,
    ChartProps,
    ITreeType,
    ITreeCheckBox,
    ICheckedDataNode,
};
