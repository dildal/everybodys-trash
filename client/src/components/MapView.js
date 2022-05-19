import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { distance } from '@turf/turf';
import Map, {Marker, Source, Layer, Popup} from 'react-map-gl';
import NewTrashForm from './NewTrashForm'
import TrashList from './TrashList';
import MapOverlayCitySelect from './MapOverlayCitySelect';


export default function MapView() {
    const [trash, setTrash] = useState([]);
    const [openTrashForm, setOpenTrashForm] = useState(false);
    const [geoJSON, setGeoJSON] = useState([]);
    const [popupInfo, setPopupInfo] = useState();
    const [currentLocation, setCurrentLocation] = useState([-75.1652215, 39.9525839]);
    const [newTrashCoords, setNewTrashCoords] = useState();
    const [cursor, setCursor] = useState('auto');
    const [interactiveLayerIds, setInteractiveLayerIds] = useState(['trash-data', 'road-street', 'road-primary', 'road-secondary-tertiary', 'land'])
    const [addTrash, setAddTrash] = useState(false)
    const map = useRef(null)


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

      function flyTo(coords){
        map.current.flyTo({center: coords, essential: true})
      }
    
      const onMouseEnter = useCallback((e) => { 
        return addTrash ? 
          null :
          e.target.queryRenderedFeatures(e.point, { layers: ['trash-data']}).length ? setCursor('pointer') : setCursor('grab'), []
      });
    
      const onMouseLeave = useCallback(() => {
        return addTrash ? 
          null :
         setCursor('grab'), []
      });
    
      function handleClick(e) {
        const f = e.target.queryRenderedFeatures(e.point, { layers: ['trash-data']})
        if(addTrash) {
          //open new trash form send it long lat coords of click
          setNewTrashCoords({longitude: e.lngLat.lng, latitude: e.lngLat.lat})
          setOpenTrashForm(true)
        } else if(f.length){
          //not adding trash and clicked on trash pin - show popup
          e.originalEvent.stopPropagation();
          setPopupInfo(e.features[0].properties);
          map.current.flyTo({center: [e.features[0].properties.longitude, e.features[0].properties.latitude], essential: true})
          
        } else {
          //just clicked on the map should be draggable do nothing
            setCursor('grab')
            return
        }
      }
    
      function handleRemoveTrash(id){
        setGeoJSON(geoJSON.filter(gj => gj.id !== id));
        setTrash(trash.filter(trash => trash.id !== id));
      }
    
      function handleAddTrash(newTrash){
        setTrash([...trash, newTrash])
        const newGeoJSON = {
          type: "Feature",
          geometry: {
            type: 'Point',
            coordinates: [newTrash.longitude, newTrash.latitude]
          },
          properties: {
            ...newTrash,
            distance: distance(currentLocation, [newTrash.longitude, newTrash.latitude])
          },
          id: newTrash.id
        }
        setGeoJSON([...geoJSON, newGeoJSON])
      }
  return (
    <div className='home-page'>
        <div className='map-container'>
            {openTrashForm && 
                <NewTrashForm 
                {...newTrashCoords}
                setOpenTrashForm={setOpenTrashForm}
                currentLocation={currentLocation}
                handleAddTrash={handleAddTrash}
                interactiveLayerIds={interactiveLayerIds}
                setInteractiveLayerIds={setInteractiveLayerIds}
                setAddTrash={setAddTrash}
                />
            }
            <Map
                ref={map}
                initialViewState={{
                latitude: 39.9525839,
                longitude: -75.1652215,
                zoom: 12.5
                }}
                mapStyle="mapbox://styles/mddally/ck91ip5tc0s2f1iqipugocf9q"
                mapboxAccessToken='pk.eyJ1IjoibWRkYWxseSIsImEiOiJjazh5bnh3aGkxa2RkM2Zudm9nY2RmNDQ3In0.D3nJ_3OesFjpqAX3l8neYA'
                interactiveLayerIds={interactiveLayerIds}
                cursor={cursor}
                onMouseEnter={e => onMouseEnter(e)}
                onMouseLeave={e => onMouseLeave(e)}
                onClick={(e) => handleClick(e) }
            >
                <button 
                    className="toggle-trash-button"
                    onClick={() => {
                    setCursor('crosshair')
                    setAddTrash(true)
                    setInteractiveLayerIds(interactiveLayerIds.filter(lay => lay !== 'trash-data'))
                }}
                >
                    Add Trash
                </button>
                {/* <MapOverlayCitySelect flyTo={flyTo}/> */}
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
                    <div className='popup'>
                    <h3>{popupInfo.title}</h3>
                    </div>
                    <img width="100%" src={popupInfo.picture} />
                </Popup>
                )}
                </Source>
                <Marker longitude={currentLocation[0]} latitude={currentLocation[1]} anchor="bottom" style={{height:'20px', width: '20px'}}/>
            </Map>
        </div>
        <TrashList 
            trash={trash}
            handleRemoveTrash={handleRemoveTrash}
            flyTo={flyTo}
            setPopupInfo={setPopupInfo}
        /> 
    </div>
  )
}
