export function calculate_metrics(optionStructs, variableStructs) {
  const variables = variableStructs.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
  return optionStructs
    .map((option) => {
      const { allIds, byId } = option.variableScores;
      const score = allIds
        .map((variableId) => byId[variableId])
        .map((variableScore) => {
          const score = variableScore.score || 0;
          const weight = variables[variableScore.variableId].weight || 0;
          return weight * score;
        })
        .reduce((a, b) => a + b, 0);
      const optionId = option.id;
      return { [optionId]: score };
    })
    .reduce((obj, item) => Object.assign(obj, item), {});
}
