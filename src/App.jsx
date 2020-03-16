import React from "react";
import SideNavInternal from "./SideNavInternal";
import uuid from "uuid";

import {
  Container,
  Header,
  Content,
  PanelGroup,
  Panel,
  Button,
  ButtonToolbar,
  Icon,
  IconButton,
  Whisper,
  Tooltip
} from "rsuite";
import styled from "styled-components";

import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import ContextTextEdit from "./ContextTextEdit";
import VariablesTable from "./VariablesTable";
import Options from "./Options";
import CreateNewDecisionPopUp from "./CreateNewDecisionPopUp";

const StyledTitle = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 18px;
  max-width: 78vw;
  overflow: hidden; //ensures that the overflow hides after max-width is hit
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decisions: [
        {
          id: "1",
          title: "Decision 1",
          context: "This is why we need to make this decision",
          variables: [
            {
              id: "1",
              name: "Time",
              weight: 4,
              description: "Time and tide waits for none"
            },
            {
              id: "2",
              name: "Money",
              weight: 8,
              description:
                "Money and time and tide waits for none and none again and again."
            }
          ],
          options: [
            {
              id: "1",
              name: "Option A",
              description: "Solid option",
              variableScores: [
                {
                  variableId: "1",
                  score: 8,
                  reasoning: "because of this"
                },
                {
                  variableId: "2",
                  score: 3,
                  reasoning: "because of that"
                }
              ]
            },
            {
              id: "2",
              name: "Option B",
              description: "Another Solid option",
              variableScores: [
                {
                  variableId: "1",
                  score: 3,
                  reasoning: "because of this"
                },
                {
                  variableId: "2",
                  score: 5,
                  reasoning: "because of that"
                }
              ]
            }
          ]
        }
      ],
      currentDecisionId: "1",
      addNewDecisionPopupActive: false
    };
  }

  getCurrentDecision() {
    return this.state.decisions.find(
      d => d.id === this.state.currentDecisionId
    );
  }

  showAddNewDecision = () => {
    this.setState({ addNewDecisionPopupActive: true });
  };

  hideAddNewDecision = () => {
    this.setState({ addNewDecisionPopupActive: false });
  };

  handleAddNewDecision = decisionTitle => {
    const state = { ...this.state };
    const decisionId = uuid.v4();
    state.decisions.push({
      id: decisionId,
      title: decisionTitle,
      variables: [],
      options: []
    });
    state.currentDecisionId = decisionId;
    state.addNewDecisionPopupActive = false;
    this.setState(state);
  };

  //todo: refactor handleTitleChange and handleContextChange
  handleTitleChange = title => {
    const decisions = [...this.state.decisions];
    const currentDecision = this.getCurrentDecision();
    const currentDecisionIndex = decisions.indexOf(currentDecision);
    decisions[currentDecisionIndex] = { ...currentDecision };
    decisions[currentDecisionIndex].title = title;
    this.setState({ decisions });
  };

  handleContextChange = context => {
    const decisions = [...this.state.decisions];
    const currentDecision = this.getCurrentDecision();
    const currentDecisionIndex = decisions.indexOf(currentDecision);
    decisions[currentDecisionIndex] = { ...currentDecision };
    decisions[currentDecisionIndex].context = context;
    this.setState({ decisions });
  };

  handleVariableWeightChange = (variableId, weight) => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const variable = currentDecision.variables.find(v => v.id === variableId);
    variable.weight = weight;
    this.setState({ decisions });
  };

  handleVariableNameChange = (variableId, name) => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const variable = currentDecision.variables.find(v => v.id === variableId);
    variable.name = name;
    this.setState({ decisions });
  };

  handleVariableDescriptionChange = (variableId, description) => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const variable = currentDecision.variables.find(v => v.id === variableId);
    variable.description = description;
    this.setState({ decisions });
  };

  handleAddNewVariable = () => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const id = uuid.v4();
    currentDecision.variables.push({
      id: id
    });
    //also add it variable to all the options
    currentDecision.options.forEach(opt =>
      opt.variableScores.push({ variableId: id })
    );
    this.setState({ decisions });
  };

  handleVariableRemove = variableId => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const variables = currentDecision.variables;
    const variable = currentDecision.variables.find(v => v.id === variableId);
    const variableIndex = variables.indexOf(variable);
    variables.splice(variableIndex, 1);
    //also remove all the varible scores with this variable id
    const options = currentDecision.options;
    for (var i = 0; i < (options || []).length; i++) {
      const option = options[i];
      const remainingScores = (option.variableScores || []).filter(vs => {
        return vs.variableId !== variableId;
      });
      option.variableScores = remainingScores;
    }
    this.setState({ decisions });
  };

  handleOptionsNameChange = (optionId, name) => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const options = currentDecision.options;
    const option = options.find(opt => opt.id === optionId);
    option.name = name;
    this.setState({ decisions });
  };

  handleOptionsScoreChange = (optionId, variableId, score) => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const options = currentDecision.options;
    const option = options.find(opt => opt.id === optionId);
    const variable = option.variableScores.find(
      vs => vs.variableId === variableId
    );
    variable.score = score;
    this.setState({ decisions });
  };

  handleAddNewOption = () => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const options = currentDecision.options;
    options.unshift({
      id: uuid.v4(),
      variableScores: []
    });
    this.setState({ decisions });
  };

  handleRemoveOption = optionId => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    currentDecision.options = (currentDecision.options || []).filter(
      option => option.id !== optionId
    );
    this.setState({ decisions });
  };

  handleOptionsDescriptionChange = (optionId, description) => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const options = currentDecision.options;
    const option = options.find(opt => opt.id === optionId);
    option.description = description;
    this.setState({ decisions });
  };

  handleVariableResoningChange = (optionId, variableId, reasoning) => {
    const decisions = [...this.state.decisions];
    const currentDecision = decisions.find(
      d => d.id === this.state.currentDecisionId
    );
    const options = currentDecision.options;
    const option = options.find(opt => opt.id === optionId);
    const variable = option.variableScores.find(
      vs => vs.variableId === variableId
    );
    variable.reasoning = reasoning;
    this.setState({ decisions });
  };

  handleCurrentDecisionChange = newDecisionId => {
    this.setState({ currentDecisionId: newDecisionId });
  };

  render() {
    var decision = this.getCurrentDecision();
    return (
      <div>
        <Container>
          <SideNavInternal
            decisions={this.state.decisions}
            currentDecisionId={this.state.currentDecisionId}
            onDecisionSelect={this.handleCurrentDecisionChange}
          />
          <Container
            style={{
              backgroundColor: "#f8f9fa",
              minHeight: "100vh"
            }}
          >
            <Header
              style={{
                backgroundColor: "white",
                borderBottom: "1px solid",
                borderColor: "#dbdce0"
              }}
            >
              <StyledTitle>
                <BorderedInlineTextEdit
                  text={decision.title}
                  placeholderText="Untitled decision"
                  placeholderTextWidth="150px"
                  padding="5px"
                  multiLine={false}
                  handleTextChange={this.handleTitleChange}
                  expandWithContent={true}
                  autoFocusOnInit={true}
                />
              </StyledTitle>
              <div style={{ borderTop: "1px solid", borderColor: "#dbdce0" }}>
                <ButtonToolbar>
                  <Whisper
                    placement="bottomStart"
                    trigger="hover"
                    speaker={<Tooltip>Add New Decision</Tooltip>}
                  >
                    <IconButton
                      onClick={this.showAddNewDecision}
                      className="actionIcon"
                      icon={
                        <Icon style={{ color: "black" }} icon="plus-circle" />
                      }
                      size="sm"
                      appearance="link"
                    />
                  </Whisper>
                </ButtonToolbar>
                <CreateNewDecisionPopUp
                  isVisible={this.state.addNewDecisionPopupActive}
                  onCreate={this.handleAddNewDecision}
                  onCancel={this.hideAddNewDecision}
                />
              </div>
            </Header>
            <Content
              style={{
                marginTop: 20,
                marginLeft: 150,
                marginRight: 150
              }}
            >
              <PanelGroup
                style={{
                  background: "white",
                  height: "85vh",
                  overflowY: "scroll"
                }}
                // accordion
                bordered
              >
                <Panel header="Context">
                  <ContextTextEdit
                    model={decision.context}
                    handleContextChange={this.handleContextChange}
                  />
                </Panel>
                <Panel header="Variables">
                  <VariablesTable
                    variables={decision.variables}
                    options={decision.options}
                    onHandleMove={this.handleVariableWeightChange}
                    handleNameChange={this.handleVariableNameChange}
                    handleAddNewVariable={this.handleAddNewVariable}
                    handleVariableRemove={this.handleVariableRemove}
                    handleDescriptionChange={
                      this.handleVariableDescriptionChange
                    }
                  />
                </Panel>
                <Panel header="Options">
                  <Button
                    style={{ marginBottom: "15px" }}
                    appearance="primary"
                    onClick={this.handleAddNewOption}
                  >
                    Add New Option
                  </Button>
                  <Options
                    options={decision.options}
                    variables={decision.variables}
                    onNameChange={this.handleOptionsNameChange}
                    onScoreChange={this.handleOptionsScoreChange}
                    onScoreReasoningChange={this.handleVariableResoningChange}
                    onDescriptionChange={this.handleOptionsDescriptionChange}
                    onRemoveOption={this.handleRemoveOption}
                  />
                </Panel>
              </PanelGroup>
            </Content>
          </Container>
        </Container>
      </div>
    );
  }
}

export default App;
