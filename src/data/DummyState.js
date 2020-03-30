export const NORMALIZED_DUMMY_STATE_V2 = {
  entities: {
    decisions: {
      byId: {
        "1": {
          id: "1",
          title: "Decision 1",
          context: "This is why we need to make this decision",
          variableIds: ["2", "3"],
          optionIds: ["4", "5"]
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
      allIds: ["2", "3"]
    },
    options: {
      byId: {
        "4": {
          id: "4",
          decisionId: "1",
          name: "Option A",
          description: "Solid option",
          variableScores: {
            byId: {
              "2": {
                variableId: "2",
                score: 8,
                reasoning: "because of this"
              },
              "3": {
                variableId: "3",
                score: 6,
                reasoning: "because of this"
              }
            },
            allIds: ["2", "3"]
          }
        },
        "5": {
          id: "5",
          decisionId: "1",
          name: "Option B",
          description: "Another Solid option",
          variableScores: {
            byId: {
              "2": {
                variableId: "2",
                score: 3,
                reasoning: "because of this again"
              },
              "3": {
                variableId: "3",
                score: 8,
                reasoning: "Some reason that you cannot understand"
              }
            },
            allIds: ["2", "3"]
          }
        }
      },
      allIds: ["4", "5"]
    }
  }
};
