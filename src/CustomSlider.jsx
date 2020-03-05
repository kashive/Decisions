import React, { Component } from "react";
import { Slider } from "rsuite";

class CustomSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }
  render() {
    const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const { value } = this.state;
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
            min={0}
            max={labels.length - 1}
            value={value}
            className="custom-slider"
            handleStyle={handleStyle}
            progress
            tooltip={false}
            handleTitle={
              <div style={{ marginTop: "15px" }}>{labels[value]}</div>
            }
            onChange={v => {
              this.setState({ value: v });
            }}
          />
        </div>
      </div>
    );
  }
}
export default CustomSlider;
