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

import ContextTextEdit from "./ContextTextEdit";
import VariablesTable from "./VariablesTable";
import Options from "./Options";
import CreateNewDecisionPopUp from "./components/CreateNewDecisionPopUp";
import {
  onDecisionTitleChange,
  onDecisionCreate,
  onDecisionContextChange
} from "./redux/actions/decisionActions";
import { appMountSuccess } from "./redux/actions/entitiesActions";
import { connect } from "react-redux";
import DecisionTitle from "./components/DecisionTitle";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewDecisionPopupActive: false
    };
    this.variablesPanelRef = React.createRef();
  }
  componentDidMount() {
    this.props.appMountSuccess("dummyUserId");
  }

  showAddNewDecision = () => {
    this.setState({ addNewDecisionPopupActive: true });
  };

  hideAddNewDecision = () => {
    this.setState({ addNewDecisionPopupActive: false });
  };

  findCurrentDecisionInState(state) {
    return state.decisions.byId[state.currentDecisionId];
  }

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

  handleCurrentDecisionChange = newDecisionId => {
    this.setState({ currentDecisionId: newDecisionId });
  };

  scrollToVariableTable = () => {
    if (this.variablesPanelRef.current) {
      ReactDOM.findDOMNode(this.variablesPanelRef.current).scrollIntoView();
    }
  };

  onDecisionCreate = title => {
    this.props.onDecisionCreate(title);
    this.hideAddNewDecision();
  };

  render() {
    const currentDecisionId = this.props.currentDecisionId;
    if (!currentDecisionId) {
      //todo: show a spinner when integrated with the backend
      return <div>Loading...</div>;
    }
    const { byId } = this.props.decisions;
    const decision = byId[currentDecisionId];
    return (
      <div>
        <Container>
          <SideNavInternal />
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
              <DecisionTitle
                decisionTitle={decision.title}
                onDecisionTitleChange={title =>
                  this.props.onDecisionTitleChange(decision.id, title)
                }
              />
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
                  onCreate={this.onDecisionCreate}
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
                    handleContextChange={context =>
                      this.props.onDecisionContextChange(decision.id, context)
                    }
                  />
                </Panel>
                <Panel ref={this.variablesPanelRef} header="Variables">
                  <VariablesTable />
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
                    decisionId={decision.id}
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

const mapStateToProps = state => {
  const decisions = state.entities.decisions;
  const currentDecisionId = state.controlState.decisionId;
  return {
    decisions,
    currentDecisionId
  };
};

const actionCreators = {
  appMountSuccess,
  onDecisionTitleChange,
  onDecisionCreate,
  onDecisionContextChange
};

export default connect(mapStateToProps, actionCreators)(App);
