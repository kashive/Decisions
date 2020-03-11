import { CHANGE_TITLE } from "../actionTypes";

const initialState = {
  decisions: [
    {
      id: "1",
      title: "Decision 1",
      context: "This is why we need to make this decision",
      variables: [
        {
          id: 1,
          name: "Time",
          weight: 4,
          description: "Time and tide waits for none"
        },
        {
          id: 2,
          name: "Money",
          weight: 4,
          description:
            "Money and time and tide waits for none and none again and again."
        }
      ]
    }
  ],
  currentDecisionId: "1",
  title: {
    showBorder: false,
    showPlaceholder: false
  },
  variables: {
    currentlySelectedVaribleId: undefined
  }
};

export default function(state = initialState, action) {
  console.log("current state", initialState);
  console.log("called with action", action);
  switch (action.type) {
    case CHANGE_TITLE: {
      console.log("reducer is working");
      const { decisionId, content } = action.payload;
      const newState = { ...state };
      //   const decisions = newState.decisions;
      //   const currentDecisionIndex = decisions.findIndex(
      //     decision => decision.id === decisionId
      //   );
      //   const currentDecision = decisions[currentDecisionIndex];
      //   currentDecision.title = content;
      return newState;
    }
    default:
      return state;
  }
}
