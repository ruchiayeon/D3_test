import * as d3 from "d3";

import { ICheckedDataNode, DataNode, IChecked } from "./Interface";

export default function CheckedList({
    checked,
    data,
    type,
}: {
    checked: ICheckedDataNode[];
    data: DataNode;
    type: string;
}) {
    const CheckedMap = new Map<string, IChecked>();
    const groupCodeList = checked.map((v) => v.groupCode);

    d3.hierarchy(data).eachBefore(
        (() => (d) => {
            const defaultChecked = {
                isChecked: groupCodeList.includes(d.data.groupCode),
                isChildrenChecked: false,
                isChildrenAllChecked: false,
                isAdd: false,
                isDisabled: false,
                isOpen: false,
                isRemoved: false,
                isChildOpen: false,
            };

            const changeChecked: { isRemoved?: boolean; isAdd?: boolean } = {};

            if (type === "remove") {
                changeChecked.isRemoved = groupCodeList.includes(
                    d.data.groupCode
                );
            }

            if (type === "add") {
                changeChecked.isAdd = groupCodeList.includes(d.data.groupCode);
            }

            CheckedMap.set(
                d.data.groupCode,
                Object.assign(defaultChecked, changeChecked)
            );
        })()
    );

    return CheckedMap;
}
