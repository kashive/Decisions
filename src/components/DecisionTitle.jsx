import React from "react";
import styled from "styled-components";
import BorderedInlineTextEdit from "../BorderedInlineTextEdit";

const StyledTitle = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 18px;
  max-width: 78vw;
  overflow: hidden; //ensures that the overflow hides after max-width is hit
`;

export default function DecisionTitle({
  decisionTitle,
  onDecisionTitleChange
}) {
  return (
    <StyledTitle>
      <BorderedInlineTextEdit
        text={decisionTitle}
        placeholderText="Untitled decision"
        placeholderTextWidth="150px"
        padding="5px"
        multiLine={false}
        handleTextChange={onDecisionTitleChange}
        expandWithContent={true}
        autoFocusOnInit={true}
      />
    </StyledTitle>
  );
}
