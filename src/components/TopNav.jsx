import React from "react";
import DecisionTitle from "./DecisionTitle";
import { onDecisionTitleChange } from "../redux/actions/decisionActions";
import { Header } from "rsuite";
import { connect } from "react-redux";
import TopNavActionToolbar from "./TopNavActionToolbar";

export const TopNavHeight = 95;

const TopNav = ({
  decision,
  onDecisionTitleChange,
  showAddNewDecision,
  addNewDecisionPopupActive,
  hideAddNewDecision,
}) => {
  return (
    <Header
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #dbdce0",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 11,
        height: decision ? TopNavHeight + "px" : "auto",
      }}
    >
      {decision && (
        <DecisionTitle
          decisionTitle={decision.title}
          onDecisionTitleChange={(title) => {
            onDecisionTitleChange(decision.id, title);
          }}
        />
      )}
      <TopNavActionToolbar
        style={{ borderTop: "1px solid #dbdce0" }}
        showAddNewDecision={showAddNewDecision}
        addNewDecisionPopupActive={addNewDecisionPopupActive}
        hideAddNewDecision={hideAddNewDecision}
      />
    </Header>
  );
};

const actionCreators = {
  onDecisionTitleChange,
};

export default connect(null, actionCreators)(TopNav);
