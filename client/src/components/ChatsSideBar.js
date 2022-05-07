import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatsSideBar({messageNotifications, currentUser}) {

  function getUnreadsByUser(id){
    if(messageNotifications.hasOwnProperty(id)){
        return <div className="sidebar-bag">{messageNotifications[id].length}</div>
    }  
    return null
  }

  const renderChats = currentUser.partners.map(p => {
      return <Link to={`/messages/${p.id}`} key={p.id}>
          <div className="sidebar-item">
              <h3 className="sidebar-name">{p.username}</h3>
              {getUnreadsByUser(p.id)}
          </div>
      </Link>
  })

  return (
    <div className="chat-sidebar">
        {renderChats}
    </div>
  )
}
