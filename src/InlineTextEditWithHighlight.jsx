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
  width: ${props =>
    props.isPlaceholderVisible ? props.placeholderTextWidth : "inherit"};
  display: inline-block;
  border: ${props => (props.isInFocus ? borderOnFocus : "none")};
  &:hover {
    border: ${props => (props.isInFocus ? borderOnFocus : borderOnHover)};
  }
`;

class InlineTextEditWithHighlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInFocus: false,
      isPlaceholderVisible: false
    };
    this.editorRef = React.createRef();
  }

  handleKeyUp = event => {
    const editor = this.getEditorFromReactRef();
    if (event.key === "Enter") {
      this.handleEnter(editor);
    }
  };

  handleEnter = editor => {
    editor.edit.off();
    editor.edit.on();
    this.handleBlur();
    this.handlePlaceholderVisible(editor);
  };

  handleFocus = () => {
    this.setState({ isInFocus: true });
  };

  handleBlur = () => {
    this.setState({ isInFocus: false });
    this.handlePlaceholderVisible(this.getEditorFromReactRef());
  };

  handlePlaceholderVisible(editor) {
    if (editor.placeholder.isVisible()) {
      this.setState({ isPlaceholderVisible: true });
    }
  }

  getEditorFromReactRef() {
    return this.editorRef.current.editor;
  }

  render() {
    return (
      <Bordered
        isInFocus={this.state.isInFocus}
        isPlaceholderVisible={this.state.isPlaceholderVisible}
        placeholderTextWidth={this.props.placeholderTextWidth}
      >
        <FroalaEditor
          ref={this.editorRef}
          model={this.props.text}
          onModelChange={this.props.handleTextChange}
          config={{
            enter: "", //this disables the auto adding of the <p> tag
            multiLine: false,
            toolbarInline: true,
            toolbarButtons: [],
            placeholderText: this.props.placeholderText,
            events: {
              blur: this.handleBlur,
              keyup: this.handleKeyUp,
              click: this.handleFocus
            }
          }}
        />
      </Bordered>
    );
  }
}

export default InlineTextEditWithHighlight;
