import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


const INTERVAL_TIME = 1500 // 1 sec interval

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
    </div>
  </Box>
</Box>
  );
  
  
};

export default ProductionChart;