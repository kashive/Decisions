import React, { Component } from "react";
import { connect } from "react-redux";
import CustomSlider from "./shared/CustomSlider";
import InlineEditor from "./shared/InlineEditor";
import "../styles/table.less";
import styled from "styled-components";
import {
  onOptionScoreChange,
  onOptionScoreReasoningChange,
} from "../redux/actions/optionActions";

const HighlightableRow = styled.tr`
  background-color: ${(props) => (props.isHighlightOn ? "#f0f8ff" : "none")};
`;
//todo: can potentially replace this with making the VariablesTable resuable
class OptionScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowNumWithHighlight: undefined,
    };
  }

  handleHighlightOn = (rowId) => {
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
            {this.props.variableScoresTableData.map((vs) => {
              return (
                <HighlightableRow
                  key={vs.variableId}
                  isHighlightOn={
                    vs.variableId === this.state.rowNumWithHighlight
                  }
                >
                  <td>
                    <span
                      className="pointerOnHover"
                      onClick={this.props.scrollToVariableTable}
                      //this is required in order to render html as text safely
                      //see: https://stackoverflow.com/questions/56928946/how-to-display-the-saved-content-of-ckeditor5-in-react-js
                      dangerouslySetInnerHTML={{ __html: vs.variableName }}
                    />
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
                    <InlineEditor
                      data={vs.reasoning}
                      onChange={this.props.onOptionScoreReasoningChange.bind(
                        this,
                        vs.variableId,
                        this.props.optionId
                      )}
                      placeholder="Please explain the reasoning behind the score"
                      onFocus={this.handleHighlightOn.bind(this, vs.variableId)}
                      onBlur={this.handleHighlightOff}
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
  const variableScoresTableData = variableScores.allIds.map((variableId) => {
    const variableScore = variableScores.byId[variableId];
    return {
      variableId,
      variableName: variables.byId[variableId].name,
      score: variableScore.score,
      reasoning: variableScore.reasoning,
    };
  });

  return {
    variableScoresTableData,
  };
};

const actionCreators = {
  onOptionScoreChange,
  onOptionScoreReasoningChange,
};

export default connect(mapStateToProps, actionCreators)(OptionScores);
