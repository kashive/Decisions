import React from "react";
import styled from "styled-components";
import produce from "immer";
import { useState } from "react";
import { CustomDropdown } from "./CustomDropdown";
import { CardFocus } from "./Card";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../../styles/card.less";

const DEFAULT_PADDING = "0%";
const ITEM_GROUP_PADDING = "3%";

const GroupingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3%;
`;

const StyledElementGrouping = styled.div`
  padding: ${props => (props.hasTitle ? "1%" : "0%")};
  background-color: white;
  margin-top: 2%;
  &:nth-child(1) {
    margin-top: 0%;
  }
  & + & {
    margin-top: 2%; //<ElementGrouping> next to <ElementGrouping>
  }
`;

const Element = styled.div`
  flex-grow: 1;
  margin-left: ${prop =>
    prop.isInGroup ? ITEM_GROUP_PADDING : DEFAULT_PADDING};
  margin-right: ${prop =>
    prop.isInGroup ? ITEM_GROUP_PADDING : DEFAULT_PADDING};
  margin-top: 2%;
  &:nth-child(1) {
    margin-top: 0%;
  }
  & + & {
    margin-top: 2%; //<Element> next to <Element>
  }
`;
const GroupingTitle = styled.div`
  margin-bottom: 1%;
`;

const FloatLeftAndRightInline = styled.div`
  display: flex;
  justify-content: space-between;
`;

const buildPropsForCustomDropdown = (
  config,
  isCollapsed,
  setIsCollapsed,
  isFullscreen,
  setIsFullscreen,
  numberOfElements
) => {
  if (!config) return;
  const output = [];
  if (config.enableCollapse && numberOfElements > 0) {
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

const ElementGrouping = ({ id, title, config, elements = [] }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const customDropdownProps = buildPropsForCustomDropdown(
    config,
    isCollapsed,
    setIsCollapsed,
    isFullscreen,
    setIsFullscreen,
    elements.length
  );

  const fullscreenConfig = config
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

  const fullscreenCard = isFullscreen && (
    <CardFocus
      onCancel={() => setIsFullscreen(false)}
      isVisible={config.enableFullscreen ? isFullscreen : false}
      content={
        <ElementGrouping
          config={fullscreenConfig}
          {...{ id, title, elements }}
        />
      }
    />
  );

  const elementComponents = (isCollapsed ? [] : elements).map(item => {
    return (
      <CSSTransition key={item.itemId} timeout={800} classNames="collapse">
        <Element isInGroup={title && true}>{item.content}</Element>
      </CSSTransition>
    );
  });

  return (
    <StyledElementGrouping
      key={id}
      hasTitle={title && true}
      numberOfElements={elementComponents.length}
      isCollapsed={isCollapsed}
    >
      <FloatLeftAndRightInline>
        {title}
        <CustomDropdown config={customDropdownProps} />
      </FloatLeftAndRightInline>
      {fullscreenCard}
      <TransitionGroup>{elementComponents}</TransitionGroup>
    </StyledElementGrouping>
  );
};

export function ListGrouping(props) {
  return (
    <GroupingContainer>
      {props.data.map(entry => {
        const title = entry.title ? (
          <GroupingTitle>{entry.title}</GroupingTitle>
        ) : (
          false
        );
        return (
          <ElementGrouping
            key={entry.id}
            id={entry.id}
            title={title}
            config={entry.dropdownConfig}
            elements={entry.items}
          />
        );
      })}
    </GroupingContainer>
  );
}
