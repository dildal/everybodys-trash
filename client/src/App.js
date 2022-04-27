import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useCallback} from 'react';
import Map, {Marker, Source, Layer, Popup} from 'react-map-gl';
import {distance} from '@turf/turf';
import TrashList from './components/TrashList';

import 'mapbox-gl/dist/mapbox-gl.css';

function App() {
  const [trash, setTrash] = useState([]);
  const [geoJSON, setGeoJSON] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([-75.1652215, 39.9525839])
  const [popupInfo, setPopupInfo] = useState();
  const [cursor, setCursor] = useState('auto')


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation([position.coords.longitude, position.coords.latitude])
    })
  }, [])

  useEffect(() => {

    fetch("/trashes")
      .then((r) => r.json())
      .then((data) => {
        setTrash(data.map(trash => ({...trash, distance: distance(currentLocation, [trash.longitude, trash.latitude])})));
        setGeoJSON(data.map(trash => {
          return {
            type: "Feature",
            geometry: {
              type: 'Point',
              coordinates: [trash.longitude, trash.latitude]
            },
            properties: {
              ...trash,
              distance: distance(currentLocation, [trash.longitude, trash.latitude])
            },
            id: trash.id
          }
        }))
      });
  }, [currentLocation]);

  const layerStyle = {
    id: 'trash-data', 
    type: 'symbol',
    cursor: 'pointer',
    layout: {
      'icon-image': 'green-fill-pin'
    }
  }

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => {
    console.log('resetting cursor')
    return setCursor('auto'), []
  });




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
          mapboxAccessToken='pk.eyJ1IjoibWRkYWxseSIsImEiOiJjazh5bnh3aGkxa2RkM2Zudm9nY2RmNDQ3In0.D3nJ_3OesFjpqAX3l8neYA'
          interactiveLayerIds={["trash-data"]}
          cursor={cursor}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={(e) => {
            console.log(e)
            console.log('setting popup')
            e.originalEvent.stopPropagation();
            setPopupInfo(e.features[0].properties);
          }}
        >
          <Source id="trash-data" type="geojson" data={{type: 'FeatureCollection', features: geoJSON}}>
            <Layer {...layerStyle} />
            {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
              closeOnClick={false}
            >
              <div>
                <h3>{popupInfo.title}</h3>
              </div>
              <img width="100%" src={popupInfo.picture} />
            </Popup>
          )}
          </Source>
          <Marker longitude={currentLocation[0]} latitude={currentLocation[1]} anchor="bottom" style={{height:'20px', width: '20px'}}/>
        </Map>
      </div>
      <TrashList trash={trash}/> 
    </div>
  );
}

export default App;
