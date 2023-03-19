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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

 
  
// Box component allows us to write the CSS properties right onto the div
const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

      const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
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
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
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
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ToggleButtonGroup
        color="secondary"
        value={formats}
        onChange={handleFormat}
        aria-label="Platform"
        >
        <ToggleButton value="web">Horizontal</ToggleButton>
        <ToggleButton value="android">Vertical</ToggleButton>
        <ToggleButton value="ios">Deviated</ToggleButton>
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