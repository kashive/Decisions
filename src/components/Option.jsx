import React from "react";
import { connect } from "react-redux";
import BorderedInlineTextEdit from "./shared/BorderedInlineTextEdit";
import { Badge, Whisper, Tooltip } from "rsuite";
import FroalaEditor from "react-froala-wysiwyg";
import OptionScores from "./OptionScores";
import Card from "./shared/Card";
import {
  onOptionNameChange,
  onOptionDescriptionChange,
  onOptionRemove
} from "../redux/actions/optionActions";

const OptionHeader = ({ headerText, score, onNameChange }) => {
  return (
    <div>
      <Badge
        maxCount={Number.MAX_VALUE}
        content={
          <Whisper
            placement="top"
            trigger="hover"
            speaker={<Tooltip>Weighted average</Tooltip>}
          >
            <p>{score || false}</p>
          </Whisper>
        }
      >
        <BorderedInlineTextEdit
          text={headerText}
          handleTextChange={onNameChange}
          placeholderText="Option Name"
          placeholderTextWidth="125px"
          padding="5px"
          expandWithContent={false}
          multiLine={true}
        />
      </Badge>
    </div>
  );
};

function Option(props) {
  const option = props.option;
  if (!option) return false; //todo: fix this later: https://app.asana.com/0/1166509149726089/1168928353343516/f
  return (
    <Card
      backgroundColor="#f8f9fa"
      dropdownConfig={{
        enableFullscreen: true,
        enableCollapse: true,
        additionalDropdowns: [
          {
            text: "Remove",
            onClick: props.onOptionRemove.bind(
              this,
              option.id,
              option.decisionId
            )
          }
        ]
      }}
      title={
        <OptionHeader
          headerText={option.name}
          score={props.score}
          onNameChange={props.onOptionNameChange.bind(this, option.id)}
        />
      }
      body={
        <>
          <Card
            dropdownConfig={{
              enableFullscreen: true,
              enableCollapse: true
            }}
            enableDropdown={true}
            enableFullscreen={true}
            enableCollapse={true}
            title="Description"
            body={
              <FroalaEditor
                model={option.description}
                onModelChange={props.onOptionDescriptionChange.bind(
                  this,
                  option.id
                )}
                config={{
                  placeholderText: "Tell us more about the option"
                }}
              />
            }
          />
          <Card
            dropdownConfig={{
              enableFullscreen: true,
              enableCollapse: true
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
    .map(variableId => byId[variableId])
    .map(variableScore => {
      const score = variableScore.score || 0;
      const weight = variables.byId[variableScore.variableId].weight || 0;
      return weight * score;
    })
    .reduce((a, b) => a + b, 0);
  return {
    option,
    score
  };
};

const actionCreators = {
  onOptionNameChange,
  onOptionDescriptionChange,
  onOptionRemove
};

export default connect(mapStateToProps, actionCreators)(Option);
