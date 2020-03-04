import React from "react";
import SideNavInternal from "./SideNavInternal";

import { Container, Header, Content, PanelGroup, Panel } from "rsuite";

import InlineTextEditWithHighlight from "./InlineTextEditWithHighlight";

let classNames = require("classnames");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decisions: [
        {
          id: "1",
          title: "Decision 1"
        }
      ],
      currentDecisionId: "1",
      isTitleInFocus: false
    };
  }

  enableTitleFocusState() {
    this.setState({ isTitleInFocus: true });
  }

  disableTitleFocusState() {
    this.setState({ isTitleInFocus: false });
  }

  getCurrentDecision() {
    return this.state.decisions.find(
      d => d.id === this.state.currentDecisionId
    );
  }

  handleTitleChange = title => {
    const decisions = [...this.state.decisions];
    const currentDecision = this.getCurrentDecision();
    const currentDecisionIndex = decisions.indexOf(currentDecision);
    decisions[currentDecisionIndex] = { ...currentDecision };
    decisions[currentDecisionIndex].title = title;
    this.setState({ decisions });
  };

  handleTitleFocus = () => this.enableTitleFocusState();
  handleTitleBlur = () => this.disableTitleFocusState();
  handleEnter = () => this.disableTitleFocusState();

  render() {
    var decision = this.getCurrentDecision();
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
                height: "60px",
                borderBottom: "1px solid",
                borderColor: "#dbdce0"
              }}
            >
              <InlineTextEditWithHighlight
                model={decision.title}
                handleTitleFocus={this.handleTitleFocus}
                handleTitleBlur={this.handleTitleBlur}
                handleTitleChange={this.handleTitleChange}
                handleEnter={this.handleEnter}
                classNames={classNames({
                  "title-input-text": true,
                  "border-on-hover": !this.state.isTitleInFocus,
                  "border-on-focus": this.state.isTitleInFocus
                })}
              />
            </Header>
            <Content
              style={{
                marginTop: 20,
                marginLeft: 80,
                marginRight: 80
              }}
            >
              <PanelGroup
                style={{
                  background: "white",
                  height: "85vh",
                  overflowY: "scroll"
                }}
                accordion
                bordered
              >
                <Panel header="Panel 1" defaultExpanded>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed
                  elementum tempus egestas sed sed risus. Lectus quam id leo in
                  vitae turpis massa sed elementum. Diam sit amet nisl suscipit
                  adipiscing. Consectetur adipiscing elit pellentesque habitant
                  morbi tristique senectus et netus. Volutpat est velit egestas
                  dui id ornare. Viverra accumsan in nisl nisi. Sed augue lacus
                  viverra vitae congue eu consequat ac felis. Nulla pharetra
                  diam sit amet. Nulla posuere sollicitudin aliquam ultrices.
                  Odio euismod lacinia at quis risus sed vulputate. Blandit
                  cursus risus at ultrices. Egestas congue quisque egestas diam
                  in arcu cursus euismod. Ornare arcu dui vivamus arcu felis
                  bibendum ut tristique. Egestas sed tempus urna et pharetra.
                  Consequat nisl vel pretium lectus quam id leo in vitae.
                  Gravida neque convallis a cras semper auctor neque. Faucibus
                  in ornare quam viverra orci. Porttitor lacus luctus accumsan
                  tortor posuere ac ut consequat semper. A diam maecenas sed
                  enim. In fermentum et sollicitudin ac orci phasellus.
                  Consequat ac felis donec et odio pellentesque.
                </Panel>
                <Panel header="Panel 2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed
                  elementum tempus egestas sed sed risus. Lectus quam id leo in
                  vitae turpis massa sed elementum. Diam sit amet nisl suscipit
                  adipiscing. Consectetur adipiscing elit pellentesque habitant
                  morbi tristique senectus et netus. Volutpat est velit egestas
                  dui id ornare. Viverra accumsan in nisl nisi. Sed augue lacus
                  viverra vitae congue eu consequat ac felis. Nulla pharetra
                  diam sit amet. Nulla posuere sollicitudin aliquam ultrices.
                  Odio euismod lacinia at quis risus sed vulputate. Blandit
                  cursus risus at ultrices. Egestas congue quisque egestas diam
                  in arcu cursus euismod. Ornare arcu dui vivamus arcu felis
                  bibendum ut tristique. Egestas sed tempus urna et pharetra.
                  Consequat nisl vel pretium lectus quam id leo in vitae.
                  Gravida neque convallis a cras semper auctor neque. Faucibus
                  in ornare quam viverra orci. Porttitor lacus luctus accumsan
                  tortor posuere ac ut consequat semper. A diam maecenas sed
                  enim. In fermentum et sollicitudin ac orci phasellus.
                  Consequat ac felis donec et odio pellentesque.
                </Panel>

                <Panel header="Panel 3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed
                  elementum tempus egestas sed sed risus. Lectus quam id leo in
                  vitae turpis massa sed elementum. Diam sit amet nisl suscipit
                  adipiscing. Consectetur adipiscing elit pellentesque habitant
                  morbi tristique senectus et netus. Volutpat est velit egestas
                  dui id ornare. Viverra accumsan in nisl nisi. Sed augue lacus
                  viverra vitae congue eu consequat ac felis. Nulla pharetra
                  diam sit amet. Nulla posuere sollicitudin aliquam ultrices.
                  Odio euismod lacinia at quis risus sed vulputate. Blandit
                  cursus risus at ultrices. Egestas congue quisque egestas diam
                  in arcu cursus euismod. Ornare arcu dui vivamus arcu felis
                  bibendum ut tristique. Egestas sed tempus urna et pharetra.
                  Consequat nisl vel pretium lectus quam id leo in vitae.
                  Gravida neque convallis a cras semper auctor neque. Faucibus
                  in ornare quam viverra orci. Porttitor lacus luctus accumsan
                  tortor posuere ac ut consequat semper. A diam maecenas sed
                  enim. In fermentum et sollicitudin ac orci phasellus.
                  Consequat ac felis donec et odio pellentesque.
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
