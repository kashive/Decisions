import {
  FETCH_DECISIONS_SUCCESS,
  DECISION_TITLE_CHANGE,
  CREATE_DECISION
} from "../actionTypes";
import uuid from "uuid";
import produce from "immer";

const initialState = {
  decisions: []
};

export function decisionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECISIONS_SUCCESS: {
      return produce(state, draft => {
        draft.decisions = action.payload.decisions;
      });
    }
    case DECISION_TITLE_CHANGE: {
      const { decisionId, title } = action.payload;
      return produce(state, draft => {
        const decision = draft.decisions.find(
          decision => decision.id === decisionId
        );
        decision.title = title;
      });
    }
    case CREATE_DECISION: {
      return produce(state, draft => {
        const decisionId = uuid.v4();
        draft.decisions.push({
          id: decisionId,
          title: action.payload.title,
          variables: [],
          options: []
        });
      });
    }
    default:
      return state;
  }
}
