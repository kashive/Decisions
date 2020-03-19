import { decisionsReducer } from "./decisionsReducer";
import { controlStateReducer } from "./controlStateReducer";
import { globalEntitiesReducer } from "./entitiesReducer";
import { APP_MOUNT_SUCCESS } from "../actionTypes";
import { variablesReducer } from "./variablesReducer";

export default function rootReducer(state, action) {
  var resp;
  switch (action.type) {
    case APP_MOUNT_SUCCESS:
      resp = {
        entities: globalEntitiesReducer(state.entities, action),
        controlState: controlStateReducer(state.controlState, action)
      };
      break;
    default:
      resp = {
        entities: {
          decisions: decisionsReducer(state.entities.decisions, action),
          variables: variablesReducer(state.entities.variables, action)
        },
        controlState: controlStateReducer(state.controlState, action)
      };
  }
  console.log("for action", action, "input is ", state, "resp is", resp);
  return resp;
}
