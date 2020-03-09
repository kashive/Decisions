import React, { Component } from "react";
import CustomBorder from "./CustomBorder";
import CustomInlineFroalaEditor from "./CustomInlineFroalaEditor";

/**
 * This component wraps the FroalaEditor and CustomBorder to add border to the InLineTextEditor
 * Puts some padding and dymaically adjusts the width in case of having a placeholder
 */

class BorderedInlineTextEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInFocus: false
    };
  }

  render() {
    return (
      <CustomBorder
        expandWithContent={this.props.expandWithContent}
        isInFocus={this.state.isInFocus}
      >
        <CustomInlineFroalaEditor
          onEnter={() => this.setState({ isInFocus: false })}
          onFocus={() => this.setState({ isInFocus: true })}
          onBlur={() => this.setState({ isInFocus: false })}
          {...this.props}
        />
      </CustomBorder>
    );
  }
}

export default BorderedInlineTextEdit;
