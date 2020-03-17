import React, { Component } from "react";
import CustomSlider from "./CustomSlider";
import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import "./table.less";
import styled from "styled-components";

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
            {(this.props.variableScores || []).map(variableScore => {
              return (
                <HighlightableRow
                  key={variableScore.variableId}
                  isHighlightOn={
                    variableScore.variableId === this.state.rowNumWithHighlight
                  }
                >
                  <td>
                    <span
                      className="pointerOnHover"
                      onClick={this.props.scrollToVariableTable}
                    >
                      {variableScore.variableName}
                    </span>
                  </td>
                  <td>
                    <CustomSlider
                      value={variableScore.score}
                      onHandleMove={this.props.onScoreChange.bind(
                        this,
                        this.props.optionId,
                        variableScore.variableId
                      )}
                    />
                  </td>
                  <td>
                    <BorderedInlineTextEdit
                      text={variableScore.reasoning}
                      placeholderText="Please explain the reasoning behind the score"
                      handleTextChange={this.props.onScoreReasoningChange.bind(
                        this,
                        this.props.optionId,
                        variableScore.variableId
                      )}
                      padding="5px"
                      expandWithContent={false}
                      multiLine={true}
                      autoSelectOnFocus={false}
                      onBorderVisible={this.handleHighlightOn.bind(
                        this,
                        variableScore.variableId
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

export default OptionScores;
