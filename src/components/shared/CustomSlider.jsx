import React, { Component } from "react";
import { Slider } from "rsuite";

class CustomSlider extends Component {
  render() {
    const handleStyle = {
      // color: "green"
      // "margin-top": "3px"
      // fontSize: 12,
      // width: 32,
      // height: 22
    };

    return (
      <div>
        <div>
          <Slider
            min={1}
            max={10}
            value={this.props.value}
            className="custom-slider"
            handleStyle={handleStyle}
            progress
            tooltip={false}
            handleTitle={
              <div style={{ marginTop: "15px" }}>{this.props.value}</div>
            }
            onChange={this.props.onHandleMove}
          />
        </div>
      </div>
    );
  }
}
export default CustomSlider;
