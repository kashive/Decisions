import React from "react";
import ReactDOM from "react-dom";
import SideNavInternal from "./SideNavInternal";
import uuid from "uuid";
import produce from "immer";

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
import { fetchDecisions } from "./redux/actions/decisionActions";
import { connect } from "react-redux";

const StyledTitle = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 18px;
  max-width: 78vw;
  overflow: hidden; //ensures that the overflow hides after max-width is hit
`;

const mapDispatchToProps = dispatch => {
  return {
    fetchDecisions: (userId = "dummyId") => {
      dispatch(fetchDecisions(userId));
    }
  };
};

const mapStateToProps = state => {
  const decisions = state.decisionsReducer.decisions;
  //setting first decision in the list as current. may need to modify later. most recently edited?
  const currentDecisionId = decisions[0] ? decisions[0].id : undefined;
  return {
    decisions,
    currentDecisionId
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewDecisionPopupActive: false
    };
    this.variablesPanelRef = React.createRef();
  }
  componentDidMount() {
    this.props.fetchDecisions();
  }

  showAddNewDecision = () => {
    this.setState({ addNewDecisionPopupActive: true });
  };

  hideAddNewDecision = () => {
    this.setState({ addNewDecisionPopupActive: false });
  };

  handleAddNewDecision = decisionTitle => {
    this.setState(
      produce(draft => {
        const decisionId = uuid.v4();
        draft.decisions.push({
          id: decisionId,
          title: decisionTitle,
          variables: [],
          options: []
        });
        draft.currentDecisionId = decisionId;
        draft.addNewDecisionPopupActive = false;
      })
    );
  };

  //todo: refactor handleTitleChange and handleContextChange
  handleTitleChange = title => {
    this.setState(
      produce(draft => {
        const currentDecision = this.findCurrentDecisionInState(draft);
        currentDecision.title = title;
      })
    );
  };

  findCurrentDecisionInState(state) {
    return state.decisions.find(
      decision => decision.id === state.currentDecisionId
    );
  }

  findVariableInDecision(variableId, decision) {
    return decision.variables.find(v => v.id === variableId);
  }

  handleContextChange = context => {
    this.setState(
      produce(draft => {
        const currentDecision = this.findCurrentDecisionInState(draft);
        currentDecision.context = context;
      })
    );
  };

  getVariableInCurrentDecision(state, variableId) {
    const currentDecision = this.findCurrentDecisionInState(state);
    return this.findVariableInDecision(variableId, currentDecision);
  }

  handleVariableWeightChange = (variableId, weight) => {
    this.setState(
      produce(draft => {
        const variable = this.getVariableInCurrentDecision(draft, variableId);
        variable.weight = weight;
      })
    );
  };

  handleVariableNameChange = (variableId, name) => {
    this.setState(
      produce(draft => {
        const variable = this.getVariableInCurrentDecision(draft, variableId);
        variable.name = name;
      })
    );
  };

  handleVariableDescriptionChange = (variableId, description) => {
    this.setState(
      produce(draft => {
        const variable = this.getVariableInCurrentDecision(draft, variableId);
        variable.description = description;
      })
    );
  };

  handleAddNewVariable = () => {
    //if there is a variable that is has no name then don't create a new one
    const currentDecision = this.findCurrentDecisionInState(this.props);
    const variableWithNoName = currentDecision.variables.find(
      variable => !variable.name
    );
    if (variableWithNoName) return;
    this.setState(
      produce(draft => {
        const id = uuid.v4();
        const newDecision = this.findCurrentDecisionInState(draft);
        newDecision.variables.push({
          id: id
        });
        //also add it variable to all the options
        //todo: do this only when variable has a name
        newDecision.options.forEach(opt =>
          opt.variableScores.push({ variableId: id })
        );
      })
    );
  };

  handleVariableRemove = variableId => {
    this.setState(
      produce(draft => {
        const decision = this.findCurrentDecisionInState(draft);
        decision.variables = decision.variables.filter(
          v => v.id !== variableId
        );
        //also remove all the varible scores with this variable id
        const options = decision.options;
        for (var i = 0; i < options.length; i++) {
          const option = options[i];
          const remainingScores = option.variableScores.filter(vs => {
            return vs.variableId !== variableId;
          });
          option.variableScores = remainingScores;
        }
      })
    );
  };

  findOptionInCurrentDecision(optionId, state) {
    const decision = this.findCurrentDecisionInState(state);
    return decision.options.find(opt => opt.id === optionId);
  }

  handleOptionsNameChange = (optionId, name) => {
    this.setState(
      produce(draft => {
        const option = this.findOptionInCurrentDecision(optionId, draft);
        option.name = name;
      })
    );
  };

  handleVariableScoreChange = (optionId, variableId, score) => {
    this.setState(
      produce(draft => {
        const option = this.findOptionInCurrentDecision(optionId, draft);
        const variable = option.variableScores.find(
          vs => vs.variableId === variableId
        );
        variable.score = score;
      })
    );
  };

  handleAddNewOption = () => {
    //there are multiple calls to findCurrentDecisionInState in this method
    //react always renders when you call the .setState so preventing that in
    //the guard usecase
    const currentDecision = this.findCurrentDecisionInState(this.props);
    const options = currentDecision.options;
    //not creating a new one if there exists one already without a name
    if (options.find(option => !option.name)) return;
    this.setState(
      produce(draft => {
        const variableScores = currentDecision.variables.map(variable => {
          return {
            variableId: variable.id
          };
        });
        this.findCurrentDecisionInState(draft).options.unshift({
          id: uuid.v4(),
          variableScores: variableScores
        });
      })
    );
  };

  handleRemoveOption = optionId => {
    this.setState(
      produce(draft => {
        const decision = this.findCurrentDecisionInState(draft);
        decision.options = decision.options.filter(
          option => option.id !== optionId
        );
      })
    );
  };

  handleOptionsDescriptionChange = (optionId, description) => {
    this.setState(
      produce(draft => {
        const option = this.findOptionInCurrentDecision(optionId, draft);
        option.description = description;
      })
    );
  };

  handleVariableResoningChange = (optionId, variableId, reasoning) => {
    this.setState(
      produce(draft => {
        const option = this.findOptionInCurrentDecision(optionId, draft);
        const variable = option.variableScores.find(
          vs => vs.variableId === variableId
        );
        variable.reasoning = reasoning;
      })
    );
  };

  handleCurrentDecisionChange = newDecisionId => {
    this.setState({ currentDecisionId: newDecisionId });
  };

  scrollToVariableTable = () => {
    if (this.variablesPanelRef.current) {
      ReactDOM.findDOMNode(this.variablesPanelRef.current).scrollIntoView();
    }
  };

  handleVariablesChange;

  render() {
    var decision = this.findCurrentDecisionInState(this.props);
    if (!decision) {
      //todo: show a spinner when integrated with the backend
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Container>
          <SideNavInternal
            decisions={this.props.decisions}
            currentDecisionId={this.props.currentDecisionId}
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
                <Panel ref={this.variablesPanelRef} header="Variables">
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
                    onScoreChange={this.handleVariableScoreChange}
                    onScoreReasoningChange={this.handleVariableResoningChange}
                    onDescriptionChange={this.handleOptionsDescriptionChange}
                    onRemoveOption={this.handleRemoveOption}
                    scrollToVariableTable={this.scrollToVariableTable}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
