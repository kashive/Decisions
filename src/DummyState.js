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
      "2": {
        id: "1",
        decisionId: "1",
        name: "Time",
        weight: 4,
        description: "Time and tide waits for none"
      },
      "3": {
        id: "3",
        decisionId: "1",
        name: "Money",
        weight: 8,
        description:
          "Money and time and tide waits for none and none again and again."
      }
    },
    options: {
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
        variableScores: ["6", "7"]
      }
    },
    variableScores: {
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
        variableId: "2",
        score: 8,
        reasoning: "because of this"
      },
      "8": {
        id: "8",
        optionId: "5",
        variableId: "3",
        score: 2,
        reasoning: "because of this"
      }
    }
  },
  controlState: {
    activeDecision: { decisionId: "1" }
  }
};

export const DUMMY_DECISIONS = [
  {
    id: "1",
    title: "Decision 1",
    context: "This is why we need to make this decision",
    variables: [
      {
        id: "1",
        name: "Time",
        weight: 4,
        description: "Time and tide waits for none"
      },
      {
        id: "2",
        name: "Money",
        weight: 8,
        description:
          "Money and time and tide waits for none and none again and again."
      }
    ],
    options: [
      {
        id: "1",
        name: "Option A",
        description: "Solid option",
        variableScores: [
          {
            variableId: "1",
            score: 8,
            reasoning: "because of this"
          },
          {
            variableId: "2",
            score: 3,
            reasoning: "because of that"
          }
        ]
      },
      {
        id: "2",
        name: "Option B",
        description: "Another Solid option",
        variableScores: [
          {
            variableId: "1",
            score: 3,
            reasoning: "because of this"
          },
          {
            variableId: "2",
            score: 5,
            reasoning: "because of that"
          }
        ]
      }
    ]
  }
];
