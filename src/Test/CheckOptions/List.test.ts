import { describe, it, expect } from "vitest";
import {
    CheckedDefaultData,
    CheckedRemoveData,
    CheckedAddData,
} from "../../TreeChart/CheckOptions/List";
import {
    CustomHierarchyNode,
    ICheckedDataNode,
    DataNode,
} from "../../TreeChart/Interface";

describe("CheckedDefaultData 함수", () => {
    it("기본 데이터를 올바르게 설정해야 합니다", () => {
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

        const reault = CheckedDefaultData({
            checked,
            type: "default",
            data: data,
            defaultView: 1,
        });

        reault.eachBefore((d) => {
            const node = d as CustomHierarchyNode;
            expect(node.isChecked).toBe(true);
            expect(node.isChildrenChecked).toBe(true);
            expect(node.isChildrenAllChecked).toBe(true);
            expect(node.isOpen).toBe(false);
            expect(node.isChildOpen).toBe(true);
            expect(node.isAdd).toBe(false);
            expect(node.isRemoved).toBe(false);
            expect(node.isDisabled).toBe(false);
        });
    });
});

describe("CheckedRemoveData 함수", () => {
    it("제거된 데이터를 올바르게 설정해야 합니다", () => {
        const checked: ICheckedDataNode[] = [
            {
                groupCode: "group1",
                groupName: "Group 1",
                fullPathCode: "path1",
            },
        ];
        const data: DataNode = {
            groupCode: "group1",
            groupName: "Group 1",
            depth: 0,
            fullPath: "path1",
            fullPathCode: "path1",
        };
        const defaultView = 1;

        const reault = CheckedRemoveData({
            checked,
            data,
            type: "remove",
            defaultView,
        });

        reault.eachBefore((d) => {
            const node = d as CustomHierarchyNode;
            expect(node.isChecked).toBe(true);
            expect(node.isChildrenChecked).toBe(true);
            expect(node.isChildrenAllChecked).toBe(true);
            expect(node.isOpen).toBe(false);
            expect(node.isChildOpen).toBe(true);
            expect(node.isAdd).toBe(false);
            expect(node.isRemoved).toBe(true);
            expect(node.isDisabled).toBe(true);
        });
    });
});

describe("CheckedAddData 함수", () => {
    it("추가된 데이터를 올바르게 설정해야 합니다", () => {
        const checked: ICheckedDataNode[] = [
            {
                groupCode: "group1",
                groupName: "Group 1",
                fullPathCode: "path1",
            },
        ];
        const data: DataNode = {
            groupCode: "group1",
            groupName: "Group 1",
            depth: 0,
            fullPath: "path1",
            fullPathCode: "path1",
        };
        const defaultView = 1;

        const result = CheckedAddData({
            checked,
            data,
            type: "add",
            defaultView,
        });

        result.eachBefore((d) => {
            const node = d as CustomHierarchyNode;
            expect(node.isChecked).toBe(true);
            expect(node.isChildrenChecked).toBe(true);
            expect(node.isChildrenAllChecked).toBe(true);
            expect(node.isOpen).toBe(false);
            expect(node.isChildOpen).toBe(true);
            expect(node.isAdd).toBe(true);
            expect(node.isRemoved).toBe(false);
            expect(node.isDisabled).toBe(true);
        });
    });
});
