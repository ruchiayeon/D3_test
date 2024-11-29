import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    DataNode,
    ICheckedDataNode,
    ITreeType,
    CustomHierarchyNode,
} from "../TreeChart/Interface";

export const counterSlice = createSlice({
    name: "tree",
    initialState: {
        type: "normal",
        color: "blue",
        HierarchyNode: {},
        data: {
            groupCode: "",
            groupName: "",
            depth: 0,
            fullPath: "",
            fullPathCode: "",
        },
        checked: [{ groupCode: "", groupName: "", fullPathCode: "" }],
    },
    reducers: {
        setTreeHierarchy: (
            state,
            action: PayloadAction<{ data: CustomHierarchyNode[] }>
        ) => {
            state.HierarchyNode = action.payload.data;
        },
        setTreeData: (state, action: PayloadAction<{ data: DataNode }>) => {
            state.data = action.payload.data;
        },
        setTreeChecked: (
            state,
            action: PayloadAction<{ checked: ICheckedDataNode[] }>
        ) => {
            state.checked = action.payload.checked;
        },
        setTreeType: (state, action: PayloadAction<ITreeType>) => {
            state.type = action.payload.type;
        },
        setTreeColor: (state, action: PayloadAction<{ color: string }>) => {
            state.color = action.payload.color;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setTreeData,
    setTreeChecked,
    setTreeType,
    setTreeColor,
    setTreeHierarchy,
} = counterSlice.actions;

export default counterSlice.reducer;
