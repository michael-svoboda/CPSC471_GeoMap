
import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

function MapboxMap() {
  React.useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbC1zdm9ib2RhIiwiYSI6ImNsZWd0bHQ0MzBhYWEzcXBoMzQ0bnF5djgifQ.17y-XKuBkorntWJCXiEWRw';
  
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/dark-v11', // style URL
      projection: 'globe', 
      zoom: 10, // starting zoom
      center: [-113.103205405468714, 53.972339313281282] // // starting center in [lng, lat]
    });
      
    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
    });

    const dataKey = 'mapData'; // set the key for the data in local storage
    const cachedData = localStorage.getItem(dataKey); // check if the data already exists in local storage
    if (cachedData) {
      // use the cached data to render the map
      const data = JSON.parse(cachedData);
      addLayersToMap(data, map);
    } else {
      // make a fetch request to get the data
      fetch('http://localhost:8080/ST37_WG_GCS_NAD83_TWP_46_65.geojson')
        .then(response => {
          console.log("Cache prompt" + response.headers.get('Cache-Control'));
          return response.json();
        })
        .then(data => {
          // store the data in local storage
          localStorage.setItem(dataKey, JSON.stringify(data));
          // add layers to the map
          addLayersToMap(data, map);
        })
        .catch(error => console.error(error));
    }


    
    function addLayersToMap(data, map) {
      // Add a source for wells
      map.addSource('wells', {
        type: 'geojson',
        data: data,
        //cluster: true,
        //clusterMaxZoom: 9,
        //clusterRadius: 50,
      });

              // Add heatmap layer for zoom level 9 to 12
map.addLayer({
  id: 'heatmap',
  type: 'heatmap',
  source: 'wells',
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
  'id': 'points',
  'type': 'circle',
  'source': 'wells',
  'paint': {
    'circle-color': '#228B22', // Forest green color
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
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
      5,
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
      7.5,
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
  minzoom: 10
});

map.addLayer({
  'id': 'out-lines',
  'type': 'line',
  'source': 'wells',
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
  'minzoom':5
});

map.addLayer({
  'id': 'mid-lines',
  'type': 'line',
  'source': 'wells',
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

const draw = new MapboxDraw({
  displayControlsDefault: false,
  // Select which mapbox-gl-draw control buttons to add to the map.
  controls: {
  polygon: true,
  trash: true
  },
  // Set mapbox-gl-draw to draw by default.
  // The user does not have to click the polygon control button first.
  defaultMode: 'draw_polygon'
  });
  map.addControl(draw);


    }  

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="mapbox-container" style={{ width: 'flex', height: '550px' }} />;
}

export default MapboxMap;

