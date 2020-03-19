import {
  FETCH_DECISIONS_SUCCESS,
  DECISION_TITLE_CHANGE,
  CREATE_DECISION,
  DECISION_CONTEXT_CHANGE
} from "../actionTypes";
import uuid from "uuid";
import produce from "immer";

const initialState = {
  byId: {},
  allIds: []
};
const findDecisionById = (decisions, decisionId) => {
  return decisions.find(decision => decision.id === decisionId);
};

export function decisionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DECISIONS_SUCCESS: {
      console.log("fetch success with action", action);
      return action.payload.decisions;
      // return produce(state, draft => {
      //   draft.decisions = action.payload.decisions;
      // });
    }
    // case DECISION_TITLE_CHANGE: {
    //   const { decisionId, title } = action.payload;
    //   return produce(state, draft => {
    //     const decision = findDecisionById(draft.decisions, decisionId);
    //     decision.title = title;
    //   });
    // }
    // case CREATE_DECISION: {
    //   return produce(state, draft => {
    //     const decisionId = uuid.v4();
    //     draft.decisions.push({
    //       id: decisionId,
    //       title: action.payload.title,
    //       variables: [],
    //       options: []
    //     });
    //   });
    // }
    // case DECISION_CONTEXT_CHANGE: {
    //   const { decisionId, context } = action.payload;
    //   return produce(state, draft => {
    //     const currentDecision = findDecisionById(draft.decisions, decisionId);
    //     currentDecision.context = context;
    //   });
    // }
    default:
      return state;
  }
}
