import { describe, it, expect } from "vitest";
import { ConvertColor } from "../../TreeChart/CheckBox/setColor";
import { CustomHierarchyNode } from "../../TreeChart/Interface";

describe("ConvertColor 함수", () => {
    it("노드가 체크된 경우 제공된 색상을 반환해야 합니다", () => {
        const node: CustomHierarchyNode = {
            isChecked: true,
        } as CustomHierarchyNode;
        const color = "#000000";
        const result = ConvertColor(node, color);
        expect(result).toBe(color);
    });

    it('노드가 비활성화된 경우 "#939292"를 반환해야 합니다', () => {
        const node: CustomHierarchyNode = {
            isChecked: false,
            isDisabled: true,
        } as CustomHierarchyNode;
        const color = "#000000";
        const result = ConvertColor(node, color);
        expect(result).toBe("#939292");
    });

    it('노드에 자식이 있고, isChildrenChecked가 true이며, isChecked가 false인 경우 "#939292"를 반환해야 합니다', () => {
        const node: CustomHierarchyNode = {
            isChecked: false,
            isChildrenChecked: true,
            children: [{}],
        } as CustomHierarchyNode;
        const color = "#000000";
        const result = ConvertColor(node, color);
        expect(result).toBe("#939292");
    });

    it('노드에 자식이 없고 체크되지 않은 경우 "white"를 반환해야 합니다', () => {
        const node: CustomHierarchyNode = {
            isChecked: false,
            isChildrenChecked: true,
        } as CustomHierarchyNode;
        const color = "#000000";
        const result = ConvertColor(node, color);
        expect(result).toBe("white");
    });

    it('어떤 조건도 충족하지 않는 경우 "#17171B"를 반환해야 합니다', () => {
        const node: CustomHierarchyNode = {
            isChecked: false,
            children: [{}],
            isChildrenChecked: false,
            isDisabled: false,
        } as CustomHierarchyNode;
        const color = "#000000";
        const result = ConvertColor(node, color);
        expect(result).toBe("#17171B");
    });
});
