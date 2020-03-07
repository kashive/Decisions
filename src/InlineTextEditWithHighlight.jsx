import React, { Component } from "react";

import FroalaEditor from "react-froala-wysiwyg";
import styled from "styled-components";

const CustomStyle = styled.div`
  background-color: ${props => (props.isEditOn ? "white" : "unset")};
  padding: ${props => props.padding || "2px"};
  width: ${props =>
    props.width ||
    (props.isPlaceholderVisible ? props.placeholderTextWidth : "unset")};
  white-space: ${props => (props.multiLine ? "wrap" : "nowrap")};
`;

/**
 * This component wraps the FroalaEditor.
 * Puts some padding and dymaically adjusts the width in case of having a placeholder
 */
class InlineTextEditWithHighlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaceholderVisible: false,
      isEditOn: false
    };
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    if (!this.props.text) {
      this.setState({ isPlaceholderVisible: true });
    }
  }

  handleKeyUp = event => {
    const editor = this.getEditorFromReactRef();
    if (event.key === "Enter" && !this.props.multiLine) {
      this.handleEnter(editor);
    }
  };

  handleEnter = editor => {
    editor.edit.off();
    editor.edit.on();
    this.handleBlur();
    this.handlePlaceholderVisibleOnBlur(editor);
  };

  //todo: consolidate the setState to one call as it renders everytime
  handleFocus = () => {
    this.props.handleFocusOn();
    this.setState({ isEditOn: true });
    this.handlePlaceholderVisibleOnFocus(this.getEditorFromReactRef());
  };

  handleBlur = () => {
    this.props.handleFocusOff();
    this.setState({ isEditOn: false });
    this.handlePlaceholderVisibleOnBlur(this.getEditorFromReactRef());
  };

  handlePlaceholderVisibleOnFocus(editor) {
    if (editor.placeholder.isVisible()) {
      editor.html.set(this.props.placeholderText);
      editor.commands.selectAll();
      this.setState({ isPlaceholderVisible: false });
    }
  }

  handlePlaceholderVisibleOnBlur(editor) {
    if (editor.placeholder.isVisible()) {
      this.setState({ isPlaceholderVisible: true });
    }
  }

  getEditorFromReactRef() {
    return this.editorRef.current.editor;
  }

  render() {
    return (
      <CustomStyle
        isPlaceholderVisible={this.state.isPlaceholderVisible}
        placeholderTextWidth={this.props.placeholderTextWidth}
        padding={this.props.padding} //this ensures that the text does not touch the border
        width={this.props.width}
        multiLine={this.props.multiLine}
        isEditOn={this.state.isEditOn}
      >
        <FroalaEditor
          ref={this.editorRef}
          model={this.props.text}
          onModelChange={this.props.handleTextChange}
          config={{
            enter: "", //this disables the auto adding of the <p> tag
            multiLine: this.props.multiLine,
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
      </CustomStyle>
    );
  }
}

export default InlineTextEditWithHighlight;
