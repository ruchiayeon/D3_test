import * as d3 from "d3";

import { CustomHierarchyNode, ICheckedDataNode, DataNode } from "./Interface";

export default function CheckedData({
    checked,
    data,
    type,
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

            data.index = -15;

            if (!data.depth) {
                return;
            }

            if (data.depth <= defaultView) {
                data.index = i++;
            }

            data.isChecked = false;
            data.isChildrenChecked = false;
            data.isChildrenAllChecked = false;
            data.isAdd = false;
            data.isDisabled = false;
            data.isOpen = data.depth <= defaultView ? true : false;
            data.isRemoved = false;
            data.isAdd = false;
            data.isChecked = groupCodeList.includes(d.data.groupCode);

            if (type === "remove") {
                return (data.isRemoved = groupCodeList.includes(
                    d.data.groupCode
                ));
            }

            if (type === "add") {
                return (data.isAdd = groupCodeList.includes(d.data.groupCode));
            }
        })(0)
    );
}
