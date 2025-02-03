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
    type: "default" | "remove" | "add";
}

interface ITreeCheckBox extends ITreeType {
    node: CustomHierarchyNode;
    color: { defaultColor: string; typeColor: string };
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
    duration: number;
    data: string;
    color: { defaultColor: string; typeColor: string };
    checked: ICheckedDataNode[];
    nodeSize: { width: number; height: number };
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
