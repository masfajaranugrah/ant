import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
 import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
 import axios from 'axios'
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { ModuleRegistry } from "@ag-grid-community/core";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MenuModule,
  SetFilterModule,
]);
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
const TablesCetak = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "500px", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "id" , minWidth: 200},
    { field: "nim" },
    { field: "nama", minWidth: 200 },
    { field: "email" },
    { field: "nomer telp", minWidth: 150 },
    { field: "nomer Antrian" },
    { field: "status" },
  ]);
  // const defaultColDef = useMemo(() => {
  //   return {
  //     filter: true,
  //     minWidth: 100,
  //     flex: 1,
  //   };
  // }, []);

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
    gridRef.current.api.forEachNode(function (node) {
      if (!names[node.data.nama]) {
        names[node.data.nama] = true;
      }
    });
    let spreadsheets = [];
    const performExport = async () => {
      for (const nama in names) {
        await gridRef.current.api.setColumnFilterModel("nama", {
          values: [nama],
        });
        gridRef.current.api.onFilterChanged();
        if (gridRef.current.api.getColumnFilterModel("nama") == null) {
          throw new Error("Example error: Filter not applied");
        }
        const sheet = gridRef.current.api.getSheetDataForExcel({
          sheetName: nama,
        });
        if (sheet) {
          spreadsheets.push(sheet);
        }
      }
      await gridRef.current.api.setColumnFilterModel("nama", null);
      gridRef.current.api.onFilterChanged();
      gridRef.current.api.exportMultipleSheetsAsExcel({
        data: spreadsheets,
        fileName: "data_antrian.xlsx",
      });
      spreadsheets = [];
    };
    performExport();



   }, []);
// console.log(spreadsheets)

const defaultColDef = useMemo(() => {
  return {
    filter: 'agTextColumnFilter',
    floatingFilter: true,
  }
}, []);
  return (
    <div style={containerStyle}>
      <div className="container">
        <div>
       
          <Button
           onClick={onBtExport}
           style={{ marginBottom: "40px", fontWeight: "bold" }}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
       Export to Excel
    </Button>
        </div>
        <div className="grid-wrapper">
          <div
            style={gridStyle}
            className={
              "ag-theme-quartz"
            }
          >
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              onGridReady={rowData}
              rowSelection="multiple"
              suppressRowClickSelection={true}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 25, 50]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesCetak;
