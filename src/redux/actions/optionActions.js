import {
  OPTION_NAME_CHANGE,
  OPTION_DESCRIPTION_CHANGE,
  OPTION_REMOVE,
  CREATE_OPTION
} from "../actionTypes";
import uuid from "uuid";

export function onOptionNameChange(id, name) {
  return dispatch => {
    dispatch({ type: OPTION_NAME_CHANGE, payload: { id, name } });
  };
}

export function onOptionDescriptionChange(id, description) {
  return dispatch => {
    dispatch({
      type: OPTION_DESCRIPTION_CHANGE,
      payload: { id, description }
    });
  };
}

export function onOptionRemove(optionId, decisionId, variableScoreIds) {
  return dispatch => {
    dispatch({
      type: OPTION_REMOVE,
      payload: { optionId, decisionId, variableScoreIds }
    });
  };
}

export function onOptionCreate(decisionId) {
  return (dispatch, getState) => {
    const optionId = uuid.v4();
    const { allIds, byId } = getState().entities.variables;
    const variableScores = allIds
      .map(variableId => byId[variableId])
      .filter(variable => variable.decisionId === decisionId)
      .map(variable => {
        return {
          id: uuid.v4(),
          optionId,
          variableId: variable.id
        };
      });
    dispatch({
      type: CREATE_OPTION,
      payload: { decisionId, optionId, variableScores }
    });
  };
}
