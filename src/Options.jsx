import React from "react";
import { connect } from "react-redux";
import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import { Panel, Badge, Whisper, Tooltip, Icon, Button } from "rsuite";
import FroalaEditor from "react-froala-wysiwyg";
import OptionScores from "./OptionScores";
import {
  onOptionNameChange,
  onOptionDescriptionChange,
  onOptionRemove,
  onOptionCreate
} from "./redux/actions/optionActions";

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
  return 0;
  //   return (option.variableScores || [])
  //     .map(vs => {
  //       const variableId = vs.variableId;
  //       const variable = variables.find(v => v.id === variableId);
  //       return (vs.score || 0) * (variable.weight || 0);
  //     })
  //     .reduce((a, b) => a + b, 0);
};

function Options(props) {
  const { allIds, byId } = props.options;
  return (
    <div>
      <Button
        style={{ marginBottom: "15px" }}
        appearance="primary"
        onClick={props.onOptionCreate.bind(this, props.decisionId)}
      >
        Add New Option
      </Button>
      {allIds
        .map(id => byId[id])
        .map(option => {
          return (
            <Panel
              key={option.id}
              header={OptionHeader(
                option.name,
                calculateScore(option, props.variables),
                props.onOptionNameChange.bind(this, option.id),
                props.onOptionRemove.bind(
                  this,
                  option.id,
                  option.decisionId,
                  option.variableScores
                )
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

const mapStateToProps = (state, myProps) => {
  const { options, variables, variableScores } = state.entities;

  const variableScoresTableData = options.allIds
    .map(id => options.byId[id])
    .filter(opt => opt.decisionId === myProps.decisionId)
    .map(opt => opt.variableScores)
    .flat(1)
    .map(vsId => variableScores.byId[vsId])
    .map(vs => {
      return {
        variableScoreId: vs.id,
        score: vs.score,
        reasoning: vs.reasoning,
        variableName: variables.byId[vs.variableId].name
      };
    });

  return {
    options,
    variableScoresTableData
  };
};

const actionCreators = {
  onOptionNameChange,
  onOptionDescriptionChange,
  onOptionRemove,
  onOptionCreate
};

export default connect(mapStateToProps, actionCreators)(Options);
