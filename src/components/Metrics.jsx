import React from "react";
import { connect } from "react-redux";
import Card from "./shared/Card";

const Metrics = props => {
  return (
    <Card
      title="Metrics"
      dropdownConfig={{
        enableDropdown: true,
        enableFullscreen: true,
        enableCollapse: true
      }}
      body={
        <table>
          <thead>
            <tr>
              <th style={{ width: "90%" }}>Option Name</th>
              <th style={{ width: "10%" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {props.optionScores
              .filter(optionScore => optionScore.optionName)
              .map(optionScore => {
                return (
                  <tr key={optionScore.optionId}>
                    <td>
                      <span
                        className="pointerOnHover"
                        onClick={props.scrollToOptions.bind(
                          this,
                          optionScore.optionId
                        )}
                      >
                        {optionScore.optionName}
                      </span>
                    </td>
                    <td>{optionScore.score}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      }
    />
  );
};

const mapStateToProps = (state, myProps) => {
  const { options, variables, decisions } = state.entities;
  const optionIds = decisions.byId[myProps.decisionId].optionIds;
  const optionScores = optionIds
    .map(optId => options.byId[optId])
    .map(option => {
      const { allIds, byId } = option.variableScores;
      const score = allIds
        .map(variableId => byId[variableId])
        .map(variableScore => {
          const score = variableScore.score || 0;
          const weight = variables.byId[variableScore.variableId].weight || 0;
          return weight * score;
        })
        .reduce((a, b) => a + b, 0);
      return { optionId: option.id, score, optionName: option.name };
    });
  return {
    optionScores
  };
};

export default connect(mapStateToProps, null)(Metrics);
