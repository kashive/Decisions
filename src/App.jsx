import React from "react";
import SideNavInternal from "./SideNavInternal";

import { Container, Header, Content, PanelGroup, Panel, Table } from "rsuite";
import styled from "styled-components";

import InlineTextEditWithHighlight from "./InlineTextEditWithHighlight";
import ContextTextEdit from "./ContextTextEdit";
import CustomSlider from "./CustomSlider";
import CustomBorder from "./CustomBorder";

const StyledTitle = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  font-size: 18px;
  max-width: 78vw;
  overflow: hidden; //ensures that the overflow hides after max-width is hit
`;
const { Column, HeaderCell, Cell } = Table;

const SliderCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props}>
    <CustomSlider value={rowData[dataKey]} />
  </Cell>
);

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
              name: "Time",
              weight: 4,
              description: "Time and tide waits for none"
            }
          ]
        }
      ],
      currentDecisionId: "1"
    };
  }

  getCurrentDecision() {
    return this.state.decisions.find(
      d => d.id === this.state.currentDecisionId
    );
  }

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
              <StyledTitle>
                <CustomBorder>
                  <InlineTextEditWithHighlight
                    text={decision.title}
                    placeholderText="Untitled decision"
                    placeholderTextWidth="150px"
                    padding="5px"
                    multiLine={false}
                    handleTextChange={this.handleTitleChange}
                  />
                </CustomBorder>
              </StyledTitle>
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
                <Panel header="Context">
                  <ContextTextEdit
                    model={decision.context}
                    handleContextChange={this.handleContextChange}
                  />
                </Panel>
                <Panel header="Variables" defaultExpanded>
                  <div>
                    <Table
                      bordered
                      data={decision.variables}
                      rowHeight={100}
                      // autoHeight
                      wordWrap
                    >
                      <Column align="left" flexGrow={5}>
                        <HeaderCell>Name</HeaderCell>
                        <Cell>
                          <CustomBorder>
                            <InlineTextEditWithHighlight
                              text="Your name"
                              placeholderText="Name"
                              placeholderTextWidth="50px"
                              padding="2px"
                              width="100px"
                              multiLine={false}
                              handleTextChange={e =>
                                console.log("text changed")
                              }
                            />
                          </CustomBorder>
                        </Cell>
                      </Column>

                      <Column align="center" flexGrow={20}>
                        <HeaderCell>Weight</HeaderCell>
                        {/* <Cell dataKey="weight" /> */}
                        <SliderCell dataKey="weight" />
                      </Column>

                      <Column align="left" flexGrow={30}>
                        <HeaderCell>Description</HeaderCell>
                        <Cell>
                          <CustomBorder>
                            <InlineTextEditWithHighlight
                              text="Time and tide waits for none"
                              placeholderText="Please add something"
                              placeholderTextWidth="200px"
                              padding="5px"
                              width="300px"
                              multiLine={true}
                              handleTextChange={e =>
                                console.log("text changed woohoo")
                              }
                            />
                          </CustomBorder>
                        </Cell>
                      </Column>
                    </Table>
                  </div>
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
