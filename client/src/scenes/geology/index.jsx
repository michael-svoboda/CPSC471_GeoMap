<<<<<<< HEAD
import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';



const Geology = () => {
    useEffect(() => {
      const data1 = [      [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
        [20, 30, 10, 5, 15, 25, 35, 45, 55, 65],
        [40, 35, 25, 15, 5, 10, 20, 30, 40, 50],
        [50, 45, 30, 20, 10, 5, 15, 25, 35, 45],
        [60, 55, 40, 25, 10, 5, 20, 35, 50, 65],
        [70, 65, 50, 35, 20, 15, 30, 45, 60, 75],
        [80, 75, 60, 45, 30, 25, 40, 55, 70, 85],
        [90, 85, 70, 55, 40, 35, 50, 65, 80, 95],
        [100, 95, 80, 65, 50, 45, 60, 75, 90, 105],
      ];

      const data2 = [
        [15, 24, 27, 48, 56, 70, 74, 84, 93, 101],
        [3, 16, 22, 34, 42, 54, 62, 74, 89, 93],
        [25, 31, 9, 7, 16, 23, 30, 43, 58, 60],
        [44, 36, 24, 19, 9, 15, 22, 34, 45, 53],
        [47, 46, 35, 23, 16, 4, 11, 29, 42, 54],
        [60, 54, 45, 29, 7, 3, 29, 44, 53, 71],
        [70, 68, 54, 34, 30, 18, 38, 47, 67, 80],
        [81, 72, 66, 50, 35, 28, 40, 57, 73, 89],
        [94, 91, 79, 55, 43, 30, 54, 67, 83, 100],
        [108, 97, 84, 69, 56, 49, 60, 75, 93, 114]
      ];

      const data3 = [
        [9, 17, 32, 49, 54, 61, 75, 87, 89, 109],
        [4, 14, 24, 33, 45, 50, 67, 71, 82, 92],
        [19, 24, 12, 8, 19, 22, 34, 48, 58, 62],
        [40, 33, 23, 13, 5, 9, 18, 26, 46, 57],
        [52, 42, 28, 20, 6, 1, 15, 21, 30, 47],
        [61, 50, 41, 27, 5, 0, 20, 31, 42, 63],
        [74, 65, 53, 40, 28, 19, 29, 41, 68, 82],
        [85, 77, 63, 45, 33, 21, 35, 50, 71, 89],
        [88, 82, 66, 58, 45, 36, 50, 60, 81, 97],
        [102, 92, 75, 66, 58, 47, 63, 70, 87, 105]
      ];

      const data4 = [
        [13, 26, 33, 43, 58, 69, 72, 89, 91, 103],
        [6, 21, 29, 37, 55, 55, 71, 79, 89, 95],
        [21, 35, 12, 6, 17, 28, 35, 43, 62, 67],
        [50, 34, 33, 20, 9, 16, 28, 32, 47, 54],
        [58, 50, 36, 28, 20, 3, 20, 32, 43, 54],
        [62, 58, 50, 27, 7, 9, 21, 35, 56, 64],
        [78, 72, 51, 39, 22, 19, 30, 50, 63, 81],
        [87, 77, 67, 49, 39, 28, 47, 58, 72, 87],
        [94, 86, 78, 63, 44, 34, 53, 65, 87, 102],
        [107, 95, 86, 70, 56, 45, 61, 76, 93, 114]
      ];
  
      const trace1 = {
        type: 'contour',
        z: data1,
        colorscale: 'RdBu',
        opacity: 0.8,
        zmin: 0,
        zmax: 20,
      };

      const trace2 = {
        type: 'contour',
        z: data2,
        colorscale: 'Viridis',
        opacity: 0.8,
        zmin: 0,
        zmax: 20,
      };

      const trace3 = {
        type: 'contour',
        z: data3,
        colorscale: 'Hot',
        opacity: 0.8,
        zmin: 0,
        zmax: 20,
      };

      const trace4 = {
        type: 'contour',
        z: data4,
        colorscale: 'Blackbody',
        opacity: 0.8,
        zmin: 0,
        zmax: 20,
      };
  
      const layout1 = {
        title: 'Formation Tops Map',
        paper_bgcolor: 'rgb(30,30,30,0.8)',
        plot_bgcolor: '#34495E',
        font: {
          color: '#ECF0F1',
        },
        margin: {
            t: 45,
            r: 10,
            b: 40,
            l: 35,
            pad: 0
          }
      };

      const layout2 = {
        title: 'Isopach Map',
        paper_bgcolor: 'rgb(30,30,30,0.8)',
        plot_bgcolor: '#34495E',
        font: {
          color: '#ECF0F1',
        },
        margin: {
            t: 45,
            r: 10,
            b: 40,
            l: 35,
            pad: 0
          }
      };

      const layout3 = {
        title: 'Porosity Map',
        paper_bgcolor: 'rgb(30,30,30,0.8)',
        plot_bgcolor: '#34495E',
        font: {
          color: '#ECF0F1',
        },
        margin: {
            t: 45,
            r: 10,
            b: 40,
            l: 35,
            pad: 0
          }
      };

      const layout4 = {
        title: 'Permeability Map',
        paper_bgcolor: 'rgb(30,30,30,0.8)',
        plot_bgcolor: '#34495E',
        font: {
          color: '#ECF0F1',
        },
        margin: {
            t: 45,
            r: 10,
            b: 40,
            l: 35,
            pad: 0
          }
      };
  
      Plotly.newPlot('plot1', [trace1], layout1);
      Plotly.newPlot('plot2', [trace2], layout2);
      Plotly.newPlot('plot3', [trace3], layout3);
      Plotly.newPlot('plot4', [trace4], layout4);
    }, []);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>

              <Box sx={{ minWidth: 120, paddingTop: '10px', paddingBottom: '10px' }}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Formation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Montney</MenuItem>
          <MenuItem value={20}>Gething</MenuItem>
          <MenuItem value={30}>Duvernay</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Button variant="contained" size = "large" sx={{ minWidth: 120,  paddingTop: '8px', paddingBottom: '8px', marginLeft: '20px'  }} >KRIGING Interpolate</Button>
    <Button variant="contained" size = "large" sx={{ minWidth: 120,  paddingTop: '8px', paddingBottom: '8px', marginLeft: '780px'  }} >Export .BNA</Button>

            </Toolbar>
          </AppBar>
        </Box>
  
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div id="plot1" style={{ width: '50%', height: '40vh' }}></div>
          <div id="plot2" style={{ width: '50%', height: '40vh' }}></div>
          <div id="plot3" style={{ width: '50%', height: '40vh' }}></div>
          <div id="plot4" style={{ width: '50%', height: '40vh' }}></div>
        </div>
      </div>
    );
  };
  
=======
import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';



const Geology = () => {
    useEffect(() => {
      const data1 = [      [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
        [20, 30, 10, 5, 15, 25, 35, 45, 55, 65],
        [40, 35, 25, 15, 5, 10, 20, 30, 40, 50],
        [50, 45, 30, 20, 10, 5, 15, 25, 35, 45],
        [60, 55, 40, 25, 10, 5, 20, 35, 50, 65],
        [70, 65, 50, 35, 20, 15, 30, 45, 60, 75],
        [80, 75, 60, 45, 30, 25, 40, 55, 70, 85],
        [90, 85, 70, 55, 40, 35, 50, 65, 80, 95],
        [100, 95, 80, 65, 50, 45, 60, 75, 90, 105],
      ];

      const data2 = [
        [15, 24, 27, 48, 56, 70, 74, 84, 93, 101],
        [3, 16, 22, 34, 42, 54, 62, 74, 89, 93],
        [25, 31, 9, 7, 16, 23, 30, 43, 58, 60],
        [44, 36, 24, 19, 9, 15, 22, 34, 45, 53],
        [47, 46, 35, 23, 16, 4, 11, 29, 42, 54],
        [60, 54, 45, 29, 7, 3, 29, 44, 53, 71],
        [70, 68, 54, 34, 30, 18, 38, 47, 67, 80],
        [81, 72, 66, 50, 35, 28, 40, 57, 73, 89],
        [94, 91, 79, 55, 43, 30, 54, 67, 83, 100],
        [108, 97, 84, 69, 56, 49, 60, 75, 93, 114]
      ];

      const data3 = [
        [9, 17, 32, 49, 54, 61, 75, 87, 89, 109],
        [4, 14, 24, 33, 45, 50, 67, 71, 82, 92],
        [19, 24, 12, 8, 19, 22, 34, 48, 58, 62],
        [40, 33, 23, 13, 5, 9, 18, 26, 46, 57],
        [52, 42, 28, 20, 6, 1, 15, 21, 30, 47],
        [61, 50, 41, 27, 5, 0, 20, 31, 42, 63],
        [74, 65, 53, 40, 28, 19, 29, 41, 68, 82],
        [85, 77, 63, 45, 33, 21, 35, 50, 71, 89],
        [88, 82, 66, 58, 45, 36, 50, 60, 81, 97],
        [102, 92, 75, 66, 58, 47, 63, 70, 87, 105]
      ];

      const data4 = [
        [13, 26, 33, 43, 58, 69, 72, 89, 91, 103],
        [6, 21, 29, 37, 55, 55, 71, 79, 89, 95],
        [21, 35, 12, 6, 17, 28, 35, 43, 62, 67],
        [50, 34, 33, 20, 9, 16, 28, 32, 47, 54],
        [58, 50, 36, 28, 20, 3, 20, 32, 43, 54],
        [62, 58, 50, 27, 7, 9, 21, 35, 56, 64],
        [78, 72, 51, 39, 22, 19, 30, 50, 63, 81],
        [87, 77, 67, 49, 39, 28, 47, 58, 72, 87],
        [94, 86, 78, 63, 44, 34, 53, 65, 87, 102],
        [107, 95, 86, 70, 56, 45, 61, 76, 93, 114]
      ];
  
      const trace1 = {
        type: 'contour',
        z: data1,
        colorscale: 'RdBu',
        opacity: 0.8,
        zmin: 0,
        zmax: 20,
      };

      const trace2 = {
        type: 'contour',
        z: data2,
        colorscale: 'Viridis',
        opacity: 0.8,
        zmin: 0,
        zmax: 20,
      };

      const trace3 = {
        type: 'contour',
        z: data3,
        colorscale: 'Hot',
        opacity: 0.8,
        zmin: 0,
        zmax: 20,
      };

      const trace4 = {
        type: 'contour',
        z: data4,
        colorscale: 'Blackbody',
        opacity: 0.8,
        zmin: 0,
        zmax: 20,
      };
  
      const layout1 = {
        title: 'Formation Tops Map',
        paper_bgcolor: 'rgb(30,30,30,0.8)',
        plot_bgcolor: '#34495E',
        font: {
          color: '#ECF0F1',
        },
        margin: {
            t: 45,
            r: 10,
            b: 40,
            l: 35,
            pad: 0
          }
      };

      const layout2 = {
        title: 'Isopach Map',
        paper_bgcolor: 'rgb(30,30,30,0.8)',
        plot_bgcolor: '#34495E',
        font: {
          color: '#ECF0F1',
        },
        margin: {
            t: 45,
            r: 10,
            b: 40,
            l: 35,
            pad: 0
          }
      };

      const layout3 = {
        title: 'Porosity Map',
        paper_bgcolor: 'rgb(30,30,30,0.8)',
        plot_bgcolor: '#34495E',
        font: {
          color: '#ECF0F1',
        },
        margin: {
            t: 45,
            r: 10,
            b: 40,
            l: 35,
            pad: 0
          }
      };

      const layout4 = {
        title: 'Permeability Map',
        paper_bgcolor: 'rgb(30,30,30,0.8)',
        plot_bgcolor: '#34495E',
        font: {
          color: '#ECF0F1',
        },
        margin: {
            t: 45,
            r: 10,
            b: 40,
            l: 35,
            pad: 0
          }
      };
  
      Plotly.newPlot('plot1', [trace1], layout1);
      Plotly.newPlot('plot2', [trace2], layout2);
      Plotly.newPlot('plot3', [trace3], layout3);
      Plotly.newPlot('plot4', [trace4], layout4);
    }, []);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
  
  
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>

              <Box sx={{ minWidth: 120, paddingTop: '10px', paddingBottom: '10px' }}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Formation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Montney</MenuItem>
          <MenuItem value={20}>Gething</MenuItem>
          <MenuItem value={30}>Duvernay</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Button variant="contained" size = "large" sx={{ minWidth: 120,  paddingTop: '8px', paddingBottom: '8px', marginLeft: '20px'  }} >KRIGING Interpolate</Button>
    <Button variant="contained" size = "large" sx={{ minWidth: 120,  paddingTop: '8px', paddingBottom: '8px', marginLeft: '780px'  }} >Export .BNA</Button>

            </Toolbar>
          </AppBar>
        </Box>
  
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div id="plot1" style={{ width: '50%', height: '40vh' }}></div>
          <div id="plot2" style={{ width: '50%', height: '40vh' }}></div>
          <div id="plot3" style={{ width: '50%', height: '40vh' }}></div>
          <div id="plot4" style={{ width: '50%', height: '40vh' }}></div>
        </div>
      </div>
    );
  };
  
>>>>>>> origin/main
  export default Geology;