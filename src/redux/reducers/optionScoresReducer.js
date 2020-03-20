import {
  OPTION_SCORE_CHANGE,
  OPTION_SCORE_REASONING_CHANGE,
  OPTION_REMOVE,
  CREATE_OPTION
} from "../actionTypes";
import { produce } from "immer";

export function optionScoresReducer(state, action) {
  switch (action.type) {
    case OPTION_SCORE_CHANGE: {
      const { variableScoreId, score } = action.payload;
      return produce(state, draft => {
        draft.byId[variableScoreId].score = score;
      });
    }
    case OPTION_SCORE_REASONING_CHANGE: {
      const { variableScoreId, reasoning } = action.payload;
      return produce(state, draft => {
        draft.byId[variableScoreId].reasoning = reasoning;
      });
    }
    case OPTION_REMOVE: {
      const { variableScoreIds } = action.payload;
      return produce(state, draft => {
        variableScoreIds.forEach(id => {
          delete draft.byId[id];
        });
        draft.allIds = draft.allIds.filter(
          id => !variableScoreIds.includes(id)
        );
      });
    }
    case CREATE_OPTION: {
      const { variableScores } = action.payload;
      return produce(state, draft => {
        variableScores.forEach(vs => {
          draft.byId[vs.id] = vs;
          draft.allIds.push(vs.id);
        });
      });
    }
    default:
      return state;
  }
}
