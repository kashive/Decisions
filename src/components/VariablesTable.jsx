import React, { Component } from "react";
import CustomSlider from "./shared/CustomSlider";
import Card from "./shared/Card";
import BorderedInlineTextEdit from "./shared/BorderedInlineTextEdit";
import "../styles/table.less";
import styled from "styled-components";
import { Button, Icon, Tooltip, Whisper, Modal } from "rsuite";
import {
  onVariableCreate,
  onVariableRemove,
  onVariableNameChange,
  onVariableDescriptionChange,
  onVariableWeightChange,
} from "../redux/actions/variableActions";
import { connect } from "react-redux";

const HighlightableRow = styled.tr`
  background-color: ${(props) => (props.isHighlightOn ? "#f0f8ff" : "none")};
`;

const RemoveVariablePopUp = ({ isVisible, onCancel, onOk }) => {
  return (
    <Modal size="xs" show={isVisible} onHide={onCancel}>
      <Modal.Header>
        <Modal.Title>Are you sure you want to remove?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We found some scores relating to this variable. <br />
          <br />
          Please be aware that deleting a variable removes all the scores
          associated with the variable as well.
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
      variableDeletePopUpOpen: false,
    };
  }

  handleHighlightOn = (rowId) => {
    this.setState({ rowNumWithHighlight: rowId });
  };

  handleHighlightOff = () => {
    this.setState({ rowNumWithHighlight: undefined });
  };

  openRemoveVariablePopUp = (variableId) => {
    if (!this.props.variableIdRemovalConsent[variableId]) {
      this.props.onVariableRemove(this.props.currentDecisionId, variableId);
    } else {
      this.setState({ variableDeletePopUpOpen: true });
    }
  };

  closeRemoveVariablePopUp = () => {
    this.setState({ variableDeletePopUpOpen: false });
  };

  onVariableRemovePromptOkClick = (decisionId, variableId) => {
    this.props.onVariableRemove(decisionId, variableId);
    this.closeRemoveVariablePopUp();
  };

  render() {
    const currentDecisionId = this.props.currentDecisionId;
    const { byId, allIds } = this.props.variables;
    return (
      <Card
        title="Variables"
        body={
          <table>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Name</th>
                <th style={{ width: "30%" }}>Weight</th>
                {!this.props.hideDescription && (
                  <th style={{ width: "45%" }}>Description</th>
                )}
                {!this.props.hideRemoveVariable && (
                  <th style={{ borderLeft: "hidden" }}></th>
                )}
              </tr>
            </thead>
            <tbody>
              {allIds
                .map((id) => byId[id])
                .filter((variable) => variable.decisionId === currentDecisionId) //todo: get variable ids directly from decision
                .map((variable) => {
                  return (
                    <HighlightableRow
                      key={variable.id}
                      isHighlightOn={
                        variable.id === this.state.rowNumWithHighlight
                      }
                    >
                      <td>
                        <BorderedInlineTextEdit
                          text={variable.name}
                          handleTextChange={this.props.onVariableNameChange.bind(
                            this,
                            variable.id
                          )}
                          placeholderText="Name"
                          autoSelectOnFocus={false}
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
                          onHandleMove={this.props.onVariableWeightChange.bind(
                            this,
                            variable.id
                          )}
                        />
                      </td>
                      {!this.props.hideDescription && (
                        <td>
                          <BorderedInlineTextEdit
                            text={variable.description}
                            placeholderText="Description"
                            handleTextChange={this.props.onVariableDescriptionChange.bind(
                              this,
                              variable.id
                            )}
                            padding="5px"
                            expandWithContent={false}
                            multiLine={true}
                          />
                        </td>
                      )}
                      {!this.props.hideRemoveVariable && (
                        <>
                          <td style={{ textAlign: "center" }}>
                            <Whisper
                              placement="top"
                              trigger="hover"
                              speaker={<Tooltip>Remove variable</Tooltip>}
                            >
                              <Icon
                                className="actionIcon"
                                icon="trash"
                                onClick={this.openRemoveVariablePopUp.bind(
                                  this,
                                  variable.id
                                )}
                              />
                            </Whisper>
                          </td>
                          <RemoveVariablePopUp
                            isVisible={this.state.variableDeletePopUpOpen}
                            onCancel={this.closeRemoveVariablePopUp}
                            onOk={this.onVariableRemovePromptOkClick.bind(
                              this,
                              currentDecisionId,
                              variable.id
                            )}
                          />
                        </>
                      )}
                    </HighlightableRow>
                  );
                })}
            </tbody>
          </table>
        }
        dropdownConfig={{
          enableDropdown: true,
          enableFullscreen: true,
          enableCollapse: true,
          additionalDropdowns: [
            {
              text: "Add new variable",
              onClick: this.props.onVariableCreate.bind(
                this,
                currentDecisionId
              ),
            },
          ],
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const variables = state.entities.variables;
  const currentDecisionId = state.controlState.decisionId;
  const allOptions = state.entities.options.allIds;
  const byOption = state.entities.options.byId;

  const variableIdRemovalConsent = state.entities.variables.allIds
    .map((variableId) => {
      const optionHasScoreForVariableId =
        allOptions
          .map((optId) => byOption[optId])
          .filter((option) => variableId in option.variableScores.byId)
          .filter((option) => option.variableScores.byId[variableId].score)
          .length > 0;
      return {
        [variableId]: optionHasScoreForVariableId,
      };
    })
    .reduce((obj, item) => Object.assign(obj, item), {});
  return {
    variables,
    currentDecisionId,
    variableIdRemovalConsent,
  };
};

const actionCreators = {
  onVariableCreate,
  onVariableRemove,
  onVariableNameChange,
  onVariableDescriptionChange,
  onVariableWeightChange,
};

export default connect(mapStateToProps, actionCreators)(VariablesTable);
