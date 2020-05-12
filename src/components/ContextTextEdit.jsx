import React from "react";
import Card from "./shared/Card";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const ContextCard = ({ model, onChange }) => (
  <Card
    title="Context"
    body={
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder:
            "Why do you need to make this decision? What triggred it? Why is this important?",
        }}
        data={model}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    }
    dropdownConfig={{
      enableDropdown: true,
      enableFullscreen: true,
      enableCollapse: true,
    }}
  />
);
