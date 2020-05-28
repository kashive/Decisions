import React from "react";
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

export default function DecisionTitle({
  decisionTitle,
  onDecisionTitleChange,
}) {
  return (
    <StyledTitle>
      <InlineEditor
        data={decisionTitle}
        onChange={onDecisionTitleChange}
        placeholder="Untitled decision"
        expandWithContent={true}
        isSingleLine={true}
      />
    </StyledTitle>
  );
}
