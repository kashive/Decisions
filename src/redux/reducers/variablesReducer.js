import { CREATE_VARIABLE } from "../actionTypes";
import uuid from "uuid";
import produce from "immer";

const initialState = {
  variables: []
};

const findDecisionById = (decisions, decisionId) => {
  return decisions.find(decision => decision.id === decisionId);
};

export function variablesReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_VARIABLE: {
      const { decisionId } = action.payload;
      //if there is a variable that is has no name then don't create a new one
      const currentDecision = findDecisionById(state, decisions, decisionId);
      const variableWithNoName = currentDecision.variables.find(
        variable => !variable.name
      );
      if (variableWithNoName) return state;
      return produce(state, draft => {
        const id = uuid.v4();
        const newDecision = findDecisionById(draft.decisions, decisionId);
        newDecision.variables.push({
          id: id
        });
        //also add it variable to all the options
        //todo: do this only when variable has a name
        newDecision.options.forEach(opt =>
          opt.variableScores.push({ variableId: id })
        );
      });
    }
    default:
      return state;
  }
}
