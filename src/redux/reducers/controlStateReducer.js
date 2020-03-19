import { FETCH_DECISIONS_SUCCESS, DECISION_SELECT } from "../actionTypes";
import { produce } from "immer";

const initialState = {
  decisionId: undefined
};

export function controlStateReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECISIONS_SUCCESS: {
      const decisionIds = action.payload.decisions.allIds;
      return produce(state, draft => {
        draft.decisionId = decisionIds[decisionIds.length - 1];
      });
    }
    case DECISION_SELECT: {
      return produce(state, draft => {
        draft.decisionId = action.payload.decisionId;
      });
    }
    default:
      return state;
  }
}
