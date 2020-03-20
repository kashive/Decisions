import React, { Component } from "react";
import { connect } from "react-redux";
import CustomSlider from "./CustomSlider";
import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import "./table.less";
import styled from "styled-components";
import {
  onOptionScoreChange,
  onOptionScoreReasoningChange
} from "./redux/actions/optionScoreActions";

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
                  key={vs.variableScoreId}
                  isHighlightOn={
                    vs.variableScoreId === this.state.rowNumWithHighlight
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
                        vs.variableScoreId
                      )}
                    />
                  </td>
                  <td>
                    <BorderedInlineTextEdit
                      text={vs.reasoning}
                      placeholderText="Please explain the reasoning behind the score"
                      handleTextChange={this.props.onOptionScoreReasoningChange.bind(
                        this,
                        vs.variableScoreId
                      )}
                      padding="5px"
                      expandWithContent={false}
                      multiLine={true}
                      autoSelectOnFocus={false}
                      onBorderVisible={this.handleHighlightOn.bind(
                        this,
                        vs.variableScoreId
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
  const { options, variables, variableScores } = state.entities;

  const variableScoresTableData = options.allIds
    .filter(optId => optId === myProps.optionId)
    .map(id => options.byId[id].variableScores)
    .flat(1)
    .map(vsId => variableScores.byId[vsId])
    .map(vs => {
      const toReturn = {
        variableScoreId: vs.id,
        score: vs.score,
        reasoning: vs.reasoning,
        variableName: variables.byId[vs.variableId].name
      };
      return toReturn;
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
