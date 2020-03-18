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
