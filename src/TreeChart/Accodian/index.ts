import * as d3 from "d3";

import CheckBox from "../CheckBox";
import { CustomHierarchyNode, ChartProps } from "../Interface";
import { ConvertColor } from "../CheckBox/setColor";

export default function OpenCloseGroupItem(
    child: CustomHierarchyNode,
    getStore: ChartProps
) {
    new CheckBox({
        node: child,
        color: {
            typeColor: ConvertColor(child, getStore.color.typeColor),
            defaultColor: getStore.color.defaultColor,
        },
        type: getStore.type,
    }).setCheckbox();

    if (child.parent) {
        d3.select(
            document.getElementById(
                `${child.parent.data.groupCode} treecheckboxmark`
            )
        ).attr(
            "d",
            child.parent.isChildOpen
                ? `M${
                      child.parent.depth * getStore.nodeSize.height - 27
                  } 8.5 H${
                      child.parent.depth * getStore.nodeSize.height - 27
                  } ${child.parent.depth * getStore.nodeSize.height - 18}`
                : `M${
                      child.parent.depth * getStore.nodeSize.height - 22.5
                  } 4 L${
                      child.parent.depth * getStore.nodeSize.height - 22.5
                  } 13 M${
                      child.parent.depth * getStore.nodeSize.height - 27
                  } 8.5 H${
                      child.parent.depth * getStore.nodeSize.height - 27
                  } ${child.parent.depth * getStore.nodeSize.height - 18}`
        );
    }

    d3.select(document.getElementById(`${child.data.groupCode} treecheckbox`))
        .transition()
        .duration(getStore.duration * 3)
        .style(
            "display",
            `${child.isOpen && child.parent?.isOpen ? "block" : "none"}`
        );

    d3.select(
        document.getElementById(`${child.data.groupCode} treecheckboxmark`)
    )
        .transition()
        .duration(getStore.duration * 3)
        .style(
            "display",
            `${child.isOpen && child.parent?.isOpen ? "block" : "none"}`
        );
}
