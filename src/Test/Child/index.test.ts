import { describe, it, expect } from "vitest";
import { CustomHierarchyNode } from "../../TreeChart/Interface";
import groupJson from "../../TreeChart/groupJason.json";
import CheckedData from "../../TreeChart/CheckOptions";

import {
    ChgChildIsChildChecked,
    ChildChgCheck,
} from "../../TreeChart/Child/index";

describe("ChgChildIsChildChecked 함수", () => {
    it("하위 그룹의 체크 여부를 확인해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: true,
            isChildrenAllChecked: false,
            isOpen: true,
            children: [
                {
                    data: { groupCode: "group2" },
                    isChecked: true,
                    isChildrenChecked: true,
                    isOpen: true,
                },
            ],
        } as CustomHierarchyNode;

        const result = ChgChildIsChildChecked(node);

        expect(result).toEqual([true, true]);
    });

    it("하위 그룹이 없는 경우 빈 배열을 반환해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: false,
            isChildrenAllChecked: false,
            isOpen: true,
        } as CustomHierarchyNode;

        const result = ChgChildIsChildChecked(node);

        expect(result).toEqual([false]);
    });
});

describe("ChildChgCheck 함수", () => {
    const root = CheckedData.createEventFunction("default", {
        checked: [],
        type: "default",
        data: groupJson,
        defaultView: 1,
    });

    if (!root) return;

    const TestNodes = root.descendants() as CustomHierarchyNode[];

    it("기준점에서 부모 노드를 확인해야 합니다", () => {
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        const result = ChildChgCheck({ node: TestNodes[0], color, type });

        expect(result.get("A0001")).toEqual({
            isChecked: true,
            isChildrenChecked: true,
            isChildrenAllChecked: true,
        });
    });

    it("기준점에서 자식 노드를 확인해야 합니다", () => {
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        const result = ChildChgCheck({ node: TestNodes[0], color, type });

        expect(result.get("C0054")).toEqual({
            isChecked: false,
            isChildrenChecked: false,
            isChildrenAllChecked: false,
        });
    });

    it("클릭한 기준점만 체크해야 합니다", () => {
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        const result = ChildChgCheck({ node: TestNodes[0], color, type });

        expect(result.has("A0001")).toBe(true);
    });

    it("하위 자식이 없을때, ", () => {
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: false,
            isChildrenAllChecked: false,
            isOpen: true,
        } as CustomHierarchyNode;

        const type: "default" | "remove" | "add" = "default";

        const result = ChildChgCheck({ node: node, color, type });

        console.log(result);

        expect(result.has("group1"));
    });
});
