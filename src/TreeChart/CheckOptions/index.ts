import CreateCheckOptionList from "./CreateEvent";
import { CheckedRemoveData, CheckedAddData, CheckedDefaultData } from "./List";

const Options = new CreateCheckOptionList();

Options.addEvent("remove", CheckedRemoveData);
Options.addEvent("add", CheckedAddData);
Options.addEvent("default", CheckedDefaultData);

export default Options;
