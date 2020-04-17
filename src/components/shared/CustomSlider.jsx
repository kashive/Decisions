import React from "react";
import { Slider } from "rsuite";

const CustomSlider = ({
  value,
  onHandleMove,
  preventRenderOnNoValue,
  style,
}) => {
  if (preventRenderOnNoValue && !value) return false;
  return (
    <Slider
      style={style}
      min={1}
      max={10}
      value={value}
      className="custom-slider"
      progress
      tooltip={false}
      handleTitle={<div style={{ marginTop: "15px" }}>{value}</div>}
      onChange={onHandleMove}
    />
  );
};
export default CustomSlider;
