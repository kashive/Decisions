import React from "react";
import SideNavInternal from "./SideNavInternal";
import uuid from "uuid";
import produce from "immer";
import { Container, Content } from "rsuite";
import { ContextCard } from "./ContextTextEdit";
import Metrics from "./Metrics";
import Option from "./Option";
import VariablesTable from "./VariablesTable";
import {
  onDecisionCreate,
  onDecisionContextChange,
} from "../redux/actions/decisionActions";
import { onOptionCreate } from "../redux/actions/optionActions";
import { appMountSuccess } from "../redux/actions/entitiesActions";
import { connect } from "react-redux";
import { StyledTitle } from "./shared/Card";
import { ListGrouping } from "./shared/ListGrouping";
import TopNav, { TopNavHeight } from "./TopNav";
import TableView from "./TableView";
import ViewTypes from "../redux/viewTypes";

const SIDENAV_COLLAPSE_WIDTH = 56;
const SIDENAV_EXPAND_WIDTH = 225;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewDecisionPopupActive: false,
      sidenavExpanded: true,
    };
    this.variablesRef = React.createRef();
    this.optionsRef = {};
  }

  componentDidMount() {
    this.props.appMountSuccess("dummyUserId");
  }

  componentDidUpdate() {
    const { sectionId, itemId } = this.props.scrollInfo;
    //hardcoding for now since we only need this scroll feature for optiions
    if (sectionId === "3") {
      //this does not quite when transiting from table view to main view
      //https://app.asana.com/0/1166509149726089/1172265775837921
      this.scrollToRef(this.optionsRef[itemId]);
    }
  }

  showAddNewDecision = () => {
    this.setState({ addNewDecisionPopupActive: true });
  };

  hideAddNewDecision = () => {
    this.setState({ addNewDecisionPopupActive: false });
  };

  toggleSidenavExpanded = () => {
    this.setState({
      sidenavExpanded: !this.state.sidenavExpanded,
    });
  };

  findCurrentDecisionInState(state) {
    return state.decisions.byId[state.currentDecisionId];
  }

  scrollToRef(ref) {
    if (ref && ref.current) {
      window.scrollTo(0, ref.current.offsetTop - TopNavHeight);
    }
  }

  handleAddNewOption = () => {
    //there are multiple calls to findCurrentDecisionInState in this method
    //react always renders when you call the .setState so preventing that in
    //the guard usecase
    const currentDecision = this.findCurrentDecisionInState(this.props);
    const options = currentDecision.options;
    //not creating a new one if there exists one already without a name
    if (options.find((option) => !option.name)) return;
    this.setState(
      produce((draft) => {
        const variableScores = currentDecision.variables.map((variable) => {
          return {
            variableId: variable.id,
          };
        });
        this.findCurrentDecisionInState(draft).options.unshift({
          id: uuid.v4(),
          variableScores: variableScores,
        });
      })
    );
  };

  handleCurrentDecisionChange = (newDecisionId) => {
    this.setState({ currentDecisionId: newDecisionId });
  };

  getListGroupingData = (decision) => {
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
                onChange={(context) =>
                  this.props.onDecisionContextChange(decision.id, context)
                }
              />
            ),
          },
        ],
      },
      {
        id: "2",
        scrollRef: this.variablesRef,
        items: [
          {
            itemId: "variablesTable",
            content: <VariablesTable />,
          },
        ],
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
              onClick: this.props.onOptionCreate.bind(this, decision.id),
            },
          ],
        },
        items: decision.optionIds.map((optId) => {
          return {
            itemId: optId,
            scrollRef:
              this.optionsRef[optId] ||
              (this.optionsRef[optId] = React.createRef()),
            content: (
              <Option
                key={optId}
                optionId={optId}
                scrollToVariableTable={() =>
                  this.scrollToRef(this.variablesRef)
                }
              />
            ),
          };
        }),
      },
      {
        id: "4",
        items: [
          {
            itemId: "metricsCard",
            content: (
              <Metrics
                decisionId={decision.id}
                scrollToOptions={(optId) =>
                  this.scrollToRef(this.optionsRef[optId])
                }
              />
            ),
          },
        ],
      },
    ];
  };

  render() {
    const currentDecisionId = this.props.currentDecisionId;
    const { byId } = this.props.decisions;
    const decision = byId[currentDecisionId];
    const listGroupingData = this.getListGroupingData(decision);
    return (
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
            transition: "margin-left 0.3s ease",
          }}
        >
          {decision && (
            <>
              <TopNav
                decision={decision}
                showAddNewDecision={this.showAddNewDecision}
                addNewDecisionPopupActive={this.state.addNewDecisionPopupActive}
                hideAddNewDecision={this.hideAddNewDecision}
              />
              <Content
                style={{
                  marginTop: TopNavHeight + "px",
                  marginLeft: "15%",
                  marginRight: "15%", //todo: add media query
                }}
              >
                {this.props.currentView === ViewTypes.TABLE && <TableView />}
                {this.props.currentView === ViewTypes.MAIN && (
                  <ListGrouping data={listGroupingData} />
                )}
              </Content>
            </>
          )}

          {!decision && (
            <TopNav
              showAddNewDecision={this.showAddNewDecision}
              addNewDecisionPopupActive={this.state.addNewDecisionPopupActive}
              hideAddNewDecision={this.hideAddNewDecision}
            />
          )}
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const decisions = state.entities.decisions;
  const currentDecisionId = state.controlState.decisionId;
  const currentView = state.viewState.currentView;
  const scrollInfo = state.viewState.scrollInfo;
  return {
    decisions,
    currentDecisionId,
    currentView,
    scrollInfo,
  };
};

const actionCreators = {
  appMountSuccess,
  onDecisionCreate,
  onDecisionContextChange,
  onOptionCreate,
};

export default connect(mapStateToProps, actionCreators)(App);
