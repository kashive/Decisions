import React, { Component } from "react";
import { Icon, Dropdown, Modal } from "rsuite";
import styled from "styled-components";
import produce from "immer";
import "../../styles/card.less";

const BOLD_COLOR = "#333";

const StyledCard = styled.div`
  background-color: white;
  border: 1px solid #efefef;
`;

const CardBody = styled.div`
  margin-top: 5px;
  margin-left: 10px;
  padding-left: 5px;
  padding-right: 5px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  height: ${props => (props.isVisible ? "300px" : "0")};
  transition: all 0.5s ease 0.15s;
  overflow: hidden;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  line-height: 1.3;
  color: ${BOLD_COLOR};
  font-size: 18px;
`;

const SameLineLeftRightFloat = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardHeaderContainer = styled.div`
  &:hover {
    cursor: pointer;
    //background-color: #f7f8f9;
  }
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
        return <Icon style={{ color: BOLD_COLOR }} icon="ellipsis-h" />;
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

const CardHeaderContent = ({ className, title, dropdownConfig }) => {
  return (
    <SameLineLeftRightFloat className={className}>
      <StyledTitle>{title}</StyledTitle>
      <CardDropdown dropdownConfig={dropdownConfig} />
    </SameLineLeftRightFloat>
  );
};

const StyledCardHeaderContent = styled(CardHeaderContent)`
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
`;

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
        <CardHeaderContainer onClick={this.toggleCollapse}>
          <StyledCardHeaderContent
            title={this.props.title}
            dropdownConfig={this.getDropdownConfig()}
          />
        </CardHeaderContainer>
        <CardFocus
          onCancel={this.disableFullscreen}
          isVisible={
            this.props.enableFullscreen ? this.state.isFullscreen : false
          }
          content={<Card {...this.getCardFocusParams()} />}
        />
        <CardBody isVisible={!this.state.isCollapsed}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit,
        </CardBody>
      </StyledCard>
    );
  }
}

export default Card;
