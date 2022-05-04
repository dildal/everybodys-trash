import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatMessage from './ChatMessage';

export default function ChatModal({currentUser, cableApp}) {
  const {receiver_id} = useParams();
  const [messages, setMessages] = useState([]);
  const [chatID, setChatID] = useState() 

  const [message, setMessage] = useState({
      receiver_id,
      sender_id: '',
      text: '',
  })


  useEffect(() => {
    //create a connection to a chat i guess?
    const chatID = [receiver_id, currentUser.id].sort().join('_')
    fetch(`/messages/${chatID}`)
      .then(res => {
          if(res.ok){
              res.json().then(data => setMessages(data))
          }else{
              console.log("whoops")
          }
    })
    const channel = cableApp.cable.subscriptions.create({channel: "MessagesChannel", chat_id: chatID}, {
        received: (message) => handleReceivedMessage(message)
    })
    setMessage({...message, sender_id: currentUser.id})
    return () => channel.unsubscribe()
  }, [])

  function handleReceivedMessage(message){
      console.log(message)
      setMessages(messages => [...messages, message])
  }

  function handleSubmit(e){
    e.preventDefault();
    fetch('/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(message)
    })
    .then(res => {
       if(!res.ok){
           console.log("ERROR!")
       }
    })
    
  }

  const renderMessages = messages.map(message => {
      return <ChatMessage message={message} key={message.id} currentUser={currentUser}/>
  })


  return (
    <div className="pop-up">
        <h1>Chat with ***</h1>
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
  )
}
