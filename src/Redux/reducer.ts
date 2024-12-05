import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckedDataNode, ITreeType } from "../TreeChart/Interface";

export const counterSlice = createSlice({
    name: "tree",
    initialState: {
        type: "",
        typecolor: "",
        color: "",
        checkedMap: {},
        data: "",
        checked: [{ groupCode: "", groupName: "", fullPathCode: "" }],
    },
    reducers: {
        setTreeData: (state, action: PayloadAction<{ data: string }>) => {
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
        setTreeTypeColor: (
            state,
            action: PayloadAction<{ typecolor: string }>
        ) => {
            state.typecolor = action.payload.typecolor;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setTreeData,
    setTreeChecked,
    setTreeType,
    setTreeColor,
    setTreeTypeColor,
} = counterSlice.actions;

export default counterSlice.reducer;
