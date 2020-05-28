import { NORMALIZED_DUMMY_STATE_V2 } from "../../data/DummyState";
import {
  FETCH_DECISIONS_BEGIN,
  FETCH_DECISIONS_SUCCESS,
  DECISION_TITLE_CHANGE,
  CREATE_DECISION,
  DECISION_CONTEXT_CHANGE,
  DELETE_DECISION,
} from "../actionTypes";
import uuid from "uuid";

export function fetchDecisions(userId) {
  return (dispatch) => {
    dispatch(fetchDecisionsBegin());
    dispatch(
      fetchDecisionsSuccess(NORMALIZED_DUMMY_STATE_V2.entities.decisions)
    );
  };
}

export const fetchDecisionsBegin = () => ({
  type: FETCH_DECISIONS_BEGIN,
});

export const fetchDecisionsSuccess = (decisions) => ({
  type: FETCH_DECISIONS_SUCCESS,
  payload: { decisions },
});

export function onDecisionTitleChange(id, title) {
  return (dispatch, getState) => {
    const state = getState();
    const currentDecisionId = state.controlState.decisionId;
    //this is a hacky fix needed for https://app.asana.com/0/1166509149726089/1177419345434433
    if (currentDecisionId !== id) return;
    dispatch({ type: DECISION_TITLE_CHANGE, payload: { id, title } });
  };
}

export function onDecisionContextChange(id, context) {
  return (dispatch, getState) => {
    const state = getState();
    const currentDecisionId = state.controlState.decisionId;
    //this is a hacky fix needed for https://app.asana.com/0/1166509149726089/1177419345434433
    if (currentDecisionId !== id) return;
    dispatch({
      type: DECISION_CONTEXT_CHANGE,
      payload: { id, context },
    });
  };
}

export function onDecisionCreate(title) {
  return (dispatch) => {
    dispatch({ type: CREATE_DECISION, payload: { title, id: uuid.v4() } });
  };
}

export function onDecisionDelete(decisionId) {
  return (dispatch, getState) => {
    const state = getState();
    const currentDecisionId = state.controlState.decisionId;
    const nextDecisionId =
      currentDecisionId === decisionId
        ? state.entities.decisions.allIds.find((id) => id !== decisionId)
        : undefined;
    dispatch({
      type: DELETE_DECISION,
      payload: { decisionId, nextDecisionId },
    });
  };
}
