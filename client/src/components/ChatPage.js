import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import ChatsSideBar from './ChatsSideBar';

export default function ChatPage({currentUser, cableApp, messageNotifications, setMessageNotifications}) {
  const {receiver_id} = useParams();
  const [messages, setMessages] = useState([]);
  const [chatID, setChatID] = useState();
  const [channel, setChannel] = useState()
  const location = useLocation()

  const [message, setMessage] = useState({
      receiver_id,
      sender_id: '',
      text: '',
  })

  useEffect(() => {
    if(currentUser){
        setChatID([receiver_id, currentUser.id].sort().join('_'))
    }
  }, [currentUser, location])

  useEffect(() => {
    const channel = cableApp.cable.subscriptions.create({channel: "MessagesChannel"}, {
        received: (message) => handleReceivedMessage(message)
    })

    setChannel(channel)
    if(currentUser){    
        setChatID([receiver_id, currentUser.id].sort().join('_'))
        setMessage({...message, sender_id: currentUser.id})
    }

    fetch(`/mark_as_read/${receiver_id}`, {
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
    })
    return () => channel.unsubscribe()
  }, [currentUser])

  useEffect(() => {
    if(currentUser){
        setChatID([receiver_id, currentUser.id].sort().join('_'))
        fetch(`/messages/${chatID}`)
            .then(res => {
                if(res.ok){
                    res.json().then(data => setMessages(data))
                }else{
                    console.log("whoops")
                }
            }) 
    }
  }, [chatID])

  function handleReceivedMessage(message){
      console.log(message)
      if(currentUser.id === message.receiver_id || currentUser.id === message.sender_id){
        setMessages(messages => [...messages, message])
      }
  }

  function handleSubmit(e){
    e.preventDefault();
    setMessage({...message, text: ''})
    channel.send({...message, chat_id: chatID})
    
  }

  const renderMessages = messages.map(message => {
      return <ChatMessage message={message} key={message.id} currentUser={currentUser}/>
  })



  return (
    currentUser ? 
        (
        <div className="chat-page">
            <ChatsSideBar messageNotifications={messageNotifications} currentUser={currentUser}/>
            <div className="chat-window">
                <h1>Chat with **</h1>
                {renderMessages}
                <form onSubmit={e => handleSubmit(e)}>
                    <input 
                        type="text"    
                        name="text"
                        id="text"
                        placeholder="Send a message..."
                        onChange={e => setMessage({...message, text: e.target.value})}
                        value={message.text}
                    />
                    <input type='submit' value='Send' />
                </form>
            </div>
        </div>) :
        <h1>Loading</h1>
  )
}
