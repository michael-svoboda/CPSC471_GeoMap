import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from '@mui/material/InputBase';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { gridColumnGroupsLookupSelector } from "@mui/x-data-grid";

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
  

 
  
// Box component allows us to write the CSS properties right onto the div
const Topbar = () => {
    const [prodset, setProdDataset] = React.useState([]);
    const [gasset, setGasDataset] = React.useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [group, setGroup] = React.useState([]);
    const [groupNames, setGroupNames] = React.useState([]);
    const [well, setWell] = React.useState([]);
    const [UWI, setUWIs] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [alignment, setAlignment] = React.useState(['horizontal', 'vertical']);

    const [isGroupDropdownOpen, setIsGroupDropdownOpen] = React.useState(false);
    const [isWellDropdownOpen, setIsWellDropdownOpen] = React.useState(false);
    
    async function fetchGroupNames() {
      try {
        const response = await fetch('http://localhost:5000/distinct-groups');
        const groupNamesJson = await response.json();
        const groupNames = groupNamesJson.map(item => item.wellgroup);
        setGroupNames(groupNames);
        console.log(groupNames);
      } catch (err) {
        console.error('Error:', err);
      }
    }

    async function fetchWellNames(types, groups) {
      try {
        console.log("Types: ", types)
        console.log("Groups: ", groups)
        const response = await fetch('http://localhost:5000/distinct-wells', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ wellgroups: groups, type: types })
        });
        const UWIsJson = await response.json();
        const UWIs = UWIsJson.map(item => item.UWI);
        setUWIs(UWIs);
        console.log(UWIs);
      } catch (err) {
        console.error('Error:', err);
      }
    }

    async function setSelectedWells(wells){
      const realwells = [].concat(wells);
      try{
      console.log(typeof realwells);
      console.log("Wells", realwells);
      await fetch('http://localhost:5000/selection-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedWells: realwells })
      }).then(response => {
          if (response.ok) {
            console.log('Wells Selected in database');
          } else {
            console.error('Failed to select wells in database');
          }
        })
        .catch(error => console.error(error)) 
     
    }catch (err){
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
    const handleGroupOpen = () => {
      setIsGroupDropdownOpen(true);
      fetchGroupNames();
      // Call your function here to update the data
    };
    
    /*
    const handleGroupClose = () => {
          setIsGroupDropdownOpen(false);
          fetchGroupNames();
        };
    */

    const handleWellOpen = () => {
      setIsWellDropdownOpen(true);
      fetchWellNames(alignment, group);
      // Call your function here to update the data
    };
    
    const handleWellClose = () => {
      setIsWellDropdownOpen(false);
      fetchWellNames(alignment, group);
    };
  
    /*
          React.useEffect(() => {
      if (!fetchCalled) {
        fetchGroupNames();
        setFetchCalled(true);
      }
    }, [fetchCalled]);
    */
    
    
    
    const handleGroupChange = (event) => {
      const selectedValues = event.target.value;
      setGroup(selectedValues);
      console.log("Selected groups:", selectedValues);
      fetchGroupNames();
    };

      const handleWellChange = (event) => {
        const selectedValues = event.target.value;
        setWell(selectedValues); //for selecting wells
        setSelectedWells(selectedValues);
        fetchProdData();
        fetchGasData();
        //fetchWellNames(alignment, group);
        //setFetchCalled(true); // add this line to update fetchCalled state
      };

      const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
          setAlignment(newAlignment);
        };
        console.log("Current Alignment:", newAlignment);
      };

    return (
    <Box display="flex" justifyContent="space-between" p={2} height={80}>
        {/* SELECTION LIST */}
        <FormControl sx={{ m: 0, width: 350, p: 0.2 }}>
        <InputLabel id="demo-multiple-name-label">Selection Group</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          color="secondary"
          id="demo-multiple-name"
          multiple
          value={group}
          onChange={handleGroupChange}
          onOpen={handleGroupOpen}
          //onClose={handleGroupClose}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {groupNames.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, group, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* WELL LIST */}
      <FormControl sx={{ m: 0, width: 350, p: 0.2}}>
        <InputLabel id="demo-multiple-name-label">Well List</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          color="secondary"
          id="demo-multiple-name"
          multiple
          value={well}
          onChange={handleWellChange}
          onOpen={handleWellOpen}
          //onClose={handleWellClose}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {UWI.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, group, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        onChange={handleAlignment}
        aria-label="text alignment"
        orientation="horizontal"
        >
        <ToggleButton value="horizontal" aria-label="horizontal">Horizontal</ToggleButton>
        <ToggleButton value="vertical" aria-label="vertical">Vertical</ToggleButton>
    </ToggleButtonGroup>

        {/* ICONS */}
        <Box display = "flex" >
            <IconButton onClick = {colorMode.toggleColorMode}> 
                {theme.palette.mode === "dark" ? (
                    <DarkModeIcon />
                ) : (
                    <LightModeIcon />
                )}
            </IconButton>
            <IconButton> 
                <NotificationsOutlinedIcon/>
            </IconButton>
            <IconButton> 
                <SettingsOutlinedIcon />
            </IconButton>
            <IconButton> 
                <PersonOutlinedIcon />
            </IconButton>
        </Box> 

    </Box>);
    
};

export default Topbar;