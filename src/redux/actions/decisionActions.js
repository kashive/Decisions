import { DUMMY_DECISIONS } from "../../DummyState";
import { FETCH_DECISIONS_BEGIN, FETCH_DECISIONS_SUCCESS } from "../actionTypes";

export function fetchDecisions(userId) {
  return dispatch => {
    dispatch(fetchDecisionsBegin());
    dispatch(fetchDecisionsSuccess(DUMMY_DECISIONS));
    return DUMMY_DECISIONS;
  };
}

export const fetchDecisionsBegin = () => ({
  type: FETCH_DECISIONS_BEGIN
});

export const fetchDecisionsSuccess = decisions => ({
  type: FETCH_DECISIONS_SUCCESS,
  payload: { decisions }
});
