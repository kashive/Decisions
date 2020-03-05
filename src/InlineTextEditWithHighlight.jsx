import React, { Component } from "react";

import FroalaEditor from "react-froala-wysiwyg";
import styled from "styled-components";

const borderOnFocus = "solid 2px rgb(22, 21, 21)";
const borderOnHover = "solid 1px #dbdce0";

const Bordered = styled.div`
  padding: 5px;
  border-radius: 4px;
  font-weight: 400;
  color: black;
  display: inline-block;
  border: ${props => (props.isInFocus ? borderOnFocus : "none")};
  &:hover {
    border: ${props => (props.isInFocus ? borderOnFocus : borderOnHover)};
  }
`;

class InlineTextEditWithHighlight extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(event) {
    const editor = this.editorRef.current.editor;
    if (event.key === "Enter") {
      editor.edit.off();
      editor.edit.on();
      this.props.handleEnter();
    }
  }

  render() {
    return (
      <Bordered isInFocus={this.props.isInFocus}>
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
      </Bordered>
    );
  }
}

export default InlineTextEditWithHighlight;
