// import React, { useCallback, useMemo, useRef, useState } from "react";
// import axios from "axios";
// import { AgGridReact } from "@ag-grid-community/react";
// import "@ag-grid-community/styles/ag-grid.css";
// import "@ag-grid-community/styles/ag-theme-quartz.css";
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
// import { MenuModule } from "@ag-grid-enterprise/menu";
// import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
// import { ModuleRegistry } from "@ag-grid-community/core";

// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   ExcelExportModule,
//   MenuModule,
//   SetFilterModule,
// ]);

// const TablesCetak = () => {
//   const gridRef = useRef();
//   const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
//   const gridStyle = useMemo(() => ({ height: "900px", width: "100%" }), []);
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([
//     { field: "id", minWidth: 200 },
//     { field: "nim" },
//     { field: "nama", minWidth: 200 },
//     { field: "email" },
//     { field: "nomer telp", minWidth: 150 },
//     { field: "nomer Antrian", minWidth: 150 },
//     { field: "status" },
//     { field: "createdAt" },
//   ]);
//   const defaultColDef = useMemo(() => ({
//     filter: true,
//     minWidth: 100,
//     flex: 1,
//   }), []);

//   const onGridReady = useCallback(() => {
//     axios.get(import.meta.env.VITE_Antrian)
//       .then((res) => {
//         setRowData(res.data.data.map((item) => {
//           const createdAtDate = new Date(item.createdAt);
//           const formattedDate = createdAtDate.toLocaleDateString('id-ID');
//           return {
//             id: item._id,
//             nim: item.user?.nim,
//             nama: item.user?.name,
//             email: item.user?.email,
//             'nomer telp': item.user?.phone_number,
//             'nomer Antrian': item.nomer_antrian,
//             status: item.status,
//             createdAt: formattedDate,
//           };
//         }));
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const onBtExport = useCallback(() => {
//     const uniqueDates = {};
//     gridRef.current.api.forEachNode((node) => {
//       const createdAt = node.data.createdAt;
//       if (createdAt && !uniqueDates[createdAt]) {
//         uniqueDates[createdAt] = true;
//       }
//     });

//     let spreadsheets = [];
//     const performExport = async () => {
//       for (const createdAt in uniqueDates) {
//         // Set a valid sheet name by replacing invalid characters and truncating if necessary
//         const sheetName = createdAt.replace(/[\\\/\?\*\[\]]/g, '').slice(0, 31);
        
//         gridRef.current.api.setFilterModel({
//           createdAt: { filterType: 'set', values: [createdAt] }
//         });
//         gridRef.current.api.onFilterChanged();

//         const sheet = gridRef.current.api.getSheetDataForExcel({
//           sheetName: sheetName,
//         });

//         if (sheet) {
//           spreadsheets.push(sheet);
//         }
//       }

//       // Clear filters after export
//       gridRef.current.api.setFilterModel(null);
//       gridRef.current.api.onFilterChanged();

//       gridRef.current.api.exportMultipleSheetsAsExcel({
//         data: spreadsheets,
//         fileName: "ag-grid.xlsx",
//         exportMode: 'xlsx',
//       });
//       spreadsheets = [];
//     };

//     performExport();
//   }, []);

//   return (
//     <div style={containerStyle}>
//       <div className="container">
//         <div>
//           <button
//             onClick={onBtExport}
//             style={{ marginBottom: "5px", fontWeight: "bold" }}
//           >
//             Export to Excel
//           </button>
//         </div>
//         <div className="grid-wrapper">
//           <div
//             style={gridStyle}
//             className={"ag-theme-quartz-dark"}
//           >
//             <AgGridReact
//               ref={gridRef}
//               rowData={rowData}
//               columnDefs={columnDefs}
//               defaultColDef={defaultColDef}
//               onGridReady={onGridReady}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TablesCetak;


import React, { useCallback, useMemo, useRef, useState } from "react";
import axios from "axios";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
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

const TablesCetak = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "900px", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "id", minWidth: 200 },
    { field: "nim" },
    { field: "nama", minWidth: 200 },
    { field: "email" },
    { field: "nomer telp", minWidth: 150 },
    { field: "nomer Antrian", minWidth: 150 },
    { field: "status" },
    { field: "createdAt" },
  ]);
  const defaultColDef = useMemo(() => ({
    filter: true,
    minWidth: 100,
    flex: 1,
  }), []);

  const onGridReady = useCallback(() => {
    axios.get(import.meta.env.VITE_Antrian)
      .then((res) => {
        setRowData(res.data.data.map((item) => {
          const createdAtDate = new Date(item.createdAt);
          const formattedDate = createdAtDate.toLocaleDateString('id-ID');
          return {
            id: item._id,
            nim: item.user?.nim,
            nama: item.user?.name,
            email: item.user?.email,
            'nomer telp': item.user?.phone_number,
            'nomer Antrian': item.nomer_antrian,
            status: item.status,
            createdAt: formattedDate,
          };
        }));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const formatDateForSheetName = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${day}-${month}-${year}`;
  };

  const onBtExport = useCallback(() => {
    const uniqueDates = {};
    gridRef.current.api.forEachNode((node) => {
      const createdAt = node.data.createdAt;
      if (createdAt && !uniqueDates[createdAt]) {
        uniqueDates[createdAt] = true;
      }
    });

    let spreadsheets = [];
    const performExport = async () => {
      for (const createdAt in uniqueDates) {
        // Format the date for the sheet name
        const sheetName = formatDateForSheetName(createdAt);

        gridRef.current.api.setFilterModel({
          createdAt: { filterType: 'set', values: [createdAt] }
        });
        gridRef.current.api.onFilterChanged();

        const sheet = gridRef.current.api.getSheetDataForExcel({
          sheetName: sheetName,
        });

        if (sheet) {
          spreadsheets.push(sheet);
        }
      }

      // Clear filters after export
      gridRef.current.api.setFilterModel(null);
      gridRef.current.api.onFilterChanged();

      gridRef.current.api.exportMultipleSheetsAsExcel({
        data: spreadsheets,
        fileName: "ag-grid.xlsx",
        exportMode: 'xlsx',
      });
      spreadsheets = [];
    };

    performExport();
  }, []);

  return (
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
              onGridReady={onGridReady}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesCetak;
