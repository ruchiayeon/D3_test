import { describe, it, expect } from "vitest";
import { counterSlice } from "../../Redux/reducer";
import { ICheckedDataNode } from "../../TreeChart/Interface";

const { actions, reducer } = counterSlice;

describe("Redux 리듀서 테스트", () => {
    const initialState = {
        type: "default",
        duration: 100,
        color: { typeColor: "", defaultColor: "#17171B" },
        nodeSize: { height: 35, width: 30 },
        data: "",
        checked: [{ groupCode: "", groupName: "", fullPathCode: "" }],
    };

    it("setTreeData 액션을 처리해야 합니다", () => {
        const action = actions.setTreeData({ data: "test data" });
        const state = reducer(initialState, action);
        expect(state.data).toBe("test data");
    });

    it("setTreeChecked 액션을 처리해야 합니다", () => {
        const checked: ICheckedDataNode[] = [
            {
                groupCode: "group1",
                groupName: "Group 1",
                fullPathCode: "path1",
            },
        ];
        const action = actions.setTreeChecked({ checked });
        const state = reducer(initialState, action);
        expect(state.checked).toEqual(checked);
    });

    it("setTreeType 액션을 처리해야 합니다", () => {
        const action = actions.setTreeType({ type: "remove" });
        const state = reducer(initialState, action);
        expect(state.type).toBe("remove");
    });

    it("setTreeColor 액션을 처리해야 합니다", () => {
        const action = actions.setTreeColor({
            typeColor: "blue",
            defaultColor: "red",
        });
        const state = reducer(initialState, action);
        expect(state.color.typeColor).toBe("blue");
        expect(state.color.defaultColor).toBe("red");
    });

    it("setTreeColor 액션에서 typeColor가 없는 경우 defaultColor만 업데이트해야 합니다", () => {
        const action = actions.setTreeColor({
            typeColor: "",
            defaultColor: "red",
        });
        const state = reducer(initialState, action);
        expect(state.color.typeColor).toBe("");
        expect(state.color.defaultColor).toBe("red");
    });

    it("setTreeColor 액션에서 defaultColor가 없는 경우 typeColor만 업데이트해야 합니다", () => {
        const action = actions.setTreeColor({
            typeColor: "blue",
            defaultColor: "",
        });
        const state = reducer(initialState, action);
        expect(state.color.typeColor).toBe("blue");
        expect(state.color.defaultColor).toBe("#17171B");
    });
});
