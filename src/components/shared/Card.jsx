import React, { Component } from "react";
import { Modal } from "rsuite";
import { CustomDropdown } from "./CustomDropdown";
import styled from "styled-components";
import produce from "immer";
import { CSSTransition } from "react-transition-group";
import "../../styles/card.less";

const StyledCard = styled.div`
  background-color: ${props => props.backgroundColor || "white"};
  border: 1px solid #efefef;
  position: relative;
  &:nth-child(1) {
    margin-top: 0%;
  }
  & + & {
    margin-top: 4%; //<StyledCard> next to <StyledCard>
  }
`;

const CardBody = styled.div`
  padding: 2%;
  padding-top: 0%;
`;

export const StyledTitle = styled.div`
  font-weight: bold;
  line-height: 1.3;
  font-size: 18px;
  color: #333;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
`;

export const CardFocus = ({ isVisible, onCancel, content }) => {
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

const buildPropsForCustomDropdown = (
  config,
  isCollapsed,
  setIsCollapsed,
  isFullscreen,
  setIsFullscreen
) => {
  if (!config) return;
  const output = [];
  if (config.enableCollapse) {
    output.push({
      text: isCollapsed ? "Expand" : "Collapse",
      onClick: () => {
        isCollapsed ? setIsCollapsed(false) : setIsCollapsed(true);
      }
    });
  }
  if (config.enableFullscreen) {
    output.push({
      text: isFullscreen ? "Close" : "Focus",
      onClick: () => {
        isFullscreen ? setIsFullscreen(false) : setIsFullscreen(true);
      }
    });
  }
  return (config.additionalDropdowns || []).concat(output);
};

const fullscreenConfig = (config, setIsFullscreen) =>
  config
    ? produce(config, draft => {
        draft.enableFullscreen = false;
        //need to add close as it won't be covered in buildPropsForCustomDropdown
        draft.additionalDropdowns = (draft.additionalDropdowns || []).concat([
          {
            text: "Close",
            onClick: () => setIsFullscreen(false)
          }
        ]);
      })
    : config;

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false,
      isFullscreen: false
    };
  }

  setIsCollapsed = isCollapsed => {
    this.setState({ isCollapsed });
  };

  setIsFullscreen = isFullscreen => {
    this.setState({ isFullscreen });
  };

  disableFullscreen = () => {
    this.setState({ isFullscreen: false });
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

  render() {
    return (
      <StyledCard backgroundColor={this.props.backgroundColor}>
        <CardHeader isCollapsed={this.state.isCollapsed}>
          <StyledTitle>{this.props.title}</StyledTitle>
          <CustomDropdown
            config={buildPropsForCustomDropdown(
              this.props.dropdownConfig,
              this.state.isCollapsed,
              this.setIsCollapsed,
              this.state.isFullscreen,
              this.setIsFullscreen
            )}
          />
        </CardHeader>
        <CardFocus
          onCancel={this.disableFullscreen}
          isVisible={this.state.isFullscreen}
          content={
            <Card
              {...this.props}
              dropdownConfig={fullscreenConfig(
                this.props.dropdownConfig,
                this.setIsFullscreen
              )}
            />
          }
        />
        <CSSTransition
          in={!this.state.isCollapsed}
          timeout={800}
          classNames="collapse"
          unmountOnExit
        >
          <CardBody isCollapsed={!this.state.isCollapsed}>
            {this.props.body}
          </CardBody>
        </CSSTransition>
      </StyledCard>
    );
  }
}

export default Card;
