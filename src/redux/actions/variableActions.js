import {
  CREATE_VARIABLE,
  VARIABLE_NAME_CHANGE,
  VARIABLE_DESCRIPTION_CHANGE,
  VARIABLE_WEIGHT_CHANGE,
  VARIABLE_REMOVE
} from "../actionTypes";
import uuid from "uuid";

export function onVariableCreate(decisionId) {
  return (dispatch, getState) => {
    const { decisions, variables } = getState().entities;
    const variableWithNoName = decisions.byId[decisionId].variables
      .map(variableId => variables.byId[variableId])
      .find(variable => !variable.name);
    if (!variableWithNoName) {
      return dispatch({
        type: CREATE_VARIABLE,
        payload: { decisionId, variableId: uuid.v4() }
      });
    }
  };
}

export function onVariableNameChange(id, name) {
  return dispatch =>
    dispatch({ type: VARIABLE_NAME_CHANGE, payload: { id, name } });
}

export function onVariableDescriptionChange(id, description) {
  return dispatch =>
    dispatch({
      type: VARIABLE_DESCRIPTION_CHANGE,
      payload: { id, description }
    });
}

export function onVariableWeightChange(id, weight) {
  return dispatch =>
    dispatch({ type: VARIABLE_WEIGHT_CHANGE, payload: { id, weight } });
}

export function onVariableRemove(decisionId, variableId) {
  return dispatch =>
    dispatch({ type: VARIABLE_REMOVE, payload: { decisionId, variableId } });
}
