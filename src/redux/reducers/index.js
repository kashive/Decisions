import { decisionsReducer } from "./decisionsReducer";
import { controlStateReducer } from "./controlStateReducer";
import { variablesReducer } from "./variablesReducer";
import { viewStateReducer } from "./viewsStateReducer";

import { optionsReducer } from "./optionsReducer";
import ls from "local-storage";

export default function rootReducer(state, action) {
  const resp = {
    entities: {
      decisions: decisionsReducer(state.entities.decisions, action),
      variables: variablesReducer(state.entities.variables, action),
      options: optionsReducer(state.entities.options, action),
    },
    controlState: controlStateReducer(state.controlState, action),
    viewState: viewStateReducer(state.viewState, action),
  };
  ls.set("state", resp);
  console.log("for action", action, "input is ", state, "resp is", resp);
  return resp;
}
