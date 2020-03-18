import { DUMMY_DECISIONS } from "../../DummyState";
import {
  FETCH_DECISIONS_BEGIN,
  FETCH_DECISIONS_SUCCESS,
  DECISION_TITLE_CHANGE,
  CREATE_DECISION
} from "../actionTypes";

export function fetchDecisions(userId) {
  return dispatch => {
    dispatch(fetchDecisionsBegin());
    dispatch(fetchDecisionsSuccess(DUMMY_DECISIONS));
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

export function onDecisionCreate(title) {
  return dispatch => dispatch({ type: CREATE_DECISION, payload: { title } });
}
