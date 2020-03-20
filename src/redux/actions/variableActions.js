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
    const { decisions, variables, options } = getState().entities;
    const variableWithNoName = decisions.byId[decisionId].variables
      .map(variableId => variables.byId[variableId])
      .find(variable => !variable.name);
    if (!variableWithNoName) {
      const variableId = uuid.v4();
      const variableScores = options.allIds
        .map(optId => options.byId[optId])
        .map(option => {
          return {
            id: uuid.v4(),
            optionId: option.id,
            variableId
          };
        });
      return dispatch({
        type: CREATE_VARIABLE,
        payload: { decisionId, variableId, variableScores }
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
  return (dispatch, getState) => {
    const { allIds, byId } = getState().entities.variableScores;
    const variableScores = allIds
      .map(vsId => byId[vsId])
      .filter(vs => vs.variableId == variableId)
      .map(vs => vs.id);
    dispatch({
      type: VARIABLE_REMOVE,
      payload: { decisionId, variableId, variableScores }
    });
  };
}
