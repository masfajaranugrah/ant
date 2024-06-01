import React, { useCallback, useMemo, useRef, useState, useEffect, StrictMode } from "react";
import axios from 'axios';
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule
]);

const TablesCetak = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "500px", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "id" },
    { field: "nim" },
    { field: "nama" },
    { field: "email" },
    { field: "nomer telp" },
    { field: "nomer Antrian" },
    { field: "status" }
  ]);
  const defaultColDef = useMemo(() => ({
    filter: true,
    minWidth: 100,
    flex: 1
  }), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_Antrian);
        const customHeadings = response.data.data.map(item => ({
          "id": item._id,
          "nim": item.user?.nim,
          "nama": item.user?.name,
          "email": item.user?.email,
          "nomer telp": item.user?.phone_number,
          "nomer Antrian": item.nomer_antrian,
          "status": item.status,
        }));
        setRowData(customHeadings);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  const onBtExport = useCallback(() => {
    const names = {};
    gridRef.current.api.forEachNode(node => {
      if (!names[node.data.nama]) {
        names[node.data.nama] = true;
      }
    });
    const performExport = async () => {
      let spreadsheets = [];
      for (const name in names) {
        await gridRef.current.api.setColumnFilterModel("nama", {
          values: [name]
        });
        gridRef.current.api.onFilterChanged();
        if (!gridRef.current.api.isAnyFilterPresent()) {
          throw new Error("Filter not applied");
        }
        const sheet = gridRef.current.api.getSheetDataForExcel({
          sheetName: name
        });
        if (sheet) {
          spreadsheets.push(sheet);
        }
      }
      await gridRef.current.api.setColumnFilterModel("nama", null);
      gridRef.current.api.onFilterChanged();
      gridRef.current.api.exportMultipleSheetsAsExcel({
        data: spreadsheets,
        fileName: "data_antrian.xlsx"
      });
    };
    performExport();
  }, []);

  return (
    <StrictMode>
      <div style={containerStyle}>
        <div className="container">
          <div>
            <button
              onClick={onBtExport}
              style={{ marginBottom: "5px", fontWeight: "bold" }}
            >
              Export to Excel
            </button>
          </div>
          <div className="grid-wrapper">
            <div
              style={gridStyle}
              className={"ag-theme-quartz-dark"}
            >
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
              />
            </div>
          </div>
        </div>
      </div>
    </StrictMode>
  );
};

export default TablesCetak;
