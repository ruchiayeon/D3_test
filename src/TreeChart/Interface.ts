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
    isDisabled: boolean;
    isOpen: boolean;
}

interface ChartProps {
    data: DataNode;
}

export type { DataNode, CustomHierarchyNode, ChartProps };
