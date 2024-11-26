import React from "react";
import TreeChart from "./TreeChart/index";
import { useSelector, useDispatch } from "react-redux";
import {
    setTreeData,
    setTreeChecked,
    setTreeType,
    setTreeColor,
} from "./Redux/reducer";
import { ChartProps } from "./TreeChart/Interface";

import jsonData from "./TreeChart/groupJason.json";
import checked from "./TreeChart/checkedJson.json";

const App: React.FC = () => {
    const getStore = useSelector(
        (state: { groups: ChartProps }) => state.groups
    );
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setTreeData({ data: jsonData }));
        dispatch(setTreeChecked({ checked: checked }));
        dispatch(setTreeType({ type: "remove" }));
        dispatch(setTreeColor({ color: "green" }));
    }, []);

    return (
        <div>
            <TreeChart
                data={getStore.data}
                checked={getStore.checked}
                type={getStore.type}
                color={getStore.color}
            />
        </div>
    );
};

export default App;
