import { decisionsReducer } from "./decisionsReducer";
import { controlStateReducer } from "./controlStateReducer";
import { globalEntitiesReducer } from "./entitiesReducer";
import { APP_MOUNT_SUCCESS } from "../actionTypes";
import { variablesReducer } from "./variablesReducer";
import { optionsReducer } from "./optionsReducer";
import ls from "local-storage";

export default function rootReducer(state, action) {
  const resp = {
    entities: {
      decisions: decisionsReducer(state.entities.decisions, action),
      variables: variablesReducer(state.entities.variables, action),
      options: optionsReducer(state.entities.options, action)
    },
    controlState: controlStateReducer(state.controlState, action)
  };
  ls.set("state", resp);
  console.log("for action", action, "input is ", state, "resp is", resp);
  return resp;
}
