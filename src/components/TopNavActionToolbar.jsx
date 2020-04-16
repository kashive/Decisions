import React from "react";
import {
  Button,
  ButtonToolbar,
  Icon,
  IconButton,
  Whisper,
  Tooltip,
} from "rsuite";
import CreateNewDecisionPopUp from "./CreateNewDecisionPopUp";
import {
  onDecisionCreate,
  onDecisionDelete,
} from "../redux/actions/decisionActions";
import { onChangeView } from "../redux/actions/viewActions";
import { connect } from "react-redux";
import ViewTypes from "../redux/viewTypes";

const TopNavActionToolbar = ({
  showAddNewDecision,
  addNewDecisionPopupActive,
  hideAddNewDecision,
  onDecisionCreate,
  onDecisionDelete,
  currentDecisionId,
  onChangeView,
  currentView,
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
        {currentDecisionId && (
          <Whisper
            placement="bottomStart"
            trigger="hover"
            speaker={<Tooltip>Switch to main view</Tooltip>}
          >
            <Button onClick={() => onChangeView(ViewTypes.MAIN)}>
              Main View
            </Button>
          </Whisper>
        )}
        {currentDecisionId && (
          <Whisper
            placement="bottomStart"
            trigger="hover"
            speaker={<Tooltip>Switch to table view</Tooltip>}
          >
            <Button onClick={() => onChangeView(ViewTypes.TABLE)}>
              Table View
            </Button>
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
  onChangeView,
};

const mapStateToProps = (state) => {
  const currentDecisionId = state.controlState.decisionId;
  const currentView = state.viewState.currentView;
  return {
    currentDecisionId,
    currentView,
  };
};

export default connect(mapStateToProps, actionCreators)(TopNavActionToolbar);
