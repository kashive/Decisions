import React, { Component } from "react";
import { connect } from "react-redux";
import CustomSlider from "./CustomSlider";
import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import "./table.less";
import styled from "styled-components";
import {
  onOptionScoreChange,
  onOptionScoreReasoningChange
} from "./redux/actions/optionActions";

const HighlightableRow = styled.tr`
  background-color: ${props => (props.isHighlightOn ? "#f0f8ff" : "none")};
`;
//todo: can potentially replace this with making the VariablesTable resuable
class OptionScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowNumWithHighlight: undefined
    };
  }

  handleHighlightOn = rowId => {
    this.setState({ rowNumWithHighlight: rowId });
  };

  handleHighlightOff = () => {
    this.setState({ rowNumWithHighlight: undefined });
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Variable</th>
              <th style={{ width: "30%" }}>Score</th>
              <th>Reasoning</th>
            </tr>
          </thead>
          <tbody>
            {this.props.variableScoresTableData.map(vs => {
              return (
                <HighlightableRow
                  key={vs.variableId}
                  isHighlightOn={
                    vs.variableId === this.state.rowNumWithHighlight
                  }
                >
                  <td>
                    <span
                      style={{ whiteSpace: "nowrap" }}
                      className="pointerOnHover"
                      onClick={this.props.scrollToVariableTable}
                    >
                      {vs.variableName}
                    </span>
                  </td>
                  <td>
                    <CustomSlider
                      value={vs.score}
                      onHandleMove={this.props.onOptionScoreChange.bind(
                        this,
                        vs.variableId,
                        this.props.optionId
                      )}
                    />
                  </td>
                  <td>
                    <BorderedInlineTextEdit
                      text={vs.reasoning}
                      placeholderText="Please explain the reasoning behind the score"
                      handleTextChange={this.props.onOptionScoreReasoningChange.bind(
                        this,
                        vs.variableId,
                        this.props.optionId
                      )}
                      padding="5px"
                      expandWithContent={false}
                      multiLine={true}
                      autoSelectOnFocus={false}
                      onBorderVisible={this.handleHighlightOn.bind(
                        this,
                        vs.variableId
                      )}
                      onBorderInvisible={this.handleHighlightOff}
                    />
                  </td>
                </HighlightableRow>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, myProps) => {
  const { options, variables } = state.entities;
  const variableScores = options.byId[myProps.optionId].variableScores;
  const variableScoresTableData = variableScores.allIds.map(variableId => {
    const variableScore = variableScores.byId[variableId];
    return {
      variableId,
      variableName: variables.byId[variableId].name,
      score: variableScore.score,
      reasoning: variableScore.reasoning
    };
  });

  return {
    variableScoresTableData
  };
};

const actionCreators = {
  onOptionScoreChange,
  onOptionScoreReasoningChange
};

export default connect(mapStateToProps, actionCreators)(OptionScores);
