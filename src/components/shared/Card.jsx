import React, { Component } from "react";
import { Modal } from "rsuite";
import { CustomDropdown } from "./CustomDropdown";
import styled from "styled-components";
import produce from "immer";
import "../../styles/card.less";

const StyledCard = styled.div`
  background-color: white;
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
  padding: 10px;
  padding-bottom: 15px;
  opacity: ${props => (props.isCollapsed ? 1 : 0)};
  max-height: ${props => (props.isCollapsed ? "1000px" : "0")};
  transition: all 0.4s ease 0.15s;
  overflow: hidden;
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
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom: ${props => (props.isCollapsed ? "1px solid #efefef" : "none")};
  transition: border-bottom 0.5s ease 0.5s;
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
      <StyledCard>
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
        <CardBody isCollapsed={!this.state.isCollapsed}>
          {this.props.body}
        </CardBody>
      </StyledCard>
    );
  }
}

export default Card;
