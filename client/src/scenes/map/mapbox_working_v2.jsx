import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
//import { useSelector, useDispatch } from 'react-redux';
//import { setCachedFeatureNames } from '../../store/actions';
import * as turf from '@turf/turf';
//import SQLHandler from '../../utils/sqlHandler';

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
        10,
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
        8,
        1,
        10,
        0
      ]
    }
  });

  

  map.addLayer({
    'id': 'out-lines',
    'type': 'line',
    'source': 'horizontal_wells',
    'paint': {
      'line-color': 'rgba(0, 0, 0, 1)', // Rose red line color
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

  

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    // Select which mapbox-gl-draw control buttons to add to the map.
    controls: {
    polygon: true,
    trash: true
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    


    });
    map.addControl(draw);
    // Listen for draw.create event
    
    map.on('draw.create', selectWells);
    map.on('draw.delete', selectWells);
    map.on('draw.update', selectWells);

    function getMapPixelBounds(map) {
      const container = map.getContainer();
      const rect = container.getBoundingClientRect();
      const bounds = [
        [rect.left, rect.top], // top left corner
        [rect.right, rect.bottom], // bottom right corner
      ];
      return bounds;
    }

    function selectWells(e) {
      const selectedFeatures = draw.getAll().features;
      console.log("Features: ", selectedFeatures)
      const bbox = turf.bbox(selectedFeatures[0].geometry); // get bounding box of selected shape
      const nw = map.project([bbox[0], bbox[3]]); // get northwest corner in pixel coordinates
      const se = map.project([bbox[2], bbox[1]]); // get southeast corner in pixel coordinates
      const pixelBbox = [nw.x, se.y, se.x, nw.y];
      const test_pix = getMapPixelBounds(map)
      console.log("Pixel box: ", pixelBbox)
      console.log("Fullscreen box: ", test_pix)
      const features = map.queryRenderedFeatures(test_pix, { layers: ['v_wells', 'h_wells'] });
      console.log("Selected features: ", features);
      }


          
        });
    });

    
      

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="mapbox-container" style={{ width: 'flex', height: '550px' }} />;
}

export default MapboxMap;

