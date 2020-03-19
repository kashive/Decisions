import {
  FETCH_DECISIONS_SUCCESS,
  DECISION_TITLE_CHANGE,
  CREATE_DECISION,
  DECISION_CONTEXT_CHANGE,
  CREATE_VARIABLE,
  VARIABLE_REMOVE
} from "../actionTypes";
import produce from "immer";

const initialState = {
  byId: {},
  allIds: []
};

export function decisionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECISIONS_SUCCESS: {
      return produce(state, draft => {
        //for now data is same but once api is implmented then may need to renormalize
        //see: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
        const { byId, allIds } = action.payload.decisions;
        draft.byId = byId;
        draft.allIds = allIds;
      });
    }
    case DECISION_TITLE_CHANGE: {
      const { id, title } = action.payload;
      return produce(state, draft => {
        const decision = draft.byId[id];
        decision.title = title;
      });
    }
    case DECISION_CONTEXT_CHANGE: {
      const { id, context } = action.payload;
      return produce(state, draft => {
        const currentDecision = draft.byId[id];
        currentDecision.context = context;
      });
    }
    case CREATE_DECISION: {
      return produce(state, draft => {
        const { id, title } = action.payload;
        draft.byId[id] = {
          id: id,
          title: title,
          variables: [],
          options: []
        };
        draft.allIds.push(id);
      });
    }
    case CREATE_VARIABLE: {
      return produce(state, draft => {
        const { decisionId, variableId } = action.payload;
        draft.byId[decisionId].variables.push(variableId);
      });
    }
    case VARIABLE_REMOVE: {
      return produce(state, draft => {
        const { decisionId, variableId } = action.payload;
        const variables = draft.byId[decisionId].variables;
        draft.byId[decisionId].variables = variables.filter(
          id => id !== variableId
        );
      });
    }
    default:
      return state;
  }
}
