import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  console.log(message)
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
    <div className='messageInfo'>
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}  
            alt="" />
            <span>just now</span>
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt="" />}
  </div>
    </div>
  )
}

export default Message

/*Mixin allows the display of your app to be as it is on any device */