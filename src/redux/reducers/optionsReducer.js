import {
  OPTION_NAME_CHANGE,
  OPTION_DESCRIPTION_CHANGE,
  OPTION_REMOVE,
  CREATE_OPTION,
  CREATE_VARIABLE,
  VARIABLE_REMOVE,
  OPTION_SCORE_CHANGE,
  OPTION_SCORE_REASONING_CHANGE
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
    case OPTION_SCORE_REASONING_CHANGE: {
      const { variableId, optionId, reasoning } = action.payload;
      return produce(state, draft => {
        draft.byId[optionId].variableScores.byId[
          variableId
        ].reasoning = reasoning;
      });
    }
    case OPTION_SCORE_CHANGE: {
      const { optionId, variableId, score } = action.payload;
      return produce(state, draft => {
        draft.byId[optionId].variableScores.byId[variableId].score = score;
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
      const { optionId, decisionId, variableIds } = action.payload;
      return produce(state, draft => {
        draft.byId[optionId] = {
          id: optionId,
          decisionId,
          variableScores: {
            byId: variableIds
              .map(id => {
                return { [id]: { variableId: id } };
              })
              .reduce((obj, item) => Object.assign(obj, item), {}),
            allIds: variableIds
          }
        };
        draft.allIds.unshift(optionId);
      });
    }
    case CREATE_VARIABLE: {
      const { decisionId, variableId } = action.payload;

      return produce(state, draft => {
        const { allIds, byId } = draft;
        allIds
          .map(optId => byId[optId])
          .filter(opt => opt.decisionId === decisionId)
          .forEach(opt => {
            opt.variableScores.byId[variableId] = {
              variableId
            };
            opt.variableScores.allIds.unshift(variableId);
          });
      });
    }
    case VARIABLE_REMOVE: {
      const { decisionId, variableId } = action.payload;
      return produce(state, draft => {
        const { byId, allIds } = draft;
        allIds
          .map(optId => byId[optId])
          .filter(option => option.decisionId === decisionId)
          .filter(option => option.variableScores.allIds.includes(variableId))
          .forEach(option => {
            delete option.variableScores.byId[variableId];
            const variableScoresAllIds = option.variableScores.allIds;
            option.variableScores.allIds = variableScoresAllIds.filter(
              id => id !== variableId
            );
          });
      });
    }
    default:
      return state;
  }
}
