import React from "react";
import { connect } from "react-redux";
import InlineEditor from "./shared/InlineEditor";
import OptionScores from "./OptionScores";
import Card from "./shared/Card";
import CKEditor from "@ckeditor/ckeditor5-react";
import CKEDITOR from "@ckeditor/ckeditor5-build-classic";
import {
  onOptionNameChange,
  onOptionDescriptionChange,
  onOptionRemove,
} from "../redux/actions/optionActions";

export const EditableOptionTitle = ({ headerText, onNameChange }) => {
  return (
    <InlineEditor
      data={headerText}
      onChange={onNameChange}
      placeholder="Option Name"
      isSingleLine={true}
    />
  );
};

function Option(props) {
  const option = props.option;
  if (!option) return false; //todo: fix this later: https://app.asana.com/0/1166509149726089/1168928353343516/f
  return (
    <Card
      backgroundColor="#f8f9fa"
      dropdownConfig={{
        enableFullscreen:
          props.enableFullscreen !== undefined ? props.enableFullscreen : true,
        enableCollapse: true,
        additionalDropdowns: [
          {
            text: "Remove",
            onClick: props.onOptionRemove.bind(
              this,
              option.id,
              option.decisionId
            ),
          },
        ],
      }}
      title={
        <EditableOptionTitle
          headerText={option.name}
          onNameChange={props.onOptionNameChange.bind(this, option.id)}
        />
      }
      body={
        <>
          <Card
            dropdownConfig={{
              enableFullscreen: true,
              enableCollapse: true,
            }}
            title="Description"
            body={
              <CKEditor
                editor={CKEDITOR.ClassicEditor}
                config={{
                  placeholder: "Tell us more about the option",
                }}
                data={option.description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  props.onOptionDescriptionChange(option.id, data);
                }}
              />
            }
          />
          <Card
            dropdownConfig={{
              enableFullscreen: true,
              enableCollapse: true,
            }}
            title="Variable Scores"
            body={
              <OptionScores
                scrollToVariableTable={props.scrollToVariableTable}
                optionId={option.id}
              />
            }
          />
        </>
      }
    />
  );
}

const mapStateToProps = (state, myProps) => {
  const { options, variables } = state.entities;
  const option = options.byId[myProps.optionId];
  if (!option) return;
  const { allIds, byId } = option.variableScores;
  const score = allIds
    .map((variableId) => byId[variableId])
    .map((variableScore) => {
      const score = variableScore.score || 0;
      const weight = variables.byId[variableScore.variableId].weight || 0;
      return weight * score;
    })
    .reduce((a, b) => a + b, 0);
  return {
    option,
    score,
  };
};

const actionCreators = {
  onOptionNameChange,
  onOptionDescriptionChange,
  onOptionRemove,
};

export default connect(mapStateToProps, actionCreators)(Option);
