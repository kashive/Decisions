import React from "react";

import { connect } from "react-redux";
import {
  onOptionNameChange,
  onOptionCreate,
  onOptionScoreChange,
} from "../redux/actions/optionActions";
import { calculate_metrics } from "../calculation/MetricsCalculation";
import Card from "./shared/Card";
import CustomSlider from "./shared/CustomSlider";
import { EditableOptionTitle } from "./Option";

const VariablesOptionsMetricsTable = ({
  decisionId,
  onOptionNameChange,
  onOptionScoreChange,
  onOptionCreate,
  tableData,
}) => {
  return (
    <Card
      title="Metrics"
      dropdownConfig={{
        enableDropdown: true,
        enableFullscreen: true,
        enableCollapse: true,
        additionalDropdowns: [
          {
            text: "Add new option",
            onClick: () => onOptionCreate(decisionId),
          },
        ],
      }}
      body={
        <table>
          <thead>
            <tr>
              <th style={{ width: "40%" }} rowSpan="2">
                Option Name
              </th>
              <th style={{ width: "50%" }} colSpan="2">
                Variables
              </th>
              <th rowSpan="2">Score</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => {
              const rowSpan =
                data.variableInfos.length > 0 ? data.variableInfos.length : 1;
              const firstVariableInfo = data.variableInfos[0] || {};
              const firstRow = (
                <tr key={data.optionId + "-" + firstVariableInfo.variableId}>
                  <td rowSpan={rowSpan}>
                    <EditableOptionTitle
                      headerText={data.name}
                      onNameChange={(name) =>
                        onOptionNameChange(data.optionId, name)
                      }
                    />
                  </td>
                  <td>{firstVariableInfo.name}</td>
                  <td>
                    <CustomSlider
                      preventRenderOnNoValue={!firstVariableInfo.name}
                      value={firstVariableInfo.score}
                      style={{ marginBottom: "5px" }}
                      onHandleMove={(score) =>
                        onOptionScoreChange(
                          firstVariableInfo.variableId,
                          data.optionId,
                          score
                        )
                      }
                    />
                  </td>
                  <td style={{ textAlign: "center" }} rowSpan={rowSpan}>
                    {data.metrics.score}
                  </td>
                </tr>
              );
              const remainingRows = data.variableInfos.map((vi, idx) => {
                if (idx === 0) return false;
                return (
                  <tr key={data.optionId + "-" + vi.variableId}>
                    <td>{vi.name}</td>
                    <td>
                      <CustomSlider
                        preventRenderOnNoValue={!vi.name}
                        value={vi.score}
                        style={{ marginBottom: "5px" }}
                        onHandleMove={(score) =>
                          onOptionScoreChange(
                            vi.variableId,
                            data.optionId,
                            score
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              });
              return (
                <>
                  {firstRow}
                  {remainingRows}
                </>
              );
            })}
          </tbody>
        </table>
      }
    />
  );
};

// [
//   // {
//   //     optionId: '1',
//   //     optionName: 'optionA'
//   //     variableInfos: [{id: '2', name: 'time', score: 4},{id: '3', name: 'money', score: 5}, ],
//   //     metrics: {
//   //         score: 34
//   //     }
//   // }
// ];
const mapStateToProps = (state) => {
  const currentDecisionId = state.controlState.decisionId;
  const { options, variables, decisions } = state.entities;
  const decision = decisions.byId[currentDecisionId];
  const { variableIds, optionIds } = decision;

  const optionStructs = optionIds.map((optId) => options.byId[optId]);
  const variableStructs = variableIds.map((vId) => variables.byId[vId]);
  const optionMetrics = calculate_metrics(optionStructs, variableStructs);

  const tableData = optionStructs.map((option) => {
    const { byId, allIds } = option.variableScores;
    const variableInfos = allIds
      .map((vId) => byId[vId])
      .map((variableScore) => {
        const variableId = variableScore.variableId;
        const name = variables.byId[variableId].name;
        const score = variableScore.score;
        return { variableId, name, score };
      });
    const optionId = option.id;
    const metrics = { score: optionMetrics[optionId] };
    const name = option.name;
    return { optionId, name, variableInfos, metrics };
  });
  return {
    tableData,
    decisionId: currentDecisionId,
  };
};

const actionCreators = {
  onOptionNameChange,
  onOptionScoreChange,
  onOptionCreate,
};

export default connect(
  mapStateToProps,
  actionCreators
)(VariablesOptionsMetricsTable);
