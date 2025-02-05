import { describe, it, expect } from "vitest";
import CheckedData from "../../TreeChart/CheckOptions";
import {
    textOptions,
    boxOptions,
    markOptions,
} from "../../TreeChart/CheckBox/setCheckBoxOptions";
import node from "../../TreeChart/groupJason.json";
import Checkednode from "../../TreeChart/checkedJson.json";
import { CustomHierarchyNode } from "../../TreeChart/Interface";

describe("setCheckBoxOptions", () => {
    const root = CheckedData.createEventFunction("default", {
        checked: Checkednode,
        type: "default",
        data: node,
        defaultView: 1,
    });

    if (!root) return;

    const TestNodes = root.descendants() as CustomHierarchyNode[];

    it("should initialize textOptions with correct classes", () => {
        expect(
            textOptions.createEventClass("remove", {
                node: TestNodes[0],
                color: { defaultColor: "black", typeColor: "red" },
                type: "remove",
            })
        );
        expect(
            textOptions.createEventClass("default", {
                node: TestNodes[0],
                color: { defaultColor: "black", typeColor: "blue" },
                type: "default",
            })
        );
        expect(
            textOptions.createEventClass("add", {
                node: TestNodes[0],
                color: { defaultColor: "black", typeColor: "green" },
                type: "add",
            })
        );
    });

    it("should initialize boxOptions with correct classes", () => {
        expect(
            boxOptions.createEventClass("remove", {
                node: TestNodes[0],
                color: { defaultColor: "red", typeColor: "red" },
                type: "remove",
            })
        );
        expect(
            boxOptions.createEventClass("default", {
                node: TestNodes[0],
                color: { defaultColor: "blue", typeColor: "blue" },
                type: "default",
            })
        );
        expect(
            boxOptions.createEventClass("add", {
                node: TestNodes[0],
                color: { defaultColor: "green", typeColor: "green" },
                type: "add",
            })
        );
    });

    it("should initialize markOptions with correct classes", () => {
        expect(
            markOptions.createEventClass("remove", {
                node: TestNodes[0],
                color: { defaultColor: "red", typeColor: "red" },
                type: "remove",
            })
        );
        expect(
            markOptions.createEventClass("default", {
                node: TestNodes[0],
                color: { defaultColor: "blue", typeColor: "blue" },
                type: "default",
            })
        );
        expect(
            markOptions.createEventClass("add", {
                node: TestNodes[0],
                color: { defaultColor: "green", typeColor: "green" },
                type: "add",
            })
        );
    });
});
