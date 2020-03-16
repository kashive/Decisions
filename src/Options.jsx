import React from "react";
import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import { Panel, Badge, Whisper, Tooltip, Icon } from "rsuite";
import FroalaEditor from "react-froala-wysiwyg";
import OptionScores from "./OptionScores";

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

const calculateScore = (option, variables) => {
  return (option.variableScores || [])
    .map(vs => {
      const variableId = vs.variableId;
      const variable = variables.find(v => v.id === variableId);
      return (vs.score || 0) * (variable.weight || 0);
    })
    .reduce((a, b) => a + b, 0);
};

function Options(props) {
  return (
    <div>
      {(props.options || []).map(option => {
        return (
          <Panel
            key={option.id}
            header={OptionHeader(
              option.name,
              calculateScore(option, props.variables),
              props.onNameChange.bind(this, option.id),
              props.onRemoveOption.bind(this, option.id)
            )}
          >
            <Panel header="Description">
              <FroalaEditor
                model={option.description}
                onModelChange={props.onDescriptionChange.bind(this, option.id)}
                config={{
                  placeholderText: "Tell us more about the option"
                }}
              />
            </Panel>
            <Panel header="Variable Scores">
              <OptionScores
                onScoreReasoningChange={props.onScoreReasoningChange}
                onScoreChange={props.onScoreChange}
                optionId={option.id}
                variableScores={(option.variableScores || []).map(vs => {
                  const variable = props.variables.find(
                    v => v.id === vs.variableId
                  );
                  return {
                    variableId: vs.variableId,
                    variableName: variable.name,
                    score: vs.score,
                    reasoning: vs.reasoning
                  };
                })}
              />
            </Panel>
          </Panel>
        );
      })}
    </div>
  );
}
export default Options;
