import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckedDataNode, ITreeType } from "../TreeChart/Interface";

export const counterSlice = createSlice({
    name: "tree",
    initialState: {
        type: "detault",
        duration: 100,
        color: { typeColor: "", defaultColor: "#17171B" },
        nodeSize: { height: 35, width: 30 },
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
        setTreeColor: (
            state,
            action: PayloadAction<{ typeColor: string; defaultColor: string }>
        ) => {
            if (action.payload.typeColor)
                state.color.typeColor = action.payload.typeColor;

            if (action.payload.defaultColor)
                state.color.defaultColor = action.payload.defaultColor;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setTreeData, setTreeChecked, setTreeType, setTreeColor } =
    counterSlice.actions;

export default counterSlice.reducer;
