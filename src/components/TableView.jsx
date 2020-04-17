import React from "react";
import VariablesTable from "./VariablesTable";
import VariablesOptionsMetricsTable from "./VariablesOptionsMetricsTable";

const TableView = () => {
  return (
    <>
      <VariablesTable hideDescription />
      <VariablesOptionsMetricsTable />
    </>
  );
};

export default TableView;
