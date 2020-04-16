import {
  DECISION_SELECT,
  CREATE_DECISION,
  DELETE_DECISION,
  CHANGE_VIEW,
} from "../actionTypes";
import { produce } from "immer";
import ViewTypes from "../viewTypes";

export function viewStateReducer(state, action) {
  switch (action.type) {
    case DECISION_SELECT:
    case CREATE_DECISION: {
      return produce(state, (draft) => {
        draft.currentView = ViewTypes.MAIN;
      });
    }
    case DELETE_DECISION: {
      return produce(state, (draft) => {
        draft.currentView = ViewTypes.MAIN;
      });
    }
    case CHANGE_VIEW: {
      return produce(state, (draft) => {
        draft.currentView = action.payload.viewType;
      });
    }
    default:
      return state;
  }
}
