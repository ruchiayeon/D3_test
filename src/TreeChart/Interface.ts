interface DataNode {
    groupCode: string;
    groupName: string;
    depth: number;
    fullPath: string;
    fullPathCode: string;
    children?: DataNode[];
}

interface CustomHierarchyNode extends d3.HierarchyNode<DataNode>, IChecked {
    index: number;
}

interface IChecked {
    isChecked: boolean;
    isChildrenChecked: boolean;
    isChildrenAllChecked: boolean;
    isRemoved: boolean;
    isAdd: boolean;
    isDisabled: boolean;
    isOpen: boolean;
    isChildOpen: boolean;
}

interface ITreeType {
    type: "normal" | "remove" | "add";
}

interface ITreeCheckBox extends ITreeType {
    node: CustomHierarchyNode;
    color: string;
    changeChecked?: Map<string, object>;
}

interface ICheckedDataNode {
    groupCode: string;
    groupName: string;
    fullPathCode: string;
}

interface TreeNode {
    id: number;
    name: string;
    depth: number;
    groupCode: string;
    fullPath: string;
    fullPathCode: string;
    children?: TreeNode[];
    _children?: TreeNode[];
    x: number;
    y: number;
    x0: number;
    y0: number;
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
    IChecked,
    TreeNode,
};
