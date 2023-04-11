import React, { useEffect, useRef } from 'react';
import { useTheme } from "@mui/material";
import { Stack } from '@mui/material';
import Slider from '@mui/material/Slider';
import Chart from 'chart.js/auto';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function valuetext(value) {
  return `${value}°C`;
}
const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 0;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

function getStyles(name, group, theme) {
  return {
    fontWeight:
      group.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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

const WirelineChart = () => {
  const theme = useTheme();
  const chartRef = useRef(null);
  const track1ChartRef = useRef(null);
  const liquidChartRef = useRef(null);
  const option = 'GR1'
  const options = ['GR1','GR2','GR3','GR4']

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
  
    const track1 = new Chart(track1ChartRef.current, {
      type: 'line',
      data: {
        labels: ['1000', '1200', '1400', '1600', '1800', '2000', '2200', '2400', '2600', '2800', '3000'],
        datasets: [
          {
            label: 'Gamma Ray',
            data: [30, 25, 22, 21, 20, 19, 18, 17, 16, 15, 14],
            fill: false,
            borderColor: 'red',
            tension: 0.1,
          },
          {
            label: 'Caliper',
            data: [12, 13, 14, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5],
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
          {
            label: 'SP',
            data: [50, 48, 45, 43, 40, 38, 35, 33, 30, 28, 25],
            fill: false,
            borderColor: 'green',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: 'Depth (ft)',
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
      track1.destroy();
      liquidChart.destroy();
    };
  }, []); 
  
  //components = {{ Toolbar: GridToolbar }}
  return (
  <Box sx={{ display: 'flex', height: '90vh',  flexDirection: 'column', p: 2 }}>
    <Box sx={{ display: 'flex', flex: '5',width: '90%', flexDirection: 'row' }}>
      <Box sx={{ flex: '1', display: 'flex', height: '100%',  p: 2 }}>
      <Stack spacing={1} sx ={{ width: '100%' }}>
      <FormControl sx={{ marginBottom: '2rem' }}>
          <InputLabel id='Pass-label' sx={{ color: 'hsl(260, 50%, 70%)' }}> Pass # </InputLabel>
          <Select label="Gamma" sx={{width: '100%' ,color: 'hsl(260, 50%, 70%)',   borderRadius: '45px' }} >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
        </Select>
        </FormControl>
        <FormControl>
          <InputLabel id='Gamma-Ray'> Gamma-Ray </InputLabel>
          <Select label="Gamma" sx ={{ width: '100%' }}>
          <MenuItem value="Gamma1">GR1</MenuItem>
          <MenuItem value="Gamma2">GR2</MenuItem>
          <MenuItem value="Gamma3">GR3</MenuItem>
        </Select>
        </FormControl>
        
        <FormControl>
          <InputLabel id='SP-label'> SP </InputLabel>
          <Select label="SP">
          <MenuItem value="SP1">SP1</MenuItem>
          <MenuItem value="SP2">SP2</MenuItem>
          <MenuItem value="SP3">SP3</MenuItem>
        </Select>
        </FormControl>

        <FormControl>
          <InputLabel id='NPhi-label'> N_Phi </InputLabel>
          <Select label="SP">
          <MenuItem value="N_Phi1">N_Phi1</MenuItem>
          <MenuItem value="N_Phi2">N_Phi2</MenuItem>
          <MenuItem value="N_Phi3">N_Phi3</MenuItem>
        </Select>
        </FormControl>

        <FormControl>
          <InputLabel id='DPhi-label'> D_Phi </InputLabel>
          <Select label="SP">
          <MenuItem value="D_Phi1">D_Phi1</MenuItem>
          <MenuItem value="D_Phi2">D_Phi2</MenuItem>
          <MenuItem value="D_Phi3">D_Phi3</MenuItem>
        </Select>
        </FormControl>

    </Stack>
      </Box>
      
      <Box sx={{ flex: '4', display: 'flex', height: '100%', width: '100%',  p: 2 }}>
        <Slider
              getAriaLabel={() => 'Temperature'}
              orientation="vertical"
              getAriaValueText={valuetext}
              defaultValue={[20, 37]}
              valueLabelDisplay="auto"
            />
        <Box sx={{ flex: '1', height: '100%', p: 0 }}>
          <canvas ref={liquidChartRef} style={{ width: '100%', height: '100%' }} />
        </Box>
        <Box sx={{ flex: '1', height: '100%', p: 0 }}>
          <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
        </Box>
        <Box sx={{ flex: '1', width : '100%', p: 0 }}>
          <canvas ref={track1ChartRef} style={{ width: '100%', height: '100%' }} />
        </Box>

      </Box>
      </Box>
  
</Box>
  );
  
  
};

export default WirelineChart;
