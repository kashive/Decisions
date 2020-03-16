import React from "react";

import { Sidenav, Nav, Dropdown, Icon, Navbar, Sidebar } from "rsuite";

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
  background: "black"
};

const sideBarStyles = {
  display: "flex",
  flexDirection: "column"
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar className="nav-toggle">
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
        <Sidenav expanded={expand} defaultOpenKeys={["3"]}>
          <Sidenav.Body>
            <Nav>
              <Dropdown
                eventKey="4"
                trigger="hover"
                title="Decisions"
                icon={<Icon icon="list" />}
                placement="rightStart"
              >
                {(this.props.decisions || [])
                  .filter(d => d.title)
                  .map(decision => {
                    return (
                      <Dropdown.Item
                        style={{ color: "white" }}
                        key={decision.id}
                        active={decision.id === this.props.currentDecisionId}
                        onSelect={this.props.onDecisionSelect.bind(
                          this,
                          decision.id
                        )}
                      >
                        {decision.title}
                      </Dropdown.Item>
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

export default SideNavInternal;
