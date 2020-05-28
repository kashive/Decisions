import React from "react";
import { onDecisionTitleChange } from "../redux/actions/decisionActions";
import { connect } from "react-redux";
import styled from "styled-components";
import InlineEditor from "./shared/InlineEditor";

const StyledTitle = styled.div`
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 0.5;
  max-width: 95%;
  white-space: nowrap;
  overflow: hidden; //ensures that the overflow hides after max-width is hit
`;

const DecisionTitle = ({
  decisionId,
  decisionTitle,
  onDecisionTitleChange,
}) => {
  if (!decisionId) return null;
  return (
    <StyledTitle>
      <InlineEditor
        data={decisionTitle}
        onChange={onDecisionTitleChange.bind(this, decisionId)}
        placeholder="Untitled decision"
        expandWithContent={true}
        isSingleLine={true}
      />
    </StyledTitle>
  );
};

const mapStateToProps = (state) => {
  const decisions = state.entities.decisions;
  const decisionId = state.controlState.decisionId;
  const decision = decisions.byId[decisionId];
  const decisionTitle = decisionId && decision.title;
  return {
    decisionId,
    decisionTitle,
  };
};

const actionCreators = {
  onDecisionTitleChange,
};

export default connect(mapStateToProps, actionCreators)(DecisionTitle);
