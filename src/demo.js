import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  SortingState,
  SelectionState,
  FilteringState,
  GroupingState,
  SearchState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedSorting,
  IntegratedSelection
} from "@devexpress/dx-react-grid";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFilterRow,
  TableSelection,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
  TableColumnReordering,
  Toolbar,
  SearchPanel
} from "@devexpress/dx-react-grid-material-ui";

import { ProgressBarCell } from "../../../theme-sources/material-ui/components/progress-bar-cell";
import { HighlightedCell } from "../../../theme-sources/material-ui/components/highlighted-cell";
import { CurrencyTypeProvider } from "../../../theme-sources/material-ui/components/currency-type-provider";
import { PercentTypeProvider } from "../../../theme-sources/material-ui/components/percent-type-provider";
import { BooleanTypeProvider } from "../../../theme-sources/material-ui/components/boolean-type-provider";

import { generateRows, globalSalesValues } from "../../../demo-data/generator";

const Cell = (props) => {
  const { column } = props;
  if (column.name === "discount") {
    return <ProgressBarCell {...props} />;
  }
  if (column.name === "amount") {
    return <HighlightedCell {...props} />;
  }
  return <VirtualTable.Cell {...props} />;
};

const getRowId = (row) => row.id;

export default () => {
  const [columns] = useState([
    { name: "product", title: "Product" },
    { name: "region", title: "Region" },
    { name: "sector", title: "Sector" },
    { name: "channel", title: "Channel" },
    { name: "amount", title: "Sale Amount" },
    { name: "discount", title: "Discount" },
    { name: "saleDate", title: "Sale Date" },
    { name: "customer", title: "Customer" },
    { name: "units", title: "Units" },
    { name: "shipped", title: "Shipped" }
  ]);
  const [rows] = useState(
    generateRows({
      columnValues: { id: ({ index }) => index, ...globalSalesValues },
      length: 200000
    })
  );
  const [tableColumnExtensions] = useState([
    { columnName: "amount", align: "right" },
    { columnName: "units", align: "right" }
  ]);
  const [currencyColumns] = useState(["amount"]);
  const [percentColumns] = useState(["discount"]);
  const [booleanColumns] = useState(["shipped"]);

  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <DragDropProvider />

        <FilteringState
          defaultFilters={[{ columnName: "saleDate", value: "2016-02" }]}
        />
        <SearchState />
        <SortingState
          defaultSorting={[
            { columnName: "product", direction: "asc" },
            { columnName: "saleDate", direction: "asc" }
          ]}
        />
        <GroupingState
          defaultGrouping={[{ columnName: "product" }]}
          defaultExpandedGroups={["EnviroCare Max"]}
        />
        <SelectionState />

        <IntegratedFiltering />
        <IntegratedSorting />
        <IntegratedGrouping />
        <IntegratedSelection />

        <CurrencyTypeProvider for={currencyColumns} />
        <PercentTypeProvider for={percentColumns} />
        <BooleanTypeProvider for={booleanColumns} />

        <VirtualTable
          columnExtensions={tableColumnExtensions}
          cellComponent={Cell}
        />
        <TableHeaderRow showSortingControls />
        <TableColumnReordering
          defaultOrder={columns.map((column) => column.name)}
        />
        <TableFilterRow showFilterSelector />
        <TableSelection showSelectAll />
        <TableGroupRow />
        <Toolbar />
        <SearchPanel />
        <GroupingPanel showSortingControls />
      </Grid>
    </Paper>
  );
};
