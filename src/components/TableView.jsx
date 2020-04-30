import React from "react";
import VariablesTable from "./VariablesTable";
import VariablesOptionsMetricsTable from "./VariablesOptionsMetricsTable";

const TableView = () => {
  return (
    <div style={{ paddingTop: "3%" }}>
      <VariablesTable hideDescription />
      <VariablesOptionsMetricsTable />
    </div>
  );
};

export default TableView;
