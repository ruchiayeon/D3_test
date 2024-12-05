import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckedDataNode, ITreeType } from "../TreeChart/Interface";

export const counterSlice = createSlice({
    name: "tree",
    initialState: {
        type: "",
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
    },
});

// Action creators are generated for each case reducer function
export const { setTreeData, setTreeChecked, setTreeType, setTreeColor } =
    counterSlice.actions;

export default counterSlice.reducer;
