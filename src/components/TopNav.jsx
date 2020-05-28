import React from "react";
import DecisionTitle from "./DecisionTitle";
import { Header } from "rsuite";
import TopNavActionToolbar from "./TopNavActionToolbar";

export const TopNavHeight = 95;

const TopNav = ({
  decision,
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
      <DecisionTitle />
      <TopNavActionToolbar
        style={{ borderTop: "1px solid #dbdce0" }}
        showAddNewDecision={showAddNewDecision}
        addNewDecisionPopupActive={addNewDecisionPopupActive}
        hideAddNewDecision={hideAddNewDecision}
      />
    </Header>
  );
};

export default TopNav;
