import React from "react";
import { connect } from "react-redux";
import { Button } from "rsuite";
import { onDecisionSelect } from "../redux/actions/controlStateActions";
import { Sidenav, Nav, Dropdown, Icon, Navbar, Sidebar } from "rsuite";
import "../styles/sidenav.less";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
  color: "#f8f9fa",
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar className="nav-toggle" style={{ backgroundColor: "#141a25" }}>
      <Navbar.Body>
        <Nav pullRight>
          <Nav.Item onClick={onChange}>
            <Icon
              style={{ color: "white" }}
              icon={expand ? "angle-left" : "angle-right"}
            />
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

const SideNavInternal = ({
  expand,
  expandWidth,
  collapseWidth,
  decisionIdsAndTitles,
  currentDecisionId,
  onDecisionSelect,
  handleToggle,
}) => {
  return (
    <Sidebar
      style={{
        backgroundColor: "#141a25",
        position: "fixed",
        height: "100%",
        zIndex: "12",
      }}
      width={expand ? expandWidth : collapseWidth}
      collapsible
    >
      <Sidenav.Header>
        <div style={headerStyles}>
          <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
          <span style={{ marginLeft: 12 }}> Decisions</span>
        </div>
      </Sidenav.Header>
      <Sidenav expanded={expand} style={{ backgroundColor: "#141a25" }}>
        <Sidenav.Body>
          <Nav>
            <Dropdown
              menuStyle={{
                backgroundColor: "#141a25",
                overflow: "hidden",
                borderRadius: "0px 6px 6px 0px",
              }} //changes the right menu background
              trigger={["hover", "click"]}
              title={<p style={{ color: "white" }}>Decisions</p>}
              icon={<Icon icon="list" style={{ color: "white" }} />}
              placement="rightStart"
            >
              {decisionIdsAndTitles
                .filter((decision) => decision.title)
                .map((decision) => {
                  return (
                    <Dropdown.Item
                      key={decision.id}
                      active={decision.id === currentDecisionId}
                      renderItem={() => (
                        <Button
                          appearance="link"
                          className="dropdown-item rs-dropdown-item-content"
                          style={{
                            backgroundColor: "#141a25",
                            textAlign: "left",
                            marginLeft: "5%",
                          }}
                          onClick={() => onDecisionSelect(decision.id)}
                        >
                          <span
                            style={{ color: "white" }}
                            dangerouslySetInnerHTML={{ __html: decision.title }}
                          />
                        </Button>
                      )}
                    />
                  );
                })}
            </Dropdown>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle expand={expand} onChange={handleToggle} />
    </Sidebar>
  );
};
const mapStateToProps = (state) => {
  const { byId, allIds } = state.entities.decisions;
  const decisionIdsAndTitles = allIds
    .map((id) => byId[id])
    .map((decision) => ({ id: decision.id, title: decision.title }));
  const currentDecisionId = state.controlState.decisionId;
  return {
    decisionIdsAndTitles,
    currentDecisionId,
  };
};

const actionCreators = {
  onDecisionSelect,
};

export default connect(mapStateToProps, actionCreators)(SideNavInternal);
