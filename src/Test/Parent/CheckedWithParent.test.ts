import { describe, it, expect } from "vitest";
import * as d3 from "d3";
import CheckedWithParent from "../../TreeChart/Parent/CheckedWithParent";
import { CustomHierarchyNode } from "../../TreeChart/Interface";
import groupJson from "../../TreeChart/groupJason.json";
import CheckedData from "../../TreeChart/CheckOptions";

describe("CheckedWithParent 함수", () => {
    const root = CheckedData.createEventFunction("default", {
        checked: [],
        type: "default",
        data: groupJson,
        defaultView: 1,
    });

    if (!root) return;

    const TestNodes = root.descendants() as CustomHierarchyNode[];

    it("부모 노드가 있는 경우 부모 노드의 체크 상태를 자식 노드에 복사해야 합니다", () => {
        const hierarchyNode = d3.hierarchy(TestNodes[1]);

        const result = CheckedWithParent(hierarchyNode);

        expect(result.data.isChecked).toBe(result.data.parent!.isChecked);
        expect(result.data.isChildrenChecked).toBe(
            result.data.parent!.isChildrenChecked
        );
        expect(result.data.isChildrenAllChecked).toBe(
            result.data.parent!.isChildrenAllChecked
        );
    });

    it("부모 노드가 없는 경우 노드의 체크 상태를 변경하지 않아야 합니다", () => {
        const hierarchyNode = d3.hierarchy(TestNodes[0]);

        const result = CheckedWithParent(hierarchyNode);

        expect(result.data.isChecked).toBe(false);
        expect(result.data.isChildrenChecked).toBe(false);
        expect(result.data.isChildrenAllChecked).toBe(false);
    });
});
