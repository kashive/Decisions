import React from "react";
import { connect } from "react-redux";
import { Button } from "rsuite";
import { onDecisionSelect } from "../redux/actions/controlStateActions";
import { Sidenav, Nav, Dropdown, Icon, Navbar, Sidebar } from "rsuite";
import "../styles/sidenav.less";

const collapseWidth = 56;
const expandWidth = 225;

const headerStyles = {
  padding: 18,
  fontSize: 16,
  fontWeight: "bold",
  whiteSpace: "nowrap",
  overflow: "hidden",
  color: "#f8f9fa"
};

const blackBackground = {
  background: "#141a25"
};

const sideBarStyles = {
  display: "flex",
  flexDirection: "column"
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar className="nav-toggle" style={{ backgroundColor: "#141a25" }}>
      <Navbar.Body>
        <Nav pullRight>
          <Nav.Item
            onClick={onChange}
            style={{
              width: collapseWidth,
              textAlign: "center"
            }}
          >
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

class SideNavInternal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: true
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle() {
    this.setState({
      expand: !this.state.expand
    });
  }

  render() {
    const { expand } = this.state;
    return (
      <Sidebar
        style={(sideBarStyles, blackBackground)}
        width={expand ? expandWidth : collapseWidth}
        collapsible
      >
        <Sidenav.Header>
          <div style={headerStyles}>
            <Icon
              icon="logo-analytics"
              size="lg"
              style={{ verticalAlign: 0 }}
            />
            <span style={{ marginLeft: 12 }}> Decisions</span>
          </div>
        </Sidenav.Header>
        <Sidenav expanded={expand} style={{ backgroundColor: "#141a25" }}>
          <Sidenav.Body>
            <Nav>
              <Dropdown
                menuStyle={{ backgroundColor: "#141a25" }} //changes the right menu background
                trigger="hover"
                title={<p style={{ color: "white" }}>Decisions</p>}
                icon={<Icon icon="list" style={{ color: "white" }} />}
                placement="rightStart"
              >
                {this.props.decisionIdsAndTitles
                  .filter(decision => decision.title)
                  .map(decision => {
                    return (
                      <Dropdown.Item
                        key={decision.id}
                        active={decision.id === this.props.currentDecisionId}
                        renderItem={() => (
                          <Button
                            appearance="link"
                            className="dropdown-item rs-dropdown-item-content"
                            style={{
                              backgroundColor: "#141a25",
                              textAlign: "left",
                              marginLeft: "5%"
                            }}
                            onClick={this.props.onDecisionSelect.bind(
                              this,
                              decision.id
                            )}
                          >
                            <span style={{ color: "white" }}>
                              {decision.title}
                            </span>
                          </Button>
                        )}
                      />
                    );
                  })}
              </Dropdown>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={this.handleToggle} />
      </Sidebar>
    );
  }
}
const mapStateToProps = state => {
  const { byId, allIds } = state.entities.decisions;
  const decisionIdsAndTitles = allIds
    .map(id => byId[id])
    .map(decision => ({ id: decision.id, title: decision.title }));
  const currentDecisionId = state.controlState.decisionId;
  return {
    decisionIdsAndTitles,
    currentDecisionId
  };
};

const actionCreators = {
  onDecisionSelect
};

export default connect(mapStateToProps, actionCreators)(SideNavInternal);
