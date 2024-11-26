import * as d3 from "d3";

import { CustomHierarchyNode, ICheckedDataNode, DataNode } from "./Interface";

export default function CheckedData({
    checked,
    data,
    type,
}: {
    checked: ICheckedDataNode[];
    data: DataNode;
    type: string;
}) {
    const groupCodeList = checked.map((v) => v.groupCode);

    return d3.hierarchy(data).eachBefore(
        ((i) => (d) => {
            const data = d as CustomHierarchyNode;

            data.index = i++;
            data.isChecked = false;
            data.isChildrenChecked = false;
            data.isChildrenAllChecked = false;
            data.isAdd = false;
            data.isDisabled = false;
            data.isOpen = false;
            data.isRemoved = false;
            data.isAdd = false;

            if (type === "remove") {
                return (data.isRemoved = groupCodeList.includes(
                    d.data.groupCode
                ));
            }

            if (type === "add") {
                return (data.isAdd = groupCodeList.includes(d.data.groupCode));
            }

            return (data.isChecked = groupCodeList.includes(d.data.groupCode));
        })(0)
    );
}
