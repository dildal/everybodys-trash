import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useCallback} from 'react';
import Header from './components/Header';
import { Switch, Route, Link, useParams, useLocation } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import BulletinBoard from './components/BulletinBoard';
import NewPostForm from './components/NewPostForm';
import EditPostForm from './components/EditPostForm';
import About from './components/About';
import Navbar from './components/Navbar';

import 'mapbox-gl/dist/mapbox-gl.css';
import ChatPage from './components/ChatPage';
import WishPage from './components/WishPage';
import MapView from './components/MapView';

function App({cableApp}) {
  const [currentLocation, setCurrentLocation] = useState([-75.1652215, 39.9525839]);
  const [currentUser, setCurrentUser] = useState();
  const [messageNotifications, setMessageNotifications] = useState({});
  const {receiver_id} = useParams() || null;
  const [channel, setChannel] = useState();
  
  const location = useLocation();




  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setCurrentLocation([position.coords.longitude, position.coords.latitude])
  //   })
  
  // }, [])

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
              let unreads = {};
              console.log(data);
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

        setChannel(channel)
        return () => channel.unsubscribe
      }
  }, [currentUser])

  function getChatName() {
    return messageNotifications[receiver_id].sender_name
  }

  function handleReceivedNotification(notification){
    console.log(`I ${currentUser.username} got a message`);
    console.log("Notification!!!!", notification)
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
    return <Link to={`/messages/${sender_id}`} className="chat-notification" key={sender_id}>
        <h3>{messageNotifications[sender_id][0].sender_name} <span className="notification-number">{messageNotifications[sender_id].length}</span></h3>
      </Link>
    })

  return (
    <div className="App">
      <Header 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        mapHeader={location.pathname === '/trash'}
        setMessageNotifications={setMessageNotifications}
        channel={channel}
      />
      <div className='main'>
        {location.pathname !== '/trash' && <Navbar currentUser={currentUser}/>}
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
          <Route  path='/trash'>
            <MapView />
          </Route>
          <Route path="/">
            <About />
          </Route>
        </Switch>
      </div>
      
      { (currentUser && messageNotifications) && 
      <div className='chat-notification-bar'>
        {renderMessageNotifications}
      </div>
      }
    </div>
  );
}

export default App;
