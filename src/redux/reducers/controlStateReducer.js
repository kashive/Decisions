import {
  APP_MOUNT_SUCCESS,
  DECISION_SELECT,
  CREATE_DECISION
} from "../actionTypes";
import { produce } from "immer";

export function controlStateReducer(state, action) {
  switch (action.type) {
    case APP_MOUNT_SUCCESS: {
      const decisionIds = action.payload.entities.decisions.allIds;
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
