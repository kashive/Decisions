import React, { Component } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import styled from "styled-components";
import { connect } from "react-redux";
import { changeTitle } from "./redux/actions";

const CustomStyle = styled.div`
  background-color: ${props => (props.isEditOn ? "white" : "unset")};
  padding: ${props => props.padding || "2px"};
  width: ${props =>
    props.width ||
    (props.isPlaceholderVisible ? props.placeholderTextWidth : "unset")};
  white-space: ${props => (props.multiLine ? "wrap" : "nowrap")};
`;

const mapDispatchToProps = dispatch => {
  return {
    onTextChange: text => {
      console.log("onTextChange with text", text);
      dispatch(changeTitle(text));
    }
  };
};

class CustomInlineFroalaEditor extends Component {
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
    this.setState({ isEditOn: false });
    this.handlePlaceholderVisibleOnBlur(editor);
    if (typeof this.props.onEnter === "function") {
      this.props.onEnter();
    }
  };

  handleBlur = () => {
    this.setState({ isEditOn: false });
    this.handlePlaceholderVisibleOnBlur(this.getEditorFromReactRef());
    if (typeof this.props.onBlur === "function") {
      this.props.onBlur();
    }
  };

  //todo: consolidate the setState to one call as it renders everytime
  handleFocus = () => {
    this.setState({ isEditOn: true });
    this.handlePlaceholderVisibleOnFocus(this.getEditorFromReactRef());
    if (typeof this.props.onFocus === "function") {
      this.props.onFocus();
    }
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

  onModelChange = model => {
    console.log("onModelChange handler", model);
    this.props.handleTextChange();
  };

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
          onModelChange={this.props.onTextChange}
          config={{
            enter: "", //this disables the auto adding of the <p> tag
            multiLine: this.props.multiLine,
            toolbarInline: true,
            initOnClick: true,
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

export default connect(null, mapDispatchToProps)(CustomInlineFroalaEditor);
