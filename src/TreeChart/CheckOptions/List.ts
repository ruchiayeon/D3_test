import * as d3 from "d3";

import { CustomHierarchyNode, ICheckedDataNode, DataNode } from "../Interface";

export function CheckedDefaultData({
    checked,
    data,
    defaultView,
}: {
    checked: ICheckedDataNode[];
    data: DataNode;
    type: string;
    defaultView: number;
}) {
    const groupCodeList = checked.map((v) => v.groupCode);

    return d3.hierarchy(data).eachBefore(
        ((i) => (d) => {
            const data = d as CustomHierarchyNode;
            data.index = i;

            if (data.depth <= defaultView) {
                data.index = i++;
            }

            data.isChecked = groupCodeList.includes(data.data.groupCode);
            data.isChildrenChecked =
                !data.children && data.isChecked ? true : false;
            data.isChildrenAllChecked =
                !data.children && data.isChecked ? true : false;
            data.isOpen = data.depth <= defaultView ? true : false;
            data.isChildOpen = data.depth < defaultView ? true : false;
            data.isAdd = false;
            data.isRemoved = false;
            data.isDisabled = false;

            if (!data.depth) {
                data.isOpen = false;
            }
        })(0)
    );
}

export function CheckedRemoveData({
    checked,
    data,
    defaultView,
}: {
    checked: ICheckedDataNode[];
    data: DataNode;
    type: string;
    defaultView: number;
}) {
    const groupCodeList = checked.map((v) => v.groupCode);

    return d3.hierarchy(data).eachBefore(
        ((i) => (d) => {
            const data = d as CustomHierarchyNode;
            data.index = i;

            data.isChecked = groupCodeList.includes(data.data.groupCode);
            data.isChildrenChecked =
                !data.children && data.isChecked ? true : false;
            data.isChildrenAllChecked =
                !data.children && data.isChecked ? true : false;
            data.isAdd = false;
            data.isDisabled = data.isChecked ? true : false;
            data.isOpen = data.depth <= defaultView ? true : false;
            data.isChildOpen = data.depth < defaultView ? true : false;
            data.isRemoved = groupCodeList.includes(d.data.groupCode);

            if (!data.depth) {
                data.isOpen = false;
            }

            if (data.depth <= defaultView) {
                data.index = i++;
            }
        })(0)
    );
}

export function CheckedAddData({
    checked,
    data,
    defaultView,
}: {
    checked: ICheckedDataNode[];
    data: DataNode;
    type: string;
    defaultView: number;
}) {
    const groupCodeList = checked.map((v) => v.groupCode);

    return d3.hierarchy(data).eachBefore(
        ((i) => (d) => {
            const data = d as CustomHierarchyNode;
            data.index = i;

            if (data.depth <= defaultView) {
                data.index = i++;
            }

            data.isChecked = groupCodeList.includes(data.data.groupCode);
            data.isChildrenChecked =
                !data.children && data.isChecked ? true : false;
            data.isChildrenAllChecked =
                !data.children && data.isChecked ? true : false;
            data.isAdd = groupCodeList.includes(d.data.groupCode);
            data.isDisabled = data.isChecked ? true : false;
            data.isOpen = data.depth <= defaultView ? true : false;
            data.isChildOpen = data.depth < defaultView ? true : false;
            data.isRemoved = false;

            if (!data.depth) {
                data.isOpen = false;
            }
        })(0)
    );
}
