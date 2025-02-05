import { describe, it, expect } from "vitest";
import { ICheckedDataNode, DataNode } from "../../TreeChart/Interface";
import CheckedMap from "../../TreeChart/CheckedMap";

describe("CheckedMap", () => {
    it("should create a map with default checked values", () => {
        const checked: ICheckedDataNode[] = [
            {
                groupCode: "group1",
                groupName: "Group 1",
                fullPathCode: "path/to/group1",
            },
        ];
        const data: DataNode = {
            groupCode: "group1",
            groupName: "Group 1",
            depth: 0,
            fullPath: "path/to/group1",
            fullPathCode: "path/to/group1",
            children: [],
        };
        const result = CheckedMap({ checked, data, type: "default" });

        expect(result.get("group1")).toEqual({
            isChecked: true,
            isChildrenChecked: false,
            isChildrenAllChecked: false,
            isAdd: false,
            isDisabled: false,
            isOpen: false,
            isRemoved: false,
            isChildOpen: false,
        });
    });
});
