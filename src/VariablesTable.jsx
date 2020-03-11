import React, { Component } from "react";
import CustomSlider from "./CustomSlider";
import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import "./table.less";
import styled from "styled-components";
import { Button } from "rsuite";

const HighlightableRow = styled.tr`
  background-color: ${props => (props.isHighlightOn ? "#f0f8ff" : "none")};
`;
//todo: have variables table get state from redux later on
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
      <div>
        <Button
          style={{ display: "block", margin: "0 auto", marginBottom: "10px" }}
          appearance="primary"
          onClick={this.props.handleAddNewVariable}
        >
          Add Variables
        </Button>
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
                      handleTextChange={this.props.handleNameChange.bind(
                        this,
                        variable.id
                      )}
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
                    <CustomSlider
                      value={variable.weight}
                      onHandleMove={this.props.onHandleMove.bind(
                        this,
                        variable.id
                      )}
                    />
                  </td>
                  <td>
                    <BorderedInlineTextEdit
                      text={variable.description}
                      placeholderText="Description"
                      handleTextChange={this.props.handleDescriptionChange.bind(
                        this,
                        variable.id
                      )}
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
      </div>
    );
  }
}

export default VariablesTable;
