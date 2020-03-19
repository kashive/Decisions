import { DECISION_SELECT } from "../actionTypes";

export function onDecisionSelect(decisionId) {
  return dispatch =>
    dispatch({ type: DECISION_SELECT, payload: { decisionId } });
}
