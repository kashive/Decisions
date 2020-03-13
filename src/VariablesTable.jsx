import React, { Component } from "react";
import CustomSlider from "./CustomSlider";
import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import "./table.less";
import styled from "styled-components";
import { Button, Icon, Tooltip, Whisper, Modal } from "rsuite";

const HighlightableRow = styled.tr`
  background-color: ${props => (props.isHighlightOn ? "#f0f8ff" : "none")};
`;

const RemoveVariablePopUp = ({ isVisible, onCancel, onOk }) => {
  return (
    <Modal size="xs" show={isVisible} onHide={onCancel}>
      <Modal.Header>
        <Modal.Title>Modal Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please be aware that deleting a variable removes all the scores
          associated with this variable as well.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onOk} appearance="primary">
          Ok
        </Button>
        <Button onClick={onCancel} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
//todo: have variables table get state from redux later on
class VariablesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowNumWithHighlight: undefined,
      variableDeletePopUpOpen: false
    };
  }

  handleHighlightOn = rowId => {
    this.setState({ rowNumWithHighlight: rowId });
  };

  handleHighlightOff = () => {
    this.setState({ rowNumWithHighlight: undefined });
  };

  openRemoveVariablePopUp = () => {
    this.setState({ variableDeletePopUpOpen: true });
  };

  closeRemoveVariablePopUp = () => {
    this.setState({ variableDeletePopUpOpen: false });
  };

  handleDeleteVariable = variableId => {
    this.closeRemoveVariablePopUp();
    if (typeof this.props.handleVariableRemove === "function") {
      this.props.handleVariableRemove(variableId);
    }
  };

  render() {
    return (
      <div>
        <Button
          style={{ marginBottom: "15px" }}
          appearance="primary"
          onClick={this.props.handleAddNewVariable}
        >
          Add New Variable
        </Button>
        <table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Name</th>
              <th style={{ width: "30%" }}>Weight</th>
              <th style={{ width: "45%" }}>Description</th>
              <th style={{ borderLeft: "hidden" }}></th>
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
                  <td style={{ textAlign: "center" }}>
                    <Whisper
                      placement="top"
                      trigger="hover"
                      speaker={<Tooltip>Remove variable</Tooltip>}
                    >
                      <Icon
                        className="actionIcon"
                        icon="trash"
                        onClick={() =>
                          this.setState({ variableDeletePopUpOpen: true })
                        }
                      />
                    </Whisper>
                  </td>
                  <RemoveVariablePopUp
                    isVisible={this.state.variableDeletePopUpOpen}
                    onCancel={this.closeRemoveVariablePopUp}
                    onOk={this.handleDeleteVariable.bind(this, variable.id)}
                  />
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
