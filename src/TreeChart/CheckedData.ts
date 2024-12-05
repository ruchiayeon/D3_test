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
            data.index = i;

            if (data.depth <= defaultView) {
                data.index = i++;
            }

            data.isChecked = groupCodeList.includes(data.data.groupCode);
            data.isChildrenChecked =
                !data.children && data.isChecked ? true : false;
            data.isChildrenAllChecked =
                !data.children && data.isChecked ? true : false;
            data.isAdd = false;

            if (type === "normal") {
                data.isDisabled = false;
            }

            data.isDisabled = data.isChecked ? true : false;
            data.isOpen = data.depth <= defaultView ? true : false;
            data.isChildOpen = data.depth < defaultView ? true : false;
            data.isRemoved = false;

            if (!data.depth) {
                data.isOpen = false;
            }

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
