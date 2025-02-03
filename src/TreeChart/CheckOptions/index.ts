import CreateCheckOptionList from "./CreateEvent";
import { CheckedRemoveData, CheckedAddData, CheckedDefaultData } from "./List";

const Options = new CreateCheckOptionList();

Options.addEventFunc("remove", CheckedRemoveData);
Options.addEventFunc("add", CheckedAddData);
Options.addEventFunc("default", CheckedDefaultData);

export default Options;
