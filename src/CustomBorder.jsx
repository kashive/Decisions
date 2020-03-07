import React, { Component } from "react";
import styled from "styled-components";

const DEFAULT_BORDER_ON_FOCUS = "solid 2px rgb(22, 21, 21)";
const DEFAULT_BORDER_ON_HOVER = "solid 1px #dbdce0";
const PADDING_DEFAULT = "5px";

const BorderFocusHover = styled.div`
  display: inline-block; //this ensures that the border expands according to the width of the children, so, it's always enclosing
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
class CustomBorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInFocus: false
    };
  }

  handleFocusOn = () => this.setState({ isInFocus: true });
  handleFocusOff = () => this.setState({ isInFocus: false });

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        handleFocusOn: this.handleFocusOn,
        handleFocusOff: this.handleFocusOff
      })
    );
    return (
      <BorderFocusHover
        isInFocus={this.state.isInFocus}
        borderOnFocus={this.props.borderOnFocus || DEFAULT_BORDER_ON_FOCUS}
        borderOnHover={this.props.borderOnHover || DEFAULT_BORDER_ON_HOVER}
        padding={this.props.padding || PADDING_DEFAULT}
      >
        {childrenWithProps}
      </BorderFocusHover>
    );
  }
}

export default CustomBorder;
