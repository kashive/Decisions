import {
  OPTION_NAME_CHANGE,
  OPTION_DESCRIPTION_CHANGE,
  OPTION_REMOVE,
  CREATE_OPTION,
  OPTION_SCORE_CHANGE,
  OPTION_SCORE_REASONING_CHANGE
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

export function onOptionRemove(optionId, decisionId) {
  return dispatch => {
    dispatch({
      type: OPTION_REMOVE,
      payload: { optionId, decisionId }
    });
  };
}

export function onOptionCreate(decisionId) {
  return (dispatch, getState) => {
    const optionId = uuid.v4();
    const variableIds = getState().entities.variables.allIds;
    dispatch({
      type: CREATE_OPTION,
      payload: { decisionId, optionId, variableIds }
    });
  };
}

export function onOptionScoreChange(variableId, optionId, score) {
  return dispatch => {
    dispatch({
      type: OPTION_SCORE_CHANGE,
      payload: { variableId, optionId, score }
    });
  };
}
export function onOptionScoreReasoningChange(variableId, optionId, reasoning) {
  return dispatch => {
    dispatch({
      type: OPTION_SCORE_REASONING_CHANGE,
      payload: { variableId, optionId, reasoning }
    });
  };
}
