import React from "react";
import Card from "./shared/Card";
import FroalaEditor from "react-froala-wysiwyg";

export const ContextCard = ({ model, onChange }) => (
  <Card
    title="Context"
    body={
      <FroalaEditor
        model={model}
        onModelChange={onChange}
        fontSizeDefaultSelection={12}
        config={{
          placeholderText:
            "Why do you need to make this decision? What triggred it? Why is this important?",
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
