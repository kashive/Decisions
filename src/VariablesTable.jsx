import React, { Component } from "react";
import CustomSlider from "./CustomSlider";
import InlineTextEditWithHighlight from "./InlineTextEditWithHighlight";
import CustomBorder from "./CustomBorder";
import "./table.less";

class VariablesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <table>
        <tr>
          <th style={{ width: "20%" }}>Name</th>
          <th style={{ width: "40%" }}>Weight</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>
            <CustomBorder expandWithContent={false}>
              <InlineTextEditWithHighlight
                text="Name"
                placeholderText="Name"
                placeholderTextWidth="50px"
                padding="5px"
                multiLine={false}
              />
            </CustomBorder>
          </td>
          <td>
            <CustomSlider value={5} />
          </td>
          <td>
            <CustomBorder expandWithContent={false}>
              <InlineTextEditWithHighlight
                text="Germany"
                placeholderText="Name"
                placeholderTextWidth="50px"
                padding="5px"
                multiLine={true}
              />
            </CustomBorder>
          </td>
        </tr>
      </table>
    );
  }
}

export default VariablesTable;
