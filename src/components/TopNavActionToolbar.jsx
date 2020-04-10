import React from "react";
import { ButtonToolbar, Icon, IconButton, Whisper, Tooltip } from "rsuite";
import CreateNewDecisionPopUp from "./CreateNewDecisionPopUp";
import {
  onDecisionCreate,
  onDecisionDelete,
} from "../redux/actions/decisionActions";
import { connect } from "react-redux";

const TopNavActionToolbar = ({
  showAddNewDecision,
  addNewDecisionPopupActive,
  hideAddNewDecision,
  onDecisionCreate,
  onDecisionDelete,
  currentDecisionId,
  style,
}) => {
  const createDecisionHidePopUp = (title) => {
    onDecisionCreate(title);
    hideAddNewDecision();
  };
  return (
    <>
      <ButtonToolbar style={style}>
        <Whisper
          placement="bottomStart"
          trigger="hover"
          speaker={<Tooltip>Add New Decision</Tooltip>}
        >
          <IconButton
            onClick={showAddNewDecision}
            className="actionIcon"
            icon={<Icon style={{ color: "black" }} icon="plus-circle" />}
            size="sm"
            appearance="link"
          />
        </Whisper>
        {currentDecisionId && (
          <Whisper
            placement="bottomStart"
            trigger="hover"
            speaker={<Tooltip>Delete current decision</Tooltip>}
          >
            <IconButton
              onClick={() => onDecisionDelete(currentDecisionId)}
              className="actionIcon"
              icon={<Icon style={{ color: "black" }} icon="trash" />}
              size="sm"
              appearance="link"
            />
          </Whisper>
        )}
      </ButtonToolbar>
      <CreateNewDecisionPopUp
        isVisible={addNewDecisionPopupActive}
        onCreate={createDecisionHidePopUp}
        onCancel={hideAddNewDecision}
      />
    </>
  );
};

const actionCreators = {
  onDecisionCreate,
  onDecisionDelete,
};

const mapStateToProps = (state) => {
  const currentDecisionId = state.controlState.decisionId;
  return {
    currentDecisionId,
  };
};

export default connect(mapStateToProps, actionCreators)(TopNavActionToolbar);
