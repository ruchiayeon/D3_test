import CreateCheckOptionList from "../CheckOptions/CreateEvent";
import {
    CheckedDefaultText,
    CheckedRemovedText,
    CheckDefaultBoxColor,
    CheckRemoveBoxColor,
    CheckDefaultBoxMark,
    CheckRemoveBoxMark,
} from "./List";

const textOptions = new CreateCheckOptionList();
const boxOptions = new CreateCheckOptionList();
const markOptions = new CreateCheckOptionList();

// Text
textOptions.addEventClass("remove", CheckedRemovedText);
textOptions.addEventClass("default", CheckedDefaultText);
textOptions.addEventClass("add", CheckedDefaultText);

// Box
boxOptions.addEventClass("remove", CheckRemoveBoxColor);
boxOptions.addEventClass("default", CheckDefaultBoxColor);
boxOptions.addEventClass("add", CheckDefaultBoxColor);

// Mark
markOptions.addEventClass("remove", CheckRemoveBoxMark);
markOptions.addEventClass("default", CheckDefaultBoxMark);
markOptions.addEventClass("add", CheckDefaultBoxMark);

export { textOptions, boxOptions, markOptions };
