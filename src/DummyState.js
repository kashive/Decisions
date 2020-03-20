export const NORMALIZED_DUMMY_STATE = {
  entities: {
    decisions: {
      byId: {
        "1": {
          id: "1",
          title: "Decision 1",
          context: "This is why we need to make this decision",
          variables: ["2", "3"],
          options: ["4", "5"]
        }
      },
      allIds: ["1"]
    },
    variables: {
      byId: {
        "2": {
          id: "2",
          decisionId: "1",
          name: "Time",
          weight: 4,
          description: "Time and tide waits for none",
          options: ["4"] //todo: remove this
        },
        "3": {
          id: "3",
          decisionId: "1",
          name: "Money",
          weight: 8,
          options: [],
          description:
            "Money and time and tide waits for none and none again and again."
        }
      },
      allIds: ["2", "3"]
    },
    options: {
      byId: {
        "4": {
          id: "4",
          decisionId: "1",
          name: "Option A",
          description: "Solid option",
          variableScores: ["6", "7"]
        },
        "5": {
          id: "5",
          decisionId: "1",
          name: "Option B",
          description: "Another Solid option",
          variableScores: ["8"]
        }
      },
      allIds: ["4", "5"]
    },
    variableScores: {
      byId: {
        "6": {
          id: "6",
          optionId: "4",
          variableId: "2",
          score: 8,
          reasoning: "because of this"
        },
        "7": {
          id: "7",
          optionId: "5",
          variableId: "3",
          score: 3,
          reasoning: "because of this"
        },
        "8": {
          id: "8",
          optionId: "5",
          variableId: "3",
          score: 2,
          reasoning: "because of this"
        }
      },
      allIds: ["6", "7", "8"]
    }
  }
};
