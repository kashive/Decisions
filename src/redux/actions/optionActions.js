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
    const { decisions, variables, options } = getState().entities;
    const optionsById = options.byId;
    const existingOptionWithNoName =
      decisions.byId[decisionId].optionIds
        .map(optId => optionsById[optId])
        .filter(opt => !opt.name).length > 0;
    if (existingOptionWithNoName) {
      return;
    }
    const { allIds: variableAllIds, byId: variableById } = variables;
    const variableIds = variableAllIds
      .map(variableId => variableById[variableId])
      .filter(variable => variable.decisionId === decisionId)
      .map(variable => variable.id);
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
