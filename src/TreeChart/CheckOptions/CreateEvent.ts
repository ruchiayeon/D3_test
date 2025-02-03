import { SetCheckBox } from "../CheckBox/List";
import { DataNode, ICheckedDataNode, ITreeCheckBox } from "../Interface";

class CreateCheckOptionList {
    //class 저장할 부분은 형식지정이 어려워
    private _eventClass: Map<string, typeof SetCheckBox>;

    private _eventFunc: Map<
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
        this._eventFunc = new Map();
    }

    addEventFunc(
        name: string,
        functionObject: ({
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
        return this._eventFunc.set(name, functionObject);
    }

    addEventClass(name: string, classObject: typeof SetCheckBox) {
        return this._eventClass.set(name, classObject);
    }

    createEventFunction(
        name: string,
        options: {
            checked: ICheckedDataNode[];
            data: DataNode;
            type: string;
            defaultView: number;
        }
    ) {
        const ClassMethod = this._eventFunc.get(name);

        return ClassMethod ? ClassMethod(options) : null;
    }

    createEventClass(name: string, options: ITreeCheckBox) {
        const ClassMethod = this._eventClass.get(name);

        return ClassMethod ? new ClassMethod(options) : null;
    }
}

export default CreateCheckOptionList;
