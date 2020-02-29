import React from "react";
import SideNavInternal from "./SideNavInternal";

import { Container, Header, Content, PanelGroup, Panel, Li } from "rsuite";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Require Font Awesome.
import "font-awesome/css/font-awesome.css";

import FroalaEditor from "react-froala-wysiwyg";

function App() {
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
              height: "8vh",
              borderBottom: "1px solid",
              borderColor: "#dbdce0"
            }}
          >
            <FroalaEditor config={{ toolbarInline: true, toolbarButtons: [] }}>
              <h3 style={{ marginLeft: "30px", marginTop: "1vh" }}>
                Decisions
              </h3>
            </FroalaEditor>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed
                elementum tempus egestas sed sed risus. Lectus quam id leo in
                vitae turpis massa sed elementum. Diam sit amet nisl suscipit
                adipiscing. Consectetur adipiscing elit pellentesque habitant
                morbi tristique senectus et netus. Volutpat est velit egestas
                dui id ornare. Viverra accumsan in nisl nisi. Sed augue lacus
                viverra vitae congue eu consequat ac felis. Nulla pharetra diam
                sit amet. Nulla posuere sollicitudin aliquam ultrices. Odio
                euismod lacinia at quis risus sed vulputate. Blandit cursus
                risus at ultrices. Egestas congue quisque egestas diam in arcu
                cursus euismod. Ornare arcu dui vivamus arcu felis bibendum ut
                tristique. Egestas sed tempus urna et pharetra. Consequat nisl
                vel pretium lectus quam id leo in vitae. Gravida neque convallis
                a cras semper auctor neque. Faucibus in ornare quam viverra
                orci. Porttitor lacus luctus accumsan tortor posuere ac ut
                consequat semper. A diam maecenas sed enim. In fermentum et
                sollicitudin ac orci phasellus. Consequat ac felis donec et odio
                pellentesque.
              </Panel>
              <Panel header="Panel 2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed
                elementum tempus egestas sed sed risus. Lectus quam id leo in
                vitae turpis massa sed elementum. Diam sit amet nisl suscipit
                adipiscing. Consectetur adipiscing elit pellentesque habitant
                morbi tristique senectus et netus. Volutpat est velit egestas
                dui id ornare. Viverra accumsan in nisl nisi. Sed augue lacus
                viverra vitae congue eu consequat ac felis. Nulla pharetra diam
                sit amet. Nulla posuere sollicitudin aliquam ultrices. Odio
                euismod lacinia at quis risus sed vulputate. Blandit cursus
                risus at ultrices. Egestas congue quisque egestas diam in arcu
                cursus euismod. Ornare arcu dui vivamus arcu felis bibendum ut
                tristique. Egestas sed tempus urna et pharetra. Consequat nisl
                vel pretium lectus quam id leo in vitae. Gravida neque convallis
                a cras semper auctor neque. Faucibus in ornare quam viverra
                orci. Porttitor lacus luctus accumsan tortor posuere ac ut
                consequat semper. A diam maecenas sed enim. In fermentum et
                sollicitudin ac orci phasellus. Consequat ac felis donec et odio
                pellentesque.
              </Panel>

              <Panel header="Panel 3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Nulla pharetra diam sit amet nisl suscipit adipiscing. Sed
                elementum tempus egestas sed sed risus. Lectus quam id leo in
                vitae turpis massa sed elementum. Diam sit amet nisl suscipit
                adipiscing. Consectetur adipiscing elit pellentesque habitant
                morbi tristique senectus et netus. Volutpat est velit egestas
                dui id ornare. Viverra accumsan in nisl nisi. Sed augue lacus
                viverra vitae congue eu consequat ac felis. Nulla pharetra diam
                sit amet. Nulla posuere sollicitudin aliquam ultrices. Odio
                euismod lacinia at quis risus sed vulputate. Blandit cursus
                risus at ultrices. Egestas congue quisque egestas diam in arcu
                cursus euismod. Ornare arcu dui vivamus arcu felis bibendum ut
                tristique. Egestas sed tempus urna et pharetra. Consequat nisl
                vel pretium lectus quam id leo in vitae. Gravida neque convallis
                a cras semper auctor neque. Faucibus in ornare quam viverra
                orci. Porttitor lacus luctus accumsan tortor posuere ac ut
                consequat semper. A diam maecenas sed enim. In fermentum et
                sollicitudin ac orci phasellus. Consequat ac felis donec et odio
                pellentesque.
              </Panel>
            </PanelGroup>
          </Content>
        </Container>
      </Container>
    </div>
  );
}

export default App;
