import React, { Component } from "react";
import CustomSlider from "./CustomSlider";
import BorderedInlineTextEdit from "./BorderedInlineTextEdit";
import "./table.less";

class VariablesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "40%" }}>Weight</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <BorderedInlineTextEdit
                text="Name"
                placeholderText="Name"
                placeholderTextWidth="50px"
                padding="5px"
                expandWithContent={false}
                multiLine={false}
              />
            </td>
            <td>
              <CustomSlider value={5} />
            </td>
            <td>
              <BorderedInlineTextEdit
                text="Germany"
                placeholderText="Name"
                placeholderTextWidth="50px"
                padding="5px"
                expandWithContent={false}
                multiLine={true}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default VariablesTable;
