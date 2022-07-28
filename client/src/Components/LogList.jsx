import React, {useEffect, useState} from "react";
import { DataGrid, GridToolbar, frFR } from '@mui/x-data-grid';

const LogList = () => {
  const [logs, setLogs] = useState([]);

  const getLogs = async () => {
    const token = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch('http://localhost:3000/logs', requestOptions);
    let logs = await response.json();
    logs = logs.map((log) => ({
      ...log,
      timestamp: new Date(log.timestamp)}
    ));
    console.log(logs);
    setLogs(logs);
  }

  useEffect(() => {
    getLogs().catch(console.error);
  }, []);

  const columns = [
    { field: 'level', headerName: 'sévérité', width: 200 },
    { field: 'message', headerName: 'message', width: 300 },
    { field: 'timestamp', headerName: 'date', width: 300 },
  ];


  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h1>Liste des logs</h1>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid columns={columns} rows={logs} components={{ Toolbar: GridToolbar }} getRowId={(row) => row._id} localeText={frFR.components.MuiDataGrid.defaultProps.localeText} />
      </div>
    </div>
  )
}

export default LogList;