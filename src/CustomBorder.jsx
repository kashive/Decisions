import React from "react";
import styled from "styled-components";

const DEFAULT_BORDER_ON_FOCUS = "solid 2px rgb(22, 21, 21)";
const DEFAULT_BORDER_ON_HOVER = "solid 1px #dbdce0";
const PADDING_DEFAULT = "5px";

const BorderStyling = styled.div`
  display: ${props => (props.expandWithContent ? "inline-block" : "block")};
  overflow: hidden;
  border: ${props => (props.isInFocus ? props.borderOnFocus : "none")};
  &:hover {
    border: ${props =>
      props.isInFocus ? props.borderOnFocus : props.borderOnHover};
  }
`;

/**
 * Puts a configurable border around the children elements
 */

function CustomBorder(props) {
  return (
    <BorderStyling
      isInFocus={props.isInFocus}
      borderOnFocus={props.borderOnFocus || DEFAULT_BORDER_ON_FOCUS}
      borderOnHover={props.borderOnHover || DEFAULT_BORDER_ON_HOVER}
      padding={props.padding || PADDING_DEFAULT}
      expandWithContent={props.expandWithContent}
    >
      {props.children}
    </BorderStyling>
  );
}

export default CustomBorder;
