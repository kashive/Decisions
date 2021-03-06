import {
  CREATE_VARIABLE,
  VARIABLE_NAME_CHANGE,
  VARIABLE_DESCRIPTION_CHANGE,
  VARIABLE_WEIGHT_CHANGE,
  VARIABLE_REMOVE,
  DELETE_DECISION,
} from "../actionTypes";
import produce from "immer";

export function variablesReducer(state, action) {
  switch (action.type) {
    case CREATE_VARIABLE: {
      return produce(state, (draft) => {
        const { decisionId, variableId } = action.payload;
        draft.byId[variableId] = {
          id: variableId,
          decisionId: decisionId,
        };
        draft.allIds.unshift(variableId);
      });
    }
    case VARIABLE_NAME_CHANGE: {
      return produce(state, (draft) => {
        const { id, name } = action.payload;
        draft.byId[id].name = name;
      });
    }
    case VARIABLE_DESCRIPTION_CHANGE: {
      return produce(state, (draft) => {
        const { id, description } = action.payload;
        draft.byId[id].description = description;
      });
    }
    case VARIABLE_WEIGHT_CHANGE: {
      return produce(state, (draft) => {
        const { id, weight } = action.payload;
        draft.byId[id].weight = weight;
      });
    }
    case VARIABLE_REMOVE: {
      return produce(state, (draft) => {
        const { variableId } = action.payload;
        delete draft.byId[variableId];
        draft.allIds = draft.allIds.filter((id) => id !== variableId);
      });
    }
    case DELETE_DECISION: {
      return produce(state, (draft) => {
        const { decisionId } = action.payload;
        const { allIds, byId } = draft;
        const variableIdsToDelete = allIds
          .map((id) => byId[id])
          .filter((variable) => variable.decisionId === decisionId)
          .map((variable) => variable.id);
        variableIdsToDelete.forEach((variableId) => delete byId[variableId]);
        draft.allIds = draft.allIds.filter(
          (id) => !variableIdsToDelete.includes(id)
        );
      });
    }
    default:
      return state;
  }
}
