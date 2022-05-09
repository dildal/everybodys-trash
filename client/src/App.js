import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useCallback} from 'react';
import Map, {Marker, Source, Layer, Popup} from 'react-map-gl';
import {distance} from '@turf/turf';
import TrashList from './components/TrashList';
import NewTrashForm from './components/NewTrashForm'
import Header from './components/Header';
import { Switch, Route, Link, useParams } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import BulletinBoard from './components/BulletinBoard';
import NewPostForm from './components/NewPostForm';
import EditPostForm from './components/EditPostForm';

import 'mapbox-gl/dist/mapbox-gl.css';
import ChatPage from './components/ChatPage';
import WishPage from './components/WishPage';

function App({cableApp}) {
  const [trash, setTrash] = useState([]);
  const [geoJSON, setGeoJSON] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([-75.1652215, 39.9525839]);
  const [addTrash, setAddTrash] = useState(false)
  const [popupInfo, setPopupInfo] = useState();
  const [cursor, setCursor] = useState('auto');
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(['trash-data', 'road-street', 'road-primary', 'road-secondary-tertiary', 'land'])
  const [openTrashForm, setOpenTrashForm] = useState(false)
  const [newTrashCoords, setNewTrashCoords] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [messageNotifications, setMessageNotifications] = useState({});
  const {receiver_id} = useParams() || null;



  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('getting current location')
      setCurrentLocation([position.coords.longitude, position.coords.latitude])
    })
  
  }, [])

  useEffect(() => {
    fetch('/auth')
      .then(res => res.json())
      .then(data => {
        if(data.errors){
          console.log(data.errors)
        }else{
          setCurrentUser(data)
        }
      })
  }, [])

  useEffect(() => {
    if(currentUser){
      fetch(`/unread_messages/${currentUser.id}`)
        .then(res => {
          if(res.ok){
            res.json().then(data => {
              let unreads = {}
              data.forEach(m => {
                const sender_id = m.sender_id
                if(sender_id === receiver_id){
                  return
                }
                if(unreads.hasOwnProperty(sender_id)){
                  unreads = {
                    ...unreads, 
                    [sender_id]: [...unreads[sender_id], m] 
                  }
                } else{
                  unreads = {
                    ...unreads, 
                    [sender_id]: [m] 
                  }
                }
                setMessageNotifications(unreads)
              });
            })
          } else{
            console.log("Unread messages error")
          }
        })
        const channel = cableApp.cable.subscriptions.create({channel: "UserChannel", user: currentUser.id}, {
          received: (notification) => handleReceivedNotification(notification)
        })
        console.log(channel.received)
        return () => channel.unsubscribe
      }
  }, [currentUser])

  function getChatName() {
    return messageNotifications[receiver_id].sender_name
  }

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
      console.log('should be setting pop up info with: ', e.features[0].properties);
      e.originalEvent.stopPropagation();
      setPopupInfo(e.features[0].properties);
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

  function handleReceivedNotification(notification){
    console.log(notification);
    if(notification.type === "message"){
      setMessageNotifications(messageNotifications => {
        const sender_id = notification.sender_id
        if(messageNotifications.hasOwnProperty(notification.sender_id)){
          return {...messageNotifications, [sender_id]: [...messageNotifications[sender_id], notification]}
        } else{
          return {...messageNotifications, [sender_id]: [notification]}
        }
      })
    }
  }



  const renderMessageNotifications = Object.keys(messageNotifications).map(sender_id => {
    return <Link to={`/messages/${sender_id}`}>
      <div className="chat-notification" key={sender_id}>
        <h3>{messageNotifications[sender_id][0].sender_name} <span className="notification-number">{messageNotifications[sender_id].length}</span></h3>
      </div>
      </Link>
    })

  return (
    <div className="App">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Switch>
        <Route exact path='/login'>
          <Login setCurrentUser={setCurrentUser}/>
        </Route>
        <Route exact path='/signup'>
          <Signup setCurrentUser={setCurrentUser}/>
        </Route>
        <Route  path='/bulletin'>
          <BulletinBoard currentUser={currentUser} />
        </Route>
        <Route  path='/posts/new'>
          <NewPostForm currentUser={currentUser}/>
        </Route>
        <Route  path='/posts/:postId/edit'>
          <EditPostForm />
        </Route>
        <Route path='/messages/:receiver_id'>
          <ChatPage currentUser={currentUser} 
            cableApp={cableApp} 
            messageNotifications={messageNotifications}
            setMessageNotifications={setMessageNotifications}
          />
        </Route>
        <Route path="/wishlist">
          <WishPage currentUser={currentUser} currentLocation={currentLocation}/>
        </Route>
        <Route  path='/'>
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
                      setCursor('pointer')
                      setAddTrash(true)
                      setInteractiveLayerIds(interactiveLayerIds.filter(lay => lay !== 'trash-data'))
                  }}
                  >
                    Add Trash
                  </button>
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
            /> 
          </div>
        </Route>
      </Switch>

      { (currentUser && messageNotifications) && renderMessageNotifications}
      </div>
      
  );
}

export default App;
