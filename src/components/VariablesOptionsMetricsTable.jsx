import React, { useState } from "react";

import { connect } from "react-redux";
import {
  onOptionNameChange,
  onOptionCreate,
  onOptionScoreChange,
  onOptionRemove,
} from "../redux/actions/optionActions";
import { calculate_metrics } from "../calculation/MetricsCalculation";
import Card from "./shared/Card";
import CustomSlider from "./shared/CustomSlider";
import { EditableOptionTitle } from "./Option";
import { CustomDropdown } from "./shared/CustomDropdown";
import { onChangeView } from "../redux/actions/viewActions";
import ViewTypes from "../redux/viewTypes";
import { CardFocus } from "./shared/Card";
import Option from "./Option";
import { produce } from "immer";

const VariablesOptionsMetricsTable = ({
  decisionId,
  onOptionNameChange,
  onOptionScoreChange,
  onOptionCreate,
  onOptionRemove,
  onChangeView,
  optionIds,
  tableData,
}) => {
  const [fullscreenInfo, setFullscreenInfo] = useState({});

  const setFullscreenInfoForOption = (optionId, isVisible) => {
    setFullscreenInfo(
      produce(fullscreenInfo, (draft) => {
        draft[optionId] = isVisible;
      })
    );
  };
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
          {optionIds.map((optionId) => {
            const rows = tableData[optionId].map((data) => {
              if (data.isFirst) {
                return (
                  <tr key={data.optionId + "-" + data.variableId}>
                    <td rowSpan={data.rowSpan}>
                      <EditableOptionTitle
                        headerText={data.optionName}
                        onNameChange={(name) =>
                          onOptionNameChange(data.optionId, name)
                        }
                      />
                    </td>
                    <td
                      dangerouslySetInnerHTML={{ __html: data.variableName }}
                    ></td>
                    <td>
                      <CustomSlider
                        preventRenderOnNoValue={!data.variableName}
                        value={data.score}
                        style={{ marginBottom: "5px" }}
                        onHandleMove={(score) =>
                          onOptionScoreChange(
                            data.variableId,
                            data.optionId,
                            score
                          )
                        }
                      />
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        position: "relative",
                        overflow: "visible",
                      }}
                      rowSpan={data.rowSpan}
                    >
                      {data.metrics.score}
                      <CustomDropdown
                        iconText="ellipsis-v"
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                        }}
                        config={[
                          {
                            text: "Remove option",
                            onClick: () =>
                              onOptionRemove(data.optionId, decisionId),
                          },
                          {
                            text: "See in main view",
                            onClick: () => {
                              const sectionId = "3"; //hard coding for the time being
                              onChangeView(
                                ViewTypes.MAIN,
                                sectionId,
                                data.optionId
                              );
                            },
                          },
                          {
                            text: "Fullscreen",
                            onClick: () => {
                              setFullscreenInfoForOption(data.optionId, true);
                            },
                          },
                        ]}
                      />
                    </td>
                    <CardFocus
                      onCancel={() =>
                        setFullscreenInfoForOption(data.optionId, false)
                      }
                      isVisible={fullscreenInfo[data.optionId]}
                      content={
                        <Option
                          optionId={data.optionId}
                          enableFullscreen={false}
                        />
                      }
                    />
                  </tr>
                );
              }
              return (
                <tr key={data.optionId + "-" + data.variableId}>
                  <td
                    dangerouslySetInnerHTML={{ __html: data.variableName }}
                  ></td>
                  <td>
                    <CustomSlider
                      preventRenderOnNoValue={!data.variableName}
                      value={data.score}
                      style={{ marginBottom: "5px" }}
                      onHandleMove={(score) =>
                        onOptionScoreChange(
                          data.variableId,
                          data.optionId,
                          score
                        )
                      }
                    />
                  </td>
                </tr>
              );
            });
            return <tbody key={optionId}>{rows}</tbody>;
          })}
        </table>
      }
    />
  );
};

//data format:
// {
//   isFirst: true
//   optionId: "39499c5d-d0ee-4f2e-be02-c58daad88915"
//   optionName: "asdf"
//   rowSpan: 2
//   variableId: "8bf7ee11-f60a-4a0e-985d-7f8733b7f2bd"
//   variableName: "gvsafdas"
//   score: 3
//   metrics: {score: 39}
// }

const mapStateToProps = (state) => {
  const currentDecisionId = state.controlState.decisionId;
  const { options, variables, decisions } = state.entities;
  const decision = decisions.byId[currentDecisionId];
  const { variableIds, optionIds } = decision;

  const optionStructs = optionIds.map((optId) => options.byId[optId]);
  const variableStructs = variableIds.map((vId) => variables.byId[vId]);
  const optionMetrics = calculate_metrics(optionStructs, variableStructs);

  const tableData = optionStructs
    .map((option) => {
      const { byId, allIds } = option.variableScores;
      const optionId = option.id;
      const metrics = { score: optionMetrics[optionId] };
      const optionName = option.name;
      if (allIds === undefined || allIds.length === 0) {
        return [{ isFirst: true, optionId, optionName, rowSpan: 1, metrics }];
      }
      const rowSpan = allIds.length;
      return allIds
        .map((vId, idx) => [idx, byId[vId]])
        .map((variableScoreIdx) => {
          const variableScore = variableScoreIdx[1];
          const variableId = variableScore.variableId;
          const variableName = variables.byId[variableId].name;
          const score = variableScore.score;
          const index = variableScoreIdx[0];
          return {
            isFirst: index === 0,
            optionId,
            optionName,
            rowSpan,
            variableId,
            variableName,
            score,
            metrics,
          };
        });
    })
    .flat(1)
    .reduce((obj, item) => {
      const value = obj[item.optionId] || [];
      value.push(item);
      obj[item.optionId] = value;
      return obj;
    }, {});
  return {
    optionIds,
    tableData,
    decisionId: currentDecisionId,
  };
};

const actionCreators = {
  onOptionNameChange,
  onOptionScoreChange,
  onOptionCreate,
  onOptionRemove,
  onChangeView,
};

export default connect(
  mapStateToProps,
  actionCreators
)(VariablesOptionsMetricsTable);
