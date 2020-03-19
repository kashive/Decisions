import {
  FETCH_DECISIONS_SUCCESS,
  DECISION_SELECT,
  CREATE_DECISION
} from "../actionTypes";
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
    case DECISION_SELECT:
    case CREATE_DECISION: {
      return produce(state, draft => {
        draft.decisionId = action.payload.id;
      });
    }
    default:
      return state;
  }
}
