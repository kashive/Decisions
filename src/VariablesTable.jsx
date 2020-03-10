import React, { Component } from "react";
import CustomSlider from "./CustomSlider";
import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import "./table.less";
import styled from "styled-components";

const HighlightableRow = styled.tr`
  background-color: ${props => (props.isHighlightOn ? "#f0f8ff" : "none")};
`;
class VariablesTable extends Component {
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
      <table>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "40%" }}>Weight</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {(this.props.variables || []).map(variable => {
            return (
              <HighlightableRow
                key={variable.id}
                isHighlightOn={variable.id === this.state.rowNumWithHighlight}
              >
                <td>
                  <BorderedInlineTextEdit
                    text={variable.name}
                    placeholderText="Name"
                    placeholderTextWidth="50px"
                    padding="5px"
                    expandWithContent={false}
                    multiLine={false}
                    onBorderVisible={this.handleHighlightOn.bind(
                      this,
                      variable.id
                    )}
                    onBorderInvisible={this.handleHighlightOff}
                  />
                </td>
                <td>
                  <CustomSlider value={variable.weight} />
                </td>
                <td>
                  <BorderedInlineTextEdit
                    text={variable.description}
                    placeholderText="Description"
                    padding="5px"
                    expandWithContent={false}
                    multiLine={true}
                  />
                </td>
              </HighlightableRow>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default VariablesTable;
