import React, { useEffect, useRef, useState } from 'react';
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

const INTERVAL_TIME = 1000 // 1 sec interval

const ProductionChart = (props) => {
  const [prodset, setProdDataset] = React.useState([]);
  const [gasset, setGasDataset] = React.useState([]);

  const chartRef = useRef(null);
  const gasChartRef = useRef(null);
  const dates = [];
  const oilprod = [];
  const gasprod = [];
  const waterprod = [];

  var C1 = 0;
  var C2 = 0;
  var C3 = 0;
  var C7P = 0; 
  var N2 = 0;
  var CO2 = 0;
  var C6 = 0;
  var He = 0;
  var H2 = 0;
  var H2S = 0;
  var IC4 = 0;
  var IC5 = 0;
  var NC4 = 0;
  var NC5 = 0;
  
  async function fetchProdData() {

    try {
      console.log("hater"); 
      const response = await fetch('http://localhost:5000/prod-data');
      const DataJson = await response.json();
      const Data = DataJson.map(item => item.Data);
      console.log(DataJson);
      if(DataJson!=undefined){
        setProdDataset(DataJson);
      }
      
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async function fetchGasData() {

    try {
      console.log("lover");
      const response = await fetch('http://localhost:5000/gas-data');
      const DataJson = await response.json();
      const Data = DataJson.map(item => item.Data);
      console.log(DataJson);
      if(DataJson!=undefined){
        setGasDataset(DataJson);
      }
      
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async function setCompositions() {
    C1 = gasset[0].avg_C1
    C2 = gasset[0].avg_C2
    C3 = gasset[0].avg_C3
    C7P = gasset[0].avg_C7P
    N2 = gasset[0].avg_N2
    CO2 = gasset[0].avg_CO2
    C6 = gasset[0].avg_C6
    He = gasset[0].avg_He
    H2 = gasset[0].avg_H2
    H2S = gasset[0].avg_H2S
    IC4 = gasset[0].avg_IC4
    IC5 = gasset[0].avg_IC5
    NC4 = gasset[0].avg_NC4
    NC5 = gasset[0].avg_NC5

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


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

  useEffect(() => {
    fetchProdData();
    fetchGasData();
    setCompositions()
    /*
      
    */

    const productionChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: prodset.map(data => data.Date),
        datasets: [
          {
            label: 'Oil Production',
            data: prodset.map(data => data.OIL),
            fill: false,
            borderColor: 'red',
            tension: 0.1,
          },
          {
            label: 'Water Production',
            data: prodset.map(data => data.WATER),
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
          {
            label: 'Gas Production',
            data: prodset.map(data => data.GAS),
            fill: false,
            borderColor: 'green',
            tension: 0.1,
          },
        ],
      },
      options: {
        animation: false
      }
    });
  
    const gasChart = new Chart(gasChartRef.current, {
      type: 'bar',
      data: {
        labels: ['C1', 'C2', 'C3', 'C6', 'C7+', 'N2', 'CO2', 'H2', 'He', 'H2S', 'IC4', 'NC4', 'IC5', 'NC5'],
        datasets: [
          {
            label: 'Gas Composition',
            data: [C1, C2, C3, C6, C7P, N2, CO2, H2, He, H2S, IC4, NC4, IC5, NC5],
            //data: [C1, C2, C3, C7P, N2, CO2],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
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
    };
  }, [prodset]);
  
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