import { NORMALIZED_DUMMY_STATE } from "../../DummyState";
import {
  FETCH_DECISIONS_BEGIN,
  FETCH_DECISIONS_SUCCESS,
  DECISION_TITLE_CHANGE,
  CREATE_DECISION,
  DECISION_CONTEXT_CHANGE,
  DECISION_SELECT
} from "../actionTypes";

export function fetchDecisions(userId) {
  return dispatch => {
    dispatch(fetchDecisionsBegin());
    dispatch(fetchDecisionsSuccess(NORMALIZED_DUMMY_STATE.entities.decisions));
  };
}

export const fetchDecisionsBegin = () => ({
  type: FETCH_DECISIONS_BEGIN
});

export const fetchDecisionsSuccess = decisions => ({
  type: FETCH_DECISIONS_SUCCESS,
  payload: { decisions }
});

export function onDecisionTitleChange(decisionId, title) {
  return dispatch =>
    dispatch({ type: DECISION_TITLE_CHANGE, payload: { decisionId, title } });
}

export function onDecisionContextChange(decisionId, context) {
  return dispatch =>
    dispatch({
      type: DECISION_CONTEXT_CHANGE,
      payload: { decisionId, context }
    });
}

export function onDecisionCreate(title) {
  return dispatch => dispatch({ type: CREATE_DECISION, payload: { title } });
}

export function onCurrentDecisionChange(decisionId) {
  return dispatch =>
    dispatch({ type: DECISION_SELECT, payload: { decisionId } });
}
