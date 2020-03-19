import { DECISION_SELECT } from "../actionTypes";

export function onDecisionSelect(id) {
  return dispatch => dispatch({ type: DECISION_SELECT, payload: { id } });
}
