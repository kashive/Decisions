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
  onOptionRemove,
  onOptionCreate
} from "../redux/actions/optionActions";

const OptionHeader = ({ headerText, score, onNameChange }) => {
  return (
    <div>
      <Badge
        style={{ visibility: score ? "inherit" : "hidden" }}
        maxCount={Number.MAX_VALUE}
        content={
          <Whisper
            placement="top"
            trigger="hover"
            speaker={<Tooltip>Weighted average</Tooltip>}
          >
            <p>{score}</p>
          </Whisper>
        }
      >
        <div style={{ margin: "10px", visibility: "visible" }}>
          <BorderedInlineTextEdit
            text={headerText}
            handleTextChange={onNameChange}
            placeholderText="Option Name"
            placeholderTextWidth="125px"
            expandWithContent={true}
            padding="5px"
            multiLine={false}
          />
        </div>
      </Badge>
    </div>
  );
};

function Option(props) {
  const { byId } = props.options;
  const option = byId[props.optionId];
  if (!option) return false; //todo: fix this later: https://app.asana.com/0/1166509149726089/1168928353343516/f
  return (
    <Card
      enableDropdown={true}
      enableFullscreen={true}
      enableCollapse={true}
      additionalDropdowns={{
        Remove: props.onOptionRemove.bind(this, option.id, option.decisionId)
      }}
      title={
        <OptionHeader
          headerText={option.name}
          score={props.optionScores[option.id]}
          onNameChange={props.onOptionNameChange.bind(this, option.id)}
        />
      }
      body={
        <>
          <Card
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
            enableDropdown={true}
            enableFullscreen={true}
            enableCollapse={true}
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

const mapStateToProps = state => {
  const { options, variables } = state.entities;
  const currentDecisionId = state.controlState.decisionId;
  const optionScores = options.allIds
    .map(optionId => options.byId[optionId])
    .filter(option => option.decisionId === currentDecisionId)
    .map(option => {
      const { allIds, byId } = option.variableScores;
      const weightedScore = allIds
        .map(variableId => byId[variableId])
        .map(variableScore => {
          const score = variableScore.score || 0;
          const weight = variables.byId[variableScore.variableId].weight || 0;
          return weight * score;
        })
        .reduce((a, b) => a + b, 0);
      return { [option.id]: weightedScore };
    })
    .reduce((obj, item) => Object.assign(obj, item), {});
  return {
    options,
    optionScores,
    currentDecisionId
  };
};

const actionCreators = {
  onOptionNameChange,
  onOptionDescriptionChange,
  onOptionRemove,
  onOptionCreate
};

export default connect(mapStateToProps, actionCreators)(Option);
