import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapboxMap from './mapbox';
import { cacheMapData, retrieveMapData } from '../../store/actions/actionsMap';


import { Box, IconButton, Typography, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddTaskIcon from '@mui/icons-material/AddTask';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';



const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Display Contents of Selection
      </Typography>
      <Typography variant="h5" component="div">
        # Horizontals = ___
      </Typography>
      <Typography variant="h5" component="div">
        # Verticals = ___
      </Typography>
      <Typography variant="h5" component="div">
        # Deviated = ___
      </Typography>

    </CardContent>
    <CardActions>
    </CardActions>
  </React.Fragment>
);

function Map() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  
  const [selectionName, setSelectionName] = useState('');
  //const [buttonClicked, setButtonClicked] = useState(false);

  const handleAddButtonClick = () => {
    // Send a fetch request to the backend API with the selectionName
    fetch('http://localhost:5000/save-well-group', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ groupname: selectionName })
    })
    .then(response => {
      if (response.ok) {
        console.log('Wells added to database');
      } else {
        console.error('Failed to add wells to database');
      }
    })
    .catch(error => console.error(error));
  };

  const handleRemoveButtonClick = () => {
    //setButtonClicked(true);
    //setButtonClicked(false);
    // Send a fetch request to the backend API with the selectionName
    fetch('http://localhost:5000/delete-well-group', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ groupname: selectionName })
    })
    .then(response => {
      if (response.ok) {
        console.log('Wells removed from database');
      } else {
        console.error('Failed to remove wells from database');
      }
    })
    .catch(error => console.error(error));
  };

  const handleSelectionNameChange = (event) => {
    setSelectionName(event.target.value);
  };  


  return (
    <div style={{ display: 'flex', flex: 1 }}>
    <div className="mapbox-container" style={{ flex: 4 }} >
      <MapboxMap style={{ flex: 1 }} />
    </div>
    <div style={{ flex: 1, padding: '0 20px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%' }}>
        <Box sx={{ padding: '8px' }}>
          <Fab size="small" color="extended" aria-label="add" onClick={handleRemoveButtonClick}>
            <RemoveIcon style={{ fontSize: '36px' }} />
          </Fab>
        </Box>
        <Box sx={{ flexGrow: 0.5 }}>
          <TextField label={'Selection Name'} id="margin-none" value={selectionName} onChange={handleSelectionNameChange}  />
        </Box>
        <Box sx={{ padding: '8px' }}>
          <Fab size="small" color="extended" aria-label="add" onClick={handleAddButtonClick}>
            <AddIcon style={{ fontSize: '36px' }} />
          </Fab>
        </Box>
      </Box>

      <Box sx={{ width: '100%', marginTop: 2, marginBottom: 2  }}>
        <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Filter</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Filter by basically values and columns from one of the database tables. Could just turn the options
              into dropdowns and like select one. Ex: Company, Formation, etc...
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2d-content" id="pane2d-header">
            <Typography>Color By</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Once again color by certain things, ie: Company, Formation, etc... For this you would probably need
              to generate a list of colors and then assign then to the existing list. It would be nice to have a
              legend somewhere....
            </Typography>
          </AccordionDetails>
        </Accordion>
        

      </Box>
      <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined">{card}</Card>
        </Box>
    </div>
  </div>
    
    
  );
}

export default Map;



