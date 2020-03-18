import { CREATE_VARIABLE } from "../actionTypes";

export function onVariableCreate(name) {
  return dispatch => dispatch({ type: CREATE_VARIABLE, payload: { name } });
}
