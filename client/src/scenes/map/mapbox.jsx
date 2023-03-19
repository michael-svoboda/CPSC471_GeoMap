import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
//import { useSelector, useDispatch } from 'react-redux';
//import { setCachedFeatureNames } from '../../store/actions';
import * as turf from '@turf/turf';
//import SQLHandler from '../../utils/sqlHandler';

// https://docs.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/ SELECTION CODE IS FROM THIS EXAMMPLE

let vertical_well_data;

fetch('http://localhost:5000/vert-wells')
  .then(response => response.json())
  .then(data => {
    vertical_well_data = data;
  });
  

let horizontal_well_data;

fetch('http://localhost:5000/horz-wells')
  .then(response => response.json())
  .then(data => {
    horizontal_well_data = data;
  });
  


function MapboxMap() {
  React.useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbC1zdm9ib2RhIiwiYSI6ImNsZWd0bHQ0MzBhYWEzcXBoMzQ0bnF5djgifQ.17y-XKuBkorntWJCXiEWRw';
  
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/dark-v11', // style URL
      projection: 'globe', 
      zoom: 8, // starting zoom
      center: [-116.802514, 54.399590] // // starting center in [lng, lat]
    });
      
    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
    });

    

    map.on('load', () => {

      const canvas = map.getCanvasContainer();
 
      // Variable to hold the starting xy coordinates
      // when `mousedown` occured.
      let start;
      
      // Variable to hold the current xy coordinates
      // when `mousemove` or `mouseup` occurs.
      let current;
      
      // Variable for the draw box element.
      let box;

      

      
      // Fetch the geojson data for wells
      fetch('http://localhost:5000/vert-wells')
        .then(response => response.json())
        .then(data => {


          //console.log("All data: ", data);
          //console.log("vertical data: ", vertical_wells);
          //console.log("horizontal data: ", data.features.filter(feature => feature.geometry.coordinates.length < 3));
          
          // Add a source for wells
          map.addSource('vertical_wells', {
            type: 'geojson',
            data: vertical_well_data,
            //cluster: true,
            //clusterMaxZoom: 9,
            //clusterRadius: 50,
          });

          map.addSource('horizontal_wells', {
            type: 'geojson',
            data: horizontal_well_data,
            //cluster: true,
            //clusterMaxZoom: 9,
            //clusterRadius: 50,
          });

          // Add heatmap layer for zoom level 9 to 12
  map.addLayer({
    id: 'heatmap',
    type: 'heatmap',
    source: 'horizontal_wells',
    maxzoom: 16,
    paint: {
      'heatmap-intensity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        1,
        14,
        3
      ],
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(255, 255, 255, 0)',
        0.2,
        'rgba(140, 211, 255, 1)',
        0.4,
        'rgba(108, 139, 249, 0.65)',
        0.6,
        'rgba(88, 5, 222, 0.8)',
        0.8,
        'rgba(88, 5, 222, 0.8)',
        1,
        'rgba(122, 33, 232, 0.9)'
    ],
      'heatmap-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        10,
        6,
        14,
        3
      ],
      'heatmap-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0,
        1,
        5,
        1,
        7,
        1,
        8,
        0.2,
        10,
        0
      ]
    }
  });

  map.addLayer({
    'id': 'selected-out-lines',
    'type': 'line',
    'source': 'horizontal_wells',
    'paint': {
      'line-color': 'rgba(255, 255, 255, 0.9)', // smokey white
      'line-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        8,
        0.1,
        10,
        1
      ],
      'line-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        12,
        1.5,
        14,
        2.5,
        15,
        3.5
      ],
      'line-gap-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        6,
        0.05,
        7,
        0.2,
        8,
        1.4,
        10,
        2.6,
        14,
        4.6,
        15,
        8.4
      ],
    },
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'minzoom':5,
    'filter': ['in', 'UWI', '']
    
    
  });

  map.addLayer({
    'id': 'out-lines',
    'type': 'line',
    'source': 'horizontal_wells',
    'paint': {
      'line-color': 'rgba(0, 0, 0, 1)', // Black
      'line-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        8,
        0.1,
        10,
        1
      ],
      'line-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        14,
        1,
        15,
        1.5
      ],
      'line-gap-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        6,
        0.05,
        7,
        0.1,
        8,
        0.8,
        10,
        2,
        14,
        4,
        15,
        8
      ],
    },
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'minzoom':5,
    
  });

  

  map.addLayer({
    'id': 'h_wells',
    'type': 'line',
    'source': 'horizontal_wells',
    'paint': {
      'line-color': 'rgba(254, 50, 102, 0.8)', // Rose red line color
      'line-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        8,
        0.2,
        10,
        1
      ],
      'line-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        5,
        0,
        6,
        0.05,
        7,
        0.1,
        8,
        0.8,
        10,
        2,
        14,
        4,
        15,
        8
      ],
    },
    'layout': {
      'line-cap': 'round',
      'line-join': 'round'
    },
    'minzoom': 5
  });

  

  
  

  map.addLayer({
    'id': 'v_wells',
    'type': 'circle',
    'source': 'vertical_wells',
    'paint': {
      'circle-color': '#228B22', // Forest green color
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        1,
        10,
        3,
        12.5,
        5,
        15,
        8
      ],
      'circle-stroke-color': 'rgba(0, 0, 0, 1)', // White-grey stroke color
      'circle-stroke-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        0,
        10,
        0.5,
        14,
        1,
        15,
        1.5
      ],
      'circle-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        0,
        9,
        0.4,
        10,
        0.6,
        12,
        0.8,
        14,
        1
      ],
      

    },
    minzoom: 5
  });

  map.addLayer({
    'id': 'selected_v_wells',
    'type': 'circle',
    'source': 'vertical_wells',
    'paint': {
      'circle-color': 'rgba(255, 215, 0, 1)', // GOLD
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        1,
        10,
        3,
        12.5,
        5,
        15,
        8
      ],
      'circle-stroke-color': 'rgba(10, 10, 10, 0.9)', // White-grey stroke color
      'circle-stroke-width': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        0,
        10,
        0.5,
        14,
        1,
        15,
        1.5
      ],
      'circle-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        8,
        0,
        9,
        0.4,
        10,
        0.6,
        12,
        0.8,
        14,
        1
      ],
      

    },
    minzoom: 5,
    'filter': ['in', 'uwi', '']
  });

  // Set `true` to dispatch the event before other functions
// call it. This is necessary for disabling the default map
// dragging behaviour.
canvas.addEventListener('mousedown', mouseDown, true);
 
// Return the xy coordinates of the mouse position
function mousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return new mapboxgl.Point(
  e.clientX - rect.left - canvas.clientLeft,
  e.clientY - rect.top - canvas.clientTop
  );
}
 
function mouseDown(e) {
  // Continue the rest of the function if the shiftkey is pressed.
  if (!(e.shiftKey && e.button === 0)) return;
  
  // Disable default drag zooming when the shift key is held down.
  map.dragPan.disable();
  
  // Call functions for the following events
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('keydown', onKeyDown);
  
  // Capture the first xy coordinates
  start = mousePos(e);
}

function onMouseMove(e) {
  // Capture the ongoing xy coordinates
  current = mousePos(e);
   
  // Append the box element if it doesnt exist
  if (!box) {
    box = document.createElement('div');
    box.classList.add('boxdraw');
    canvas.appendChild(box);
  }
   
  const minX = Math.min(start.x, current.x),
  maxX = Math.max(start.x, current.x),
  minY = Math.min(start.y, current.y),
  maxY = Math.max(start.y, current.y);
   
  // Adjust width and xy position of the box element ongoing
  const pos = `translate(${minX}px, ${minY}px)`;
  box.style.transform = pos;
  box.style.width = maxX - minX + 'px';
  box.style.height = maxY - minY + 'px';
  }

  function onMouseUp(e) {
    // Capture xy coordinates
    finish([start, mousePos(e)]);
    }
     
    function onKeyDown(e) {
    // If the ESC key is pressed
    if (e.keyCode === 27) finish();
    }
     
    function finish(bbox) {
    // Remove these events now that finish has been called.
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('mouseup', onMouseUp);
     
    if (box) {
      box.parentNode.removeChild(box);
      box = null;
    }
     
    // If bbox exists. use this value as the argument for `queryRenderedFeatures`
    if (bbox) {
      console.log("bbox:", bbox)
      const h_features = map.queryRenderedFeatures(bbox, {layers: ['h_wells']});
      const v_features = map.queryRenderedFeatures(bbox, {layers: ['v_wells']});

      console.log("SELECTED:", v_features)
      
      // Run through the selected features and set a filter
      // to match features with unique FIPS codes to activate
      // the `counties-highlighted` layer.
      const h_uwis = h_features.map((feature) => feature.properties.UWI);
      const v_uwis = v_features.map((feature) => feature.properties.uwi);
      map.setFilter('selected-out-lines', ['in', 'UWI', ...h_uwis]);
      map.setFilter('selected_v_wells', ['in', 'uwi', ...v_uwis]);
    }
     
    map.dragPan.enable();
    }

    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
      layers: ['v_wells', 'h_wells']
      });
       
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
       
       
      });
          
        });
    });

    
      

    return () => {
      map.remove();
    };
  }, []);

  return (
      <div id="map" className="mapbox-container" style={{ width: 'flex', height: '550px' }} />
  );


}

export default MapboxMap;

