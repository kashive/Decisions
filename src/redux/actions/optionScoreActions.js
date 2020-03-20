import {
  OPTION_SCORE_CHANGE,
  OPTION_SCORE_REASONING_CHANGE
} from "../actionTypes";

export function onOptionScoreChange(variableScoreId, score) {
  return dispatch => {
    dispatch({
      type: OPTION_SCORE_CHANGE,
      payload: { variableScoreId, score }
    });
  };
}

export function onOptionScoreReasoningChange(variableScoreId, reasoning) {
  return dispatch => {
    dispatch({
      type: OPTION_SCORE_REASONING_CHANGE,
      payload: { variableScoreId, reasoning }
    });
  };
}
