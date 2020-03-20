import {
  OPTION_NAME_CHANGE,
  OPTION_DESCRIPTION_CHANGE,
  OPTION_REMOVE
} from "../actionTypes";
import { produce } from "immer";

export function optionsReducer(state, action) {
  switch (action.type) {
    case OPTION_NAME_CHANGE: {
      const { id, name } = action.payload;
      return produce(state, draft => {
        draft.byId[id].name = name;
      });
    }
    case OPTION_DESCRIPTION_CHANGE: {
      const { id, description } = action.payload;
      return produce(state, draft => {
        draft.byId[id].description = description;
      });
    }
    case OPTION_REMOVE: {
      const { optionId } = action.payload;
      return produce(state, draft => {
        delete draft.byId[optionId];
        draft.allIds = draft.allIds.filter(id => id !== optionId);
      });
    }
    default:
      return state;
  }
}
