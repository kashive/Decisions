import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import CKEDITOR from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import { useState } from "react";

const BorderOnHover = styled.div`
  display: ${(props) => (props.expandWithContent ? "inline-block" : "block")};
  background-color: ${(props) => (props.isInFocus ? "white" : "inherit")};
  &:hover {
    border: ${(props) => (props.isInFocus ? "none" : "solid 1px #dbdce0")};
  }
`;

const InlineEditor = ({
  data,
  onChange,
  expandWithContent,
  isSingleLine,
  placeholder,
  onFocus,
  onBlur,
}) => {
  const [editorInFocus, setEditorInFocus] = useState(false);
  return (
    <BorderOnHover
      isInFocus={editorInFocus}
      expandWithContent={expandWithContent}
    >
      <CKEditor
        editor={
          isSingleLine
            ? CKEDITOR.SingleLineNoFormattingEditor
            : CKEDITOR.BalloonEditor
        }
        config={{
          placeholder: placeholder,
          toolbar: isSingleLine
            ? []
            : [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "indent",
                "outdent",
                "|",
                "blockQuote",
                "undo",
                "redo",
              ],
          enterMode: undefined,
        }}
        data={data}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        onFocus={(event, editor) => {
          const data = editor.getData();
          if (data === "" && placeholder) {
            editor.setData(placeholder);
            editor.execute("selectAll");
          }
          setEditorInFocus(true);
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          setEditorInFocus(false);
          if (onBlur) onBlur();
        }}
      />
    </BorderOnHover>
  );
};

export default InlineEditor;
