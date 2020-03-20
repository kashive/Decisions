import {
  OPTION_NAME_CHANGE,
  OPTION_DESCRIPTION_CHANGE,
  OPTION_REMOVE
} from "../actionTypes";

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
