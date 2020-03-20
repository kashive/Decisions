import {
  OPTION_NAME_CHANGE,
  OPTION_DESCRIPTION_CHANGE,
  OPTION_REMOVE,
  CREATE_OPTION,
  CREATE_VARIABLE,
  VARIABLE_REMOVE
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
    case CREATE_OPTION: {
      const { optionId, decisionId, variableScores } = action.payload;
      return produce(state, draft => {
        draft.byId[optionId] = {
          id: optionId,
          decisionId,
          variableScores: variableScores.map(vs => vs.id)
        };
        draft.allIds.unshift(optionId);
      });
    }
    case CREATE_VARIABLE: {
      const { variableScores } = action.payload;
      return produce(state, draft => {
        variableScores.forEach(vs =>
          draft.byId[vs.optionId].variableScores.push(vs.id)
        );
      });
    }
    case VARIABLE_REMOVE: {
      const { variableScores } = action.payload;
      return produce(state, draft => {
        const { byId, allIds } = draft;
        allIds
          .map(optId => byId[optId])
          .forEach(opt => {
            opt.variableScores = opt.variableScores.filter(
              vsId => !variableScores.includes(vsId)
            );
          });
      });
    }
    default:
      return state;
  }
}
