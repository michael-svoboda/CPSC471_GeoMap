import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


const headerData = [
    {
      "UWI": "100/06-04-058-14W5/00",
      "WellName": "BSRL MCLEOD 6-4-58-14",
      "Lahee": "DEV",
      "LicNum": 180405,
      "LicDate": "1995-08-31",
      "CurOperator": "Blue Sky Rsrcs Ltd",
      "KB": 1064.6,
      "GL": 1060.5,
      "TrueVDpth": 2177,
      "MD": 2177,
      "FM_at_TVD": "Jnordegg",
      "DirFlag": "Vertical",
      "SpudDate": "1995-09-07",
      "CompDate": "1995-09-16",
      "RRDate": "1995-09-19",
      "Stat": "Flow GAS"
    },
    {
      "UWI": "100/10-05-058-14W5/00",
      "WellName": "HAMILTON HOME SHINBK 10-5-58-14",
      "Lahee": "NFW",
      "LicNum": 56535,
      "LicDate": "1976-01-12",
      "CurOperator": "Hamilton Bros Cdn Gas",
      "KB": 1038.8,
      "GL": 1034.8,
      "TrueVDpth": 2267.7,
      "MD": 2267.7,
      "FM_at_TVD": "Mbanff",
      "DirFlag": "Vertical",
      "SpudDate": "1976-01-13",
      "CompDate": "1976-01-26",
      "RRDate": "*",
      "Stat": "ABD"
    },
    {
      "UWI": "100/06-07-058-14W5/00",
      "WellName": "SERENPET WINDFALL 6-7-58-14",
      "Lahee": "NPW",
      "LicNum": 182059,
      "LicDate": "1995-11-13",
      "CurOperator": "Repsol O&G Cda Inc",
      "KB": 1077.6,
      "GL": 1072.7,
      "TrueVDpth": 2203.3,
      "MD": 2204,
      "FM_at_TVD": "Jnordegg",
      "DirFlag": "Vertical",
      "SpudDate": "1995-11-15",
      "CompDate": "1995-12-03",
      "RRDate": "1995-12-07",
      "Stat": "ABD Zn"
    },
    {
        "UWI": "100/06-04-058-14W5/00",
        "WellName": "BSRL MCLEOD 6-4-58-14",
        "Lahee": "DEV",
        "LicNum": 180405,
        "LicDate": "1995-08-31",
        "CurOperator": "Blue Sky Rsrcs Ltd",
        "KB": 1064.6,
        "GL": 1060.5,
        "TrueVDpth": 2177,
        "MD": 2177,
        "FM_at_TVD": "Jnordegg",
        "DirFlag": "Vertical",
        "SpudDate": "1995-09-07",
        "CompDate": "1995-09-16",
        "RRDate": "1995-09-19",
        "Stat": "Flow GAS"
      },
      {
        "UWI": "100/10-05-058-14W5/00",
        "WellName": "HAMILTON HOME SHINBK 10-5-58-14",
        "Lahee": "NFW",
        "LicNum": 56535,
        "LicDate": "1976-01-12",
        "CurOperator": "Hamilton Bros Cdn Gas",
        "KB": 1038.8,
        "GL": 1034.8,
        "TrueVDpth": 2267.7,
        "MD": 2267.7,
        "FM_at_TVD": "Mbanff",
        "DirFlag": "Vertical",
        "SpudDate": "1976-01-13",
        "CompDate": "1976-01-26",
        "RRDate": "*",
        "Stat": "ABD"
      },
      {
        "UWI": "100/06-07-058-14W5/00",
        "WellName": "SERENPET WINDFALL 6-7-58-14",
        "Lahee": "NPW",
        "LicNum": 182059,
        "LicDate": "1995-11-13",
        "CurOperator": "Repsol O&G Cda Inc",
        "KB": 1077.6,
        "GL": 1072.7,
        "TrueVDpth": 2203.3,
        "MD": 2204,
        "FM_at_TVD": "Jnordegg",
        "DirFlag": "Vertical",
        "SpudDate": "1995-11-15",
        "CompDate": "1995-12-03",
        "RRDate": "1995-12-07",
        "Stat": "ABD Zn"
      },
]

const columns = [
    { field: 'UWI', headerName: 'UWI', width: 200 },
    //{ field: 'DataType', headerName: 'Data Type', width: 130 },
    //{ field: 'UnitFlag', headerName: 'Unit Flag', width: 130 },
    { field: 'WellName', headerName: 'Well Name', width: 200 },
    { field: 'Lahee', headerName: 'Lahee', width: 130 },
    { field: 'LicNum', headerName: 'Lic Num', width: 130 },
    { field: 'LicDate', headerName: 'Lic Date', width: 130 },
    { field: 'CurOperator', headerName: 'Cur Operator', width: 200 },
    { field: 'KB', headerName: 'KB', width: 130 },
    { field: 'GL', headerName: 'GL', width: 130 },
    { field: 'TrueVDpth', headerName: 'True VDpth', width: 130 },
    { field: 'MD', headerName: 'MD', width: 130 },
    { field: 'FM_at_TVD', headerName: 'FM at TVD', width: 130 },
    { field: 'DirFlag', headerName: 'Dir Flag', width: 130 },
    //{ field: 'SHLong(NAD27)', headerName: 'SH Long (NAD27)', width: 200 },
    { field: 'SpudDate', headerName: 'Spud Date', width: 130 },
    { field: 'CompDate', headerName: 'Comp Date', width: 130 },
    { field: 'RRDate', headerName: 'RR Date', width: 130 },
    { field: 'Stat', headerName: 'Stat', width: 130 },
  ];

const ProductionChart = () => {
  const chartRef = useRef(null);
  const gasChartRef = useRef(null);
  const liquidChartRef = useRef(null);
  const gasData = {
    labels: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7+', 'N2', 'CO2'],
    datasets: [
      {
        label: 'Gas Composition',
        data: [50, 20, 10, 5, 3, 2, 1, 8, 1],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderWidth: 1,
      },
    ],
  };
  const liquidData = {
    labels: ['Oil', 'Water'],
    datasets: [
      {
        label: 'Liquid Composition',
        data: [80, 20],
        backgroundColor: ['rgba(255,99,132,0.4)', 'rgba(54,162,235,0.4)'],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const productionChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Oil Production',
            data: [65, 59, 50, 40, 35, 28, 25, 20, 18, 15, 12, 10, 8, 6, 5, 4, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            fill: false,
            borderColor: 'red',
            tension: 0.1,
          },
          {
            label: 'Water Production',
            data: [3, 3.5, 4, 4.2, 4.5, 5, 5.5, 5.8, 6, 6.2, 6.4, 6.6, 6.8, 7, 7.2, 7.4, 7.6, 7.8, 8, 8.2, 8.4, 8.6, 8.8, 9, 9.2, 9.4, 9.6, 9.8, 10, 10.2],
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
          {
            label: 'Gas Production',
            data: [5, 20, 18, 15, 12, 10, 8, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            fill: false,
            borderColor: 'green',
            tension: 0.1,
          },
        ],
      },
    });
  
    const gasChart = new Chart(gasChartRef.current, {
      type: 'bar',
      data: {
        labels: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7+', 'N2', 'CO2'],
        datasets: [
          {
            label: 'Gas Composition',
            data: [20, 12, 10, 8, 5, 3, 2, 35, 5],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Composition (%)',
              font: {
                size: 16,
              },
            },
          },
          x: {
            title: {
              display: true,
              text: 'Component',
              font: {
                size: 16,
              },
            },
          },
        },
      },
    });
  
    const liquidChart = new Chart(liquidChartRef.current, {
      type: 'bar',
      data: {
        labels: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7+', 'N2', 'CO2'],
        datasets: [
          {
            label: 'Liquid Composition',
            data: [50, 20, 15, 7, 5, 2, 1, 0, 0],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Composition (%)',
              font: {
                size: 16,
              },
            },
          },
          x: {
            title: {
              display: true,
              text: 'Component',
              font: {
                size: 16,
              },
            },
          },
        },
      },
    });
  
    return () => {
      productionChart.destroy();
      gasChart.destroy();
      liquidChart.destroy();
    };
  }, []);
  
  //components = {{ Toolbar: GridToolbar }}
  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column', p: 2 }}>
  <Box sx={{ flex: '1', display: 'flex', height: '50%', p: 2 }}>
    <Box sx={{ flex: '1', height: '100%', p: 0 }}>
      <canvas ref={chartRef} style={{ width: '100%' }} />
    </Box>
    <Box sx={{ flex: '1', width : '100%', p: 0 }}>
      <canvas ref={gasChartRef} style={{ width: '100%' }} />
    </Box>
  </Box>
  <Box sx={{ flex: '1', height: '50%', width: '100%', p: 2 }}>
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={headerData} columns={columns} components={{ Toolbar: GridToolbar }} getRowId={(row) => row.UWI} pageSize={10} />
    </div>
  </Box>
</Box>
  );
  
  
};

export default ProductionChart;
