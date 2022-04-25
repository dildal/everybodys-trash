import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Map, {Marker, Source, Layer} from 'react-map-gl';
import {distance} from '@turf/turf';

import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [trash, setTrash] = useState([]);
  const [geoJSON, setGeoJSON] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([-75.1652215, 39.9525839])

  console.log(distance)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation([position.coords.longitude, position.coords.latitude])
    })
  }, [])

  useEffect(() => {

    fetch("/trashes")
      .then((r) => r.json())
      .then((trash) => {
        setTrash(trash);
        setGeoJSON(trash.map(trash => {
          return {
            type: "Feature",
            geometry: {
              type: 'Point',
              coordinates: [trash.longitude, trash.latitude]
            },
            properties: {
              picture: trash.picture,
              description: trash.description,
              title: trash.title,
              isHeavy: trash.isHeavy,
              category: trash.category,
              distance: distance(currentLocation, [trash.longitude, trash.latitude])
            },
            id: trash.id
          }
        }))
      });
  }, [currentLocation]);

  const layerStyle = {
    id: 'trash-icon', 
    type: 'symbol',
    layout: {
      'icon-image': 'green-fill-pin'
    }
  }

  function handleClick(e){
    console.log(e.features[0].properties)
  }

  return (
    <div className="App">
      <div className='map-container'>
      <Map
        initialViewState={{
          latitude: 39.9525839,
          longitude: -75.1652215,
          zoom: 12.5
        }}
        mapStyle="mapbox://styles/mddally/ck91ip5tc0s2f1iqipugocf9q"
        mapboxAccessToken={process.env.REACT_APP_API_KEY}
        interactiveLayerIds={["trash-icon"]}
        onClick={(e) => handleClick(e)}
      >
        <Source id="trash-data" type="geojson" data={{type: 'FeatureCollection', features: geoJSON}}>
          <Layer {...layerStyle} />
        </Source>
        <Marker longitude={currentLocation[0]} latitude={currentLocation[1]} anchor="bottom" style={{height:'20px', width: '20px'}}/>
      </Map>
      </div> 
    </div>
  );
}

export default App;
