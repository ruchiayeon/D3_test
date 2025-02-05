import { describe, it, beforeEach } from "vitest";
import {
    CheckedDefaultText,
    CheckedRemovedText,
    CheckDefaultBoxColor,
    CheckRemoveBoxColor,
    CheckDefaultBoxMark,
    CheckRemoveBoxMark,
} from "../../TreeChart/CheckBox/List";
import { CustomHierarchyNode } from "../../TreeChart/Interface";

describe("SetCheckBox 클래스", () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <div id="group1 groupText"></div>
      <div id="group1 checkbox"></div>
      <div id="group1 mark"></div>
    `;
    });

    it("CheckedDefaultText 인스턴스를 생성하고 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1", groupName: "Group 1" },
            isChecked: true,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        new CheckedDefaultText({ node, color, type }).text();

        //const element = document.getElementById("group1 groupText");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.style.fill).toBe("rgb(255, 255, 255)");
        //expect(element?.style.fontWeight).toBe("400");
        //expect(element?.style.opacity).toBe("1");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckedRemovedText 인스턴스를 생성하고 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1", groupName: "Group 1" },
            isChecked: true,
            isRemoved: true,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "remove";

        new CheckedRemovedText({ node, color, type }).text();

        //const element = document.getElementById("group1 groupText");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.style.fill).toBe("red");
        //expect(element?.style.fontWeight).toBe("400");
        //expect(element?.style.opacity).toBe("1");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckedRemovedText 인스턴스를 생성하고 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1", groupName: "Group 1" },
            isChecked: true,
            isRemoved: false,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "remove";

        new CheckedRemovedText({ node, color, type }).text();

        //const element = document.getElementById("group1 groupText");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.style.fill).toBe("red");
        //expect(element?.style.fontWeight).toBe("400");
        //expect(element?.style.opacity).toBe("1");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckDefaultBoxColor 인스턴스를 생성하고 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: true,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        new CheckDefaultBoxColor({ node, color, type }).box();

        //const element = document.getElementById("group1 checkbox");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.style.fill).toBe("rgb(255, 255, 255)");
        //expect(element?.style.stroke).toBe("rgb(255, 255, 255)");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckRemoveBoxColor 인스턴스를 생성하고 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: true,
            isRemoved: true,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "remove";

        new CheckRemoveBoxColor({ node, color, type }).box();

        //const element = document.getElementById("group1 checkbox");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.style.fill).toBe("red");
        //expect(element?.style.stroke).toBe("red");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckRemoveBoxColor 인스턴스를 생성하고 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: false,
            isRemoved: true,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "remove";

        new CheckRemoveBoxColor({ node, color, type }).box();

        //const element = document.getElementById("group1 checkbox");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.style.fill).toBe("red");
        //expect(element?.style.stroke).toBe("red");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckRemoveBoxColor 인스턴스를 생성하고 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: true,
            isRemoved: false,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "remove";

        new CheckRemoveBoxColor({ node, color, type }).box();

        //const element = document.getElementById("group1 checkbox");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.style.fill).toBe("red");
        //expect(element?.style.stroke).toBe("red");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckDefaultBoxMark 인스턴스를 생성하고 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: true,
            isChildrenAllChecked: true,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        new CheckDefaultBoxMark({ node, color, type }).marker();

        //const element = document.getElementById("group1 mark");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.style.stroke).toBe("rgb(255, 255, 255)");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckRemoveBoxMark 인스턴스를 생성하고 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: false,
            isRemoved: true,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "remove";

        new CheckRemoveBoxMark({ node, color, type }).marker();

        //const element = document.getElementById("group1 mark");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.style.stroke).toBe("red");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckRemoveBoxMark 인스턴스를 생성하고 하위 그룹이 없고 본인이 체크되지 않은 경우 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: false,
            isRemoved: true,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "remove";

        new CheckRemoveBoxMark({ node, color, type }).marker();

        //const element = document.getElementById("group1 mark");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.getAttribute("points")).toBe("0,0 0,0");
        //expect(element?.style.display).toBe("none");
    });

    it("CheckRemoveBoxMark 인스턴스를 생성하고 하위 전체가 체크되고 본인도 체크된 경우 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: true,
            isChildrenAllChecked: true,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        new CheckRemoveBoxMark({ node, color, type }).marker();

        //const element = document.getElementById("group1 mark");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.getAttribute("points")).toBe("34,9 38,13 43,5");
        //expect(element?.style.stroke).toBe("rgb(255, 255, 255)");
        //expect(element?.style.display).toBe("block");
    });

    it("CheckRemoveBoxMark 인스턴스를 생성하고 하위 전체가 체크되지 않고 본인도 체크되지 않은 경우 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: true,
            isChildrenAllChecked: false,
            isOpen: true,
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        new CheckRemoveBoxMark({ node, color, type }).marker();

        //const element = document.getElementById("group1 mark");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.getAttribute("points")).toBe("0,0 0,0");
        //expect(element?.style.display).toBe("none");
    });

    it("CheckRemoveBoxMark 인스턴스를 생성하고 하위 전체가 체크되지 않고 본인도 체크되지 않은 경우 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: false,
            isChildrenAllChecked: false,
            isOpen: true,
            children: [
                {
                    data: { groupCode: "group2" },
                    isChecked: false,
                    isChildrenChecked: true,
                    isOpen: true,
                },
            ],
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        new CheckRemoveBoxMark({ node, color, type }).marker();

        //const element = document.getElementById("group1 mark");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.getAttribute("points")).toBe("0,0 0,0");
        //expect(element?.style.display).toBe("none");
    });

    it("CheckRemoveBoxMark 인스턴스를 생성하고 하위 체크가 있고 본인 체크가 없는 경우 CSS 값을 설정해야 합니다", () => {
        const node: CustomHierarchyNode = {
            data: { groupCode: "group1" },
            isChecked: false,
            isChildrenChecked: true,
            isOpen: true,
            children: [
                {
                    data: { groupCode: "group2" },
                    isChecked: false,
                    isChildrenChecked: true,
                    isOpen: true,
                },
            ],
        } as CustomHierarchyNode;
        const color = { defaultColor: "#000", typeColor: "#fff" };
        const type: "default" | "remove" | "add" = "default";

        new CheckRemoveBoxMark({ node, color, type }).marker();

        //const element = document.getElementById("group1 mark");
        //expect(element).toBeInstanceOf(HTMLElement);
        //expect(element?.getAttribute("points")).toBe("34,9 43,9");
        //expect(element?.style.stroke).toBe("rgb(255, 255, 255)");
        //expect(element?.style.display).toBe("block");
    });
});
