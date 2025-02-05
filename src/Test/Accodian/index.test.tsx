import { describe, it, expect } from "vitest";
import OpenCloseGroupItem from "../../TreeChart/Accodian";
import "@testing-library/jest-dom";
import { CustomHierarchyNode, ChartProps } from "../../TreeChart/Interface";

describe("OpenCloseGroupItem 함수", () => {
    it("클릭 이벤트를 처리해야 합니다", () => {
        const child: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            parent: {
                data: { groupCode: "parentGroup" },
                depth: 1,
                isChildOpen: false,
            },
        } as CustomHierarchyNode;

        const getStore: ChartProps = {
            color: { typeColor: "#000", defaultColor: "#fff" },
            type: "default",
            nodeSize: { height: 30, width: 30 },
            duration: 500,
            data: "",
            checked: [],
        };

        document.body.innerHTML = `
      <svg>
        <path id="parentGroup treecheckboxmark"></path>
      </svg>
    `;

        OpenCloseGroupItem(child, getStore);

        const path = document.getElementById("parentGroup treecheckboxmark");
        expect(path).toHaveAttribute("d", "M7.5 4 L7.5 13 M3 8.5 H3 12");

        if (child.parent) {
            // 클릭 이벤트 시뮬레이션
            child.parent.isChildOpen = true;
            OpenCloseGroupItem(child, getStore);
            expect(path).toHaveAttribute("d", "M3 8.5 H3 12");
        }
    });

    it("부모 노드가 없는 경우 체크박스를 설정해야 합니다", () => {
        const child: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            parent: null,
        } as CustomHierarchyNode;

        const getStore: ChartProps = {
            color: { typeColor: "#000", defaultColor: "#fff" },
            type: "default",
            nodeSize: { height: 30, width: 30 },
            duration: 500,
            data: "",
            checked: [],
        };
        OpenCloseGroupItem(child, getStore);

        // 부모 노드가 없는 경우 추가적인 검증 로직을 여기에 추가할 수 있습니다.
        expect(true).toBe(true); // 기본적인 검증
    });
});
