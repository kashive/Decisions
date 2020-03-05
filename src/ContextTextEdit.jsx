import React, { Component } from "react";
import FroalaEditor from "react-froala-wysiwyg";

class ContextTextEdit extends Component {
  render() {
    return (
      <FroalaEditor
        model={this.props.model}
        onModelChange={this.props.handleContextChange}
        config={{
          placeholderText:
            "Why do you need to make this decision? What triggred it? Why is this important?"
        }}
      />
    );
  }
}

export default ContextTextEdit;
