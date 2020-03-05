import React, { Component } from "react";

import FroalaEditor from "react-froala-wysiwyg";

import "./InlineTextEditWithHighlight.less";

class InlineTextEditWithHighlight extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(event) {
    if (event.key === "Enter") {
      const editor = this.editorRef.current.editor;
      editor.edit.off();
      editor.edit.on();
      this.props.handleEnter();
    }
  }

  render() {
    return (
      <div className="title-input-container">
        <div className={this.props.classNames}>
          <FroalaEditor
            ref={this.editorRef}
            model={this.props.model}
            onModelChange={this.props.handleTitleChange}
            config={{
              enter: "", //this disables the auto adding of the <p> tag
              multiLine: false,
              toolbarInline: true,
              toolbarButtons: [],
              placeholderText: "Untitled Decision",
              events: {
                blur: this.props.handleTitleBlur,
                keyup: this.handleKeyUp,
                click: this.props.handleTitleFocus
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default InlineTextEditWithHighlight;
