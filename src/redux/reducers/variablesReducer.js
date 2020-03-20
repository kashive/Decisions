import {
  CREATE_VARIABLE,
  VARIABLE_NAME_CHANGE,
  VARIABLE_DESCRIPTION_CHANGE,
  VARIABLE_WEIGHT_CHANGE,
  VARIABLE_REMOVE,
  OPTION_REMOVE,
  CREATE_OPTION
} from "../actionTypes";
import produce from "immer";

export function variablesReducer(state, action) {
  switch (action.type) {
    case CREATE_VARIABLE: {
      return produce(state, draft => {
        const { decisionId, variableId } = action.payload;
        draft.byId[variableId] = {
          id: variableId,
          decisionId: decisionId,
          options: []
        };
        draft.allIds.push(variableId);
      });
    }
    case VARIABLE_NAME_CHANGE: {
      return produce(state, draft => {
        const { id, name } = action.payload;
        draft.byId[id].name = name;
      });
    }
    case VARIABLE_DESCRIPTION_CHANGE: {
      return produce(state, draft => {
        const { id, description } = action.payload;
        draft.byId[id].description = description;
      });
    }
    case VARIABLE_WEIGHT_CHANGE: {
      return produce(state, draft => {
        const { id, weight } = action.payload;
        draft.byId[id].weight = weight;
      });
    }
    case VARIABLE_REMOVE: {
      return produce(state, draft => {
        const { variableId } = action.payload;
        delete draft.byId[variableId];
        draft.allIds = draft.allIds.filter(id => id !== variableId);
      });
    }
    case OPTION_REMOVE: {
      return produce(state, draft => {
        const { allIds, byId } = draft;
        const { optionId } = action.payload;
        allIds
          .map(variableId => byId[variableId])
          .forEach(variable => {
            variable.options = variable.options.filter(
              optId => optId !== optionId
            );
          });
      });
    }
    case CREATE_OPTION: {
      const { optionId, decisionId } = action.payload;
      return produce(state, draft => {
        draft.allIds
          .map(variableId => draft.byId[variableId])
          .filter(variable => variable.decisionId === decisionId)
          .forEach(variable => variable.options.push(optionId));
      });
    }
    default:
      return state;
  }
}
