import { DataNode, ICheckedDataNode } from "../Interface";

class CreateCheckOptionList {
    //class 저장할 부분은 형식지정이 어려워
    private _eventClass: Map<
        string,
        ({
            checked,
            data,
            defaultView,
        }: {
            checked: ICheckedDataNode[];
            data: DataNode;
            type: string;
            defaultView: number;
        }) => d3.HierarchyNode<DataNode>
    >;

    constructor() {
        this._eventClass = new Map();
    }

    addEvent(
        name: string,
        classObject: ({
            checked,
            data,
            defaultView,
        }: {
            checked: ICheckedDataNode[];
            data: DataNode;
            type: string;
            defaultView: number;
        }) => d3.HierarchyNode<DataNode>
    ) {
        return this._eventClass.set(name, classObject);
    }

    createEventClass(
        name: string,
        options: {
            checked: ICheckedDataNode[];
            data: DataNode;
            type: string;
            defaultView: number;
        }
    ) {
        const ClassMethod = this._eventClass.get(name);

        return ClassMethod ? ClassMethod(options) : null;
    }
}

export default CreateCheckOptionList;
