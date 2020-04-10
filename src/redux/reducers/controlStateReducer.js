import {
  DECISION_SELECT,
  CREATE_DECISION,
  DELETE_DECISION,
} from "../actionTypes";
import { produce } from "immer";

export function controlStateReducer(state, action) {
  switch (action.type) {
    case DECISION_SELECT:
    case CREATE_DECISION: {
      return produce(state, (draft) => {
        draft.decisionId = action.payload.id;
      });
    }
    case DELETE_DECISION: {
      return produce(state, (draft) => {
        const { decisionId, nextDecisionId } = action.payload;
        if (draft.decisionId === decisionId) {
          draft.decisionId = nextDecisionId;
        }
      });
    }
    default:
      return state;
  }
}
