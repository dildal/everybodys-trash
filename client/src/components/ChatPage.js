import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import ChatsSideBar from './ChatsSideBar';

export default function ChatPage({currentUser, cableApp, messageNotifications, setMessageNotifications}) {
  const {receiver_id} = useParams();
  const [messages, setMessages] = useState([]);
  const [chatID, setChatID] = useState();
  const [channel, setChannel] = useState();
  const [chatWith, setChatWith] = useState();
  const location = useLocation()

  const [message, setMessage] = useState({
      receiver_id,
      sender_id: '',
      text: '',
  })

  //set message with receiver and sender id when they exist
  useEffect(() => {
      if(currentUser && receiver_id){
        setMessage({...message, receiver_id: +receiver_id, sender_id: currentUser.id})
      }
  }, [currentUser, receiver_id])

  useEffect(() => {
    if(currentUser){
        setChatID([receiver_id, currentUser.id].sort().join('_'))
        setChatWith(() => {
            const partner = currentUser.partners.find(p => {
                return +p.id === +receiver_id
            });
            return partner ? partner.username : "";
        })
    }
  }, [currentUser, location])

  useEffect(() => {

    const channel = cableApp.cable.subscriptions.create({channel: "MessagesChannel"}, {
        received: (message) => handleReceivedMessage(message)
    })
    setChannel(channel)

    if(currentUser){    
        setChatID([receiver_id, currentUser.id].sort().join('_'))
    }

    fetch(`/api/mark_as_read/${receiver_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
    })
    .then(res => {
        if(res.ok) {
            setMessageNotifications(messageNotifications => {
                const newNotifications = {...messageNotifications}
                delete newNotifications[receiver_id];
                return newNotifications;
            })
        } else {
            console.log("Error marking as read");
        }
    });
    return () => channel.unsubscribe

  }, [currentUser])

  useEffect(() => {
    if(currentUser){
        setChatID([receiver_id, currentUser.id].sort().join('_'))
        fetch(`/api/messages/${chatID}`)
            .then(res => {
                if(res.ok){
                    res.json().then(data => setMessages(data))
                }else{
                    console.log("Error fetching chat")
                }
            }) 
    }
  }, [chatID])

  function handleReceivedMessage(message){
      console.log(message);
      if(currentUser){
        if(currentUser.id === +message.receiver_id || currentUser.id === message.sender_id){
            setMessages(messages => [...messages, message])
          }
      }
  }

  function handleSubmit(e){
    e.preventDefault();
    channel.send({...message, chat_id: chatID, sender_id: currentUser.id, receiver_id: receiver_id})
    setMessage({...message, text: ''})
  }

  const renderMessages = messages.map(message => {
      return <ChatMessage message={message} key={message.id} currentUser={currentUser}/>
  })



  return (
    currentUser ? 
        (
        <div className="chat-page">
            <ChatsSideBar messageNotifications={messageNotifications} currentUser={currentUser}/>
            <div className='chat-window'>
                <h1>Chat {chatWith && `with ${chatWith}`}</h1>
                <div className="chat-messages">  
                    {renderMessages}
                </div>
                <form className='comment-form' onSubmit={e => handleSubmit(e)}>
                    <input 
                        type="text"    
                        name="text"
                        id="text"
                        placeholder="Send a message..."
                        onChange={e => setMessage({...message, text: e.target.value})}
                        value={message.text}
                    />
                    <input type='submit' value='Send' className='main-button'/>
                </form>
            </div>
        </div>) :
        <h1>Loading</h1>
  )
}
