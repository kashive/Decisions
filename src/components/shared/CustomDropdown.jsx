import React from "react";
import { Dropdown, Icon } from "rsuite";
/**
 * [
 *    text: 'Focus',
 *    callback: () => {}
 * ]
 *
 */

export const CustomDropdown = ({ config }) => {
  if ((config || []).length === 0) return <>{false}</>;
  return (
    <Dropdown
      renderTitle={() => {
        return <Icon icon="ellipsis-h" />;
      }}
      trigger="hover"
      placement="rightStart"
      //style={{ marginLeft: "10px" }}
    >
      {config.map(dropdown => {
        return (
          <Dropdown.Item onClick={dropdown.onClick}>
            {dropdown.text}
          </Dropdown.Item>
        );
      })}
    </Dropdown>
  );
};
