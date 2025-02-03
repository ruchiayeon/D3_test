import * as d3 from "d3";

import { ICheckedDataNode, DataNode, IChecked } from "./Interface";

export default function CheckedList({
    checked,
    data,
}: {
    checked: ICheckedDataNode[];
    data: DataNode;
    type: string;
}) {
    const CheckedMap = new Map<string, IChecked>();
    const groupCodeList = checked.map((v) => v.groupCode);

    d3.hierarchy(data).eachBefore(
        (() => (d) => {
            const IsChecked = groupCodeList.includes(d.data.groupCode);
            const defaultChecked = {
                isChecked: IsChecked,
                isChildrenChecked: false,
                isChildrenAllChecked: false,
                isAdd: false,
                isDisabled: false,
                isOpen: false,
                isRemoved: false,
                isChildOpen: false,
            };

            CheckedMap.set(d.data.groupCode, defaultChecked);
        })()
    );

    return CheckedMap;
}
