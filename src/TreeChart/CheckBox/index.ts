import { CustomHierarchyNode, ITreeCheckBox } from "../Interface";
import { textOptions, boxOptions, markOptions } from "./setCheckBoxOptions";

//class 형태도 사용 가능함
export default class CheckBox implements ITreeCheckBox {
    node: CustomHierarchyNode;
    color: { defaultColor: string; typeColor: string };
    type: "default" | "remove" | "add";
    nodeSize: number;
    duration: number;

    constructor({ node, color, type }: ITreeCheckBox) {
        this.node = node;
        this.color = color;
        this.nodeSize = 35;
        this.type = type;
        this.duration = 100;
    }

    setCheckbox() {
        return this.text().box().marker();
    }

    text() {
        const GetTextOption = textOptions.createEventClass(this.type, {
            node: this.node,
            color: this.color,
            type: this.type,
        });

        if (GetTextOption) GetTextOption.text();

        return this;
    }

    box() {
        const GetBoxOption = boxOptions.createEventClass(this.type, {
            node: this.node,
            color: this.color,
            type: this.type,
        });

        if (GetBoxOption) GetBoxOption.box();

        return this;
    }

    marker() {
        const GetMarkOption = markOptions.createEventClass(this.type, {
            node: this.node,
            color: this.color,
            type: this.type,
        });

        if (GetMarkOption) GetMarkOption.marker();
        return;
    }
}
