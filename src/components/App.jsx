import React from "react";
import ReactDOM from "react-dom";
import SideNavInternal from "./SideNavInternal";
import uuid from "uuid";
import produce from "immer";

import {
  Container,
  Header,
  Content,
  ButtonToolbar,
  Button,
  Icon,
  IconButton,
  Whisper,
  Tooltip
} from "rsuite";

import { ContextCard } from "./ContextTextEdit";
import Metrics from "./Metrics";
import Option from "./Option";
import VariablesTable from "./VariablesTable";
import CreateNewDecisionPopUp from "./CreateNewDecisionPopUp";
import {
  onDecisionTitleChange,
  onDecisionCreate,
  onDecisionContextChange
} from "../redux/actions/decisionActions";
import { onOptionCreate } from "../redux/actions/optionActions";
import { appMountSuccess } from "../redux/actions/entitiesActions";
import { connect } from "react-redux";
import DecisionTitle from "./DecisionTitle";
import { StyledTitle } from "./shared/Card";
import { ListGrouping } from "./shared/ListGrouping";

const SIDENAV_COLLAPSE_WIDTH = 56;
const SIDENAV_EXPAND_WIDTH = 225;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewDecisionPopupActive: false,
      sidenavExpanded: true
    };
    this.variablesPanelRef = React.createRef();
    this.optionsRef = {};
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

  toggleSidenavExpanded = () => {
    this.setState({
      sidenavExpanded: !this.state.sidenavExpanded
    });
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

  scrollToOptions = optionId => {
    const option = this.optionsRef[optionId];
    if (option) {
      const optionCurrent = option.current;
      if (optionCurrent) ReactDOM.findDOMNode(optionCurrent).scrollIntoView();
    }
  };

  onDecisionCreate = title => {
    this.props.onDecisionCreate(title);
    this.hideAddNewDecision();
  };

  getListGroupingData = decision => {
    if (!decision) return [];
    return [
      {
        id: "1",
        items: [
          {
            itemId: "contextCard",
            content: (
              <ContextCard
                model={decision.context}
                onChange={context =>
                  this.props.onDecisionContextChange(decision.id, context)
                }
              />
            )
          }
        ]
      },
      {
        id: "2",
        items: [
          {
            itemId: "variablesTable",

            content: (
              <div ref={this.variablesPanelRef}>
                <VariablesTable />
              </div>
            )
          }
        ]
      },
      {
        id: "3",
        title: <StyledTitle>Options</StyledTitle>,
        dropdownConfig: {
          enableFullscreen: true,
          enableCollapse: true,
          additionalDropdowns: [
            {
              text: "Add new option",
              onClick: this.props.onOptionCreate.bind(this, decision.id)
            }
          ]
        },
        items: decision.optionIds.map(optId => {
          return {
            itemId: optId,
            content: (
              <div
                ref={
                  this.optionsRef[optId] ||
                  (this.optionsRef[optId] = React.createRef())
                }
              >
                <Option
                  key={optId}
                  optionId={optId}
                  scrollToVariableTable={this.scrollToVariableTable}
                />
              </div>
            )
          };
        })
      },
      {
        id: "4",
        items: [
          {
            itemId: "metricsCard",
            content: (
              <Metrics
                decisionId={decision.id}
                scrollToOptions={this.scrollToOptions}
              />
            )
          }
        ]
      }
    ];
  };

  render() {
    const currentDecisionId = this.props.currentDecisionId;
    const { byId } = this.props.decisions;
    const decision = byId[currentDecisionId];
    const listGroupingData = this.getListGroupingData(decision);
    return (
      <div>
        <Container>
          <SideNavInternal
            expand={this.state.sidenavExpanded}
            handleToggle={this.toggleSidenavExpanded}
            collapseWidth={SIDENAV_COLLAPSE_WIDTH}
            expandWidth={SIDENAV_EXPAND_WIDTH}
          />
          <Container
            style={{
              backgroundColor: "#f8f9fa",
              minHeight: "100vh",
              marginLeft: this.state.sidenavExpanded
                ? SIDENAV_EXPAND_WIDTH
                : SIDENAV_COLLAPSE_WIDTH,
              transition: "margin-left 0.3s ease"
            }}
          >
            {decision && (
              <>
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
                  <div
                    style={{ borderTop: "1px solid", borderColor: "#dbdce0" }}
                  >
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
                            <Icon
                              style={{ color: "black" }}
                              icon="plus-circle"
                            />
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
                    marginTop: "2%",
                    marginLeft: "15%",
                    marginRight: "15%" //todo: add media query
                  }}
                >
                  <ListGrouping data={listGroupingData} />
                </Content>
              </>
            )}

            {!decision && (
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
            )}
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
  onDecisionContextChange,
  onOptionCreate
};

export default connect(mapStateToProps, actionCreators)(App);
