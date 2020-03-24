import React, { Component } from "react";
import { Icon, Dropdown, Modal } from "rsuite";
import styled, { css } from "styled-components";
import produce from "immer";
import "../../styles/card.less";

const StyledCard = styled.div`
  background-color: white;
  border: 1px solid #efefef;
  position: relative;
`;

const CardBody = styled.div`
  padding: 10px;
  opacity: ${props => (props.isCollapsed ? 1 : 0)};
  max-height: ${props => (props.isCollapsed ? "1000px" : "0")};
  transition: all 0.4s ease 0.15s;
  overflow: hidden;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  line-height: 1.3;
  font-size: 18px;
`;

const CardFooter = styled.div`
  position: absolute;
  top: ${props => (props.isCollapsed ? "70%" : "100%")};
  left: 50%;
  transition: all 0.3s ease 0.15s;
`;

const ExpandIcon = styled(Icon)`
  position: absolute;
  left: 50%;
  transition: all 0.2s ease 0.15s;
  &:hover {
    cursor: pointer;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  color: #333;
  border-bottom: ${props => (props.isCollapsed ? "1px solid #efefef" : "none")};
  transition: border-bottom 0.5s ease 0.5s;
`;

const CardFocus = ({ isVisible, onCancel, content }) => {
  return (
    <Modal
      backdropClassName="fullOpacity"
      size="lg"
      full={true}
      overflow={false}
      show={isVisible}
      onHide={onCancel}
    >
      {content}
    </Modal>
  );
};

const CardDropdown = ({ dropdownConfig }) => {
  if (Object.keys(dropdownConfig).length === 0) return <div>{false}</div>;
  return (
    <Dropdown
      renderTitle={() => {
        return <Icon icon="ellipsis-h" />;
      }}
      trigger="hover"
      placement="rightStart"
      style={{ marginLeft: "10px" }}
    >
      {Object.entries(dropdownConfig).map(entry => {
        return (
          <Dropdown.Item onClick={entry[1]}>
            {entry[0].charAt(0).toUpperCase() + entry[0].slice(1)}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
      isFullscreen: false
    };
  }

  enableFullscreen = () => {
    this.setState({ isFullscreen: true });
  };

  disableFullscreen = () => {
    this.setState({ isFullscreen: false });
  };

  enableCollapse = () => {
    this.setState({ isCollapsed: true });
  };

  disableCollapse = () => {
    this.setState({ isCollapsed: false });
  };

  toggleCollapse = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  getCardFocusParams = () => {
    return produce(this.props, draft => {
      draft.enableDropdown = true;
      draft.enableFullscreen = false;
      draft.enableCollapse = false;
      draft.additionalDropdowns = {
        close: this.disableFullscreen
      };
    });
  };

  getDropdownConfig = () => {
    return produce(this.props.additionalDropdowns || {}, draft => {
      if (!this.props.enableDropdown) return;
      if (this.props.enableFullscreen) {
        draft.focus = this.enableFullscreen;
      }
      if (this.props.enableCollapse && !this.state.isCollapsed) {
        draft.collapse = this.enableCollapse;
      }
      if (this.props.enableCollapse && this.state.isCollapsed) {
        draft.expand = this.disableCollapse;
      }
    });
  };

  render() {
    return (
      <StyledCard>
        <CardHeader isCollapsed={this.state.isCollapsed}>
          <StyledTitle>{this.props.title}</StyledTitle>
          <CardDropdown dropdownConfig={this.getDropdownConfig()} />
        </CardHeader>
        <CardFocus
          onCancel={this.disableFullscreen}
          isVisible={
            this.props.enableFullscreen ? this.state.isFullscreen : false
          }
          content={<Card {...this.getCardFocusParams()} />}
        />
        <CardBody isCollapsed={!this.state.isCollapsed}>
          {this.props.body}
        </CardBody>
        <CardFooter isCollapsed={this.state.isCollapsed}>
          <ExpandIcon
            onClick={this.toggleCollapse}
            size="lg"
            rotate={this.state.isCollapsed ? 0 : 180}
            icon={"angle-double-down"}
          />
        </CardFooter>
      </StyledCard>
    );
  }
}

export default Card;
