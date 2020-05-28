import React from "react";
import { connect } from "react-redux";
import Card from "./shared/Card";
import { calculate_metrics } from "../calculation/MetricsCalculation";

const Metrics = (props) => {
  return (
    <Card
      title="Metrics"
      dropdownConfig={{
        enableDropdown: true,
        enableFullscreen: true,
        enableCollapse: true,
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
            {props.optionMetrics
              .filter((optionMetrics) => optionMetrics.name)
              .map((optionMetrics) => {
                return (
                  <tr key={optionMetrics.optionId}>
                    <td>
                      <span
                        className="pointerOnHover"
                        onClick={props.scrollToOptions.bind(
                          this,
                          optionMetrics.optionId
                        )}
                        dangerouslySetInnerHTML={{ __html: optionMetrics.name }}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {optionMetrics.score}
                    </td>
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
  const optionStructs = decisions.byId[myProps.decisionId].optionIds.map(
    (optId) => options.byId[optId]
  );
  const variableStructs = decisions.byId[myProps.decisionId].variableIds.map(
    (vId) => variables.byId[vId]
  );
  const metrics = calculate_metrics(optionStructs, variableStructs);
  const optionMetrics = optionStructs.map((option) => {
    return {
      optionId: option.id,
      score: metrics[option.id],
      name: option.name,
    };
  });
  return {
    optionMetrics,
  };
};

export default connect(mapStateToProps, null)(Metrics);
