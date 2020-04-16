import React from "react";
import { Dropdown, Icon } from "rsuite";
/**
 * [
 *    text: 'Focus',
 *    callback: () => {}
 * ]
 *
 */

export const CustomDropdown = ({ config, style, iconText }) => {
  if ((config || []).length === 0) return false;
  return (
    <Dropdown
      style={style}
      renderTitle={() => {
        return <Icon icon={iconText || "ellipsis-h"} />;
      }}
      trigger="hover"
      placement="rightStart"
    >
      {config.map((dropdown) => {
        return (
          <Dropdown.Item key={dropdown.text} onClick={dropdown.onClick}>
            {dropdown.text}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};
