import React from 'react';
import dateFormat from 'dateformat';

export default function ChatMessage({message, currentUser}) {
    
  const classSide = currentUser.id === message.receiver_id ? 'message-received' : 'message-sent'
  return (
    <div className={`chat-message ${classSide}`}>
        <p className="message-username">{message.sender.username}</p>
        <p className="message-text">{message.text}</p>
        <p className='sent-at'>{dateFormat(message.created_at)}</p>
    </div>
  )
}
