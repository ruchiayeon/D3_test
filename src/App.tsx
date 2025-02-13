import React from "react";
import TreeChart from "./TreeChart/index";
import { useDispatch } from "react-redux";
import {
    setTreeData,
    setTreeChecked,
    setTreeType,
    setTreeColor,
} from "./Redux/reducer";

import jsonData from "./TreeChart/groupJason.json";
import checked from "./TreeChart/checkedJson.json";

const App: React.FC = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setTreeData({ data: JSON.stringify(jsonData) }));
        dispatch(setTreeChecked({ checked: checked }));
        dispatch(setTreeType({ type: "remove" }));
        dispatch(setTreeColor({ defaultColor: "#17171B", typeColor: "blue" }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <TreeChart />;
};

export default App;
