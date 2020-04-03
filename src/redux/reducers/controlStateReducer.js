import { DECISION_SELECT, CREATE_DECISION } from "../actionTypes";
import { produce } from "immer";

export function controlStateReducer(state, action) {
  switch (action.type) {
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
