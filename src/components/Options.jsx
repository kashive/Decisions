import React from "react";
import { connect } from "react-redux";
import BorderedInlineTextEdit from "./shared/BorderedInlineTextEdit";
import { Panel, Badge, Whisper, Tooltip, Icon, Button } from "rsuite";
import FroalaEditor from "react-froala-wysiwyg";
import OptionScores from "./OptionScores";
import {
  onOptionNameChange,
  onOptionDescriptionChange,
  onOptionRemove,
  onOptionCreate
} from "../redux/actions/optionActions";

const OptionHeader = (headerText, score, onNameChange, onRemoveOption) => {
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
            placeholderTextWidth="110px"
            expandWithContent={true}
            padding="5px"
            multiLine={false}
          />
        </div>
      </Badge>
      <Icon className="actionIcon" onClick={onRemoveOption} icon="trash" />
    </div>
  );
};

function Options(props) {
  const { allIds, byId } = props.options;
  return (
    <div>
      <Button
        style={{ marginBottom: "15px" }}
        appearance="primary"
        onClick={props.onOptionCreate.bind(this, props.currentDecisionId)}
      >
        Add New Option
      </Button>
      {allIds
        .map(id => byId[id])
        .filter(option => option.decisionId === props.currentDecisionId)
        .map(option => {
          return (
            <Panel
              key={option.id}
              header={OptionHeader(
                option.name,
                props.optionScores[option.id],
                props.onOptionNameChange.bind(this, option.id),
                props.onOptionRemove.bind(this, option.id, option.decisionId)
              )}
            >
              <Panel header="Description">
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
              </Panel>
              <Panel header="Variable Scores">
                <OptionScores
                  scrollToVariableTable={props.scrollToVariableTable}
                  optionId={option.id}
                />
              </Panel>
            </Panel>
          );
        })}
    </div>
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

export default connect(mapStateToProps, actionCreators)(Options);