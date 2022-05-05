import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatMessage from './ChatMessage';

export default function ChatModal({currentUser, cableApp, setUnreadMessages, unreadMessages}) {
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
    const channel = cableApp.cable.subscriptions.create({channel: "MessagesChannel"}, {
        received: (message) => handleReceivedMessage(message)
    })
    if(currentUser){    
        const chatID = [receiver_id, currentUser.id].sort().join('_')
        fetch(`/messages/${chatID}`)
        .then(res => {
            if(res.ok){
                res.json().then(data => setMessages(data))
            }else{
                console.log("whoops")
            }
        })

        fetch('/mark_as_read', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({other_guy: receiver_id})
        })
        .then(res => {
            if(res.ok){
                console.log("Marked as read")
                setUnreadMessages(unreadMessages => {
                    delete unreadMessages[receiver_id]
                    return unreadMessages
                })
            }
        })
        .then(console.log)
        // const channel = cableApp.cable.subscriptions.create({channel: "MessagesChannel", chat_id: chatID}, {
        //     received: (message) => handleReceivedMessage(message)
        // })

        setMessage({...message, sender_id: currentUser.id})
    }
    return () => channel.unsubscribe()
  }, [currentUser])

  function handleReceivedMessage(message){
      console.log(message)
      if(currentUser.id === message.receiver_id || currentUser.id === message.sender_id){
        setMessages(messages => [...messages, message])
      }
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
       setMessage({...message, text: ''})
    })
    
  }

  const renderMessages = messages.map(message => {
      return <ChatMessage message={message} key={message.id} currentUser={currentUser}/>
  })


  return (
    <div className="chat-window">
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
