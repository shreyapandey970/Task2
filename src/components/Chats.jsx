import React, { useState, useEffect, useContext } from 'react';
import {db} from "../firebase";
import {doc, onSnapshot} from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

  const [chats,setChats] = useState([]);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);
  //console.log(currentUser);

  useEffect(() =>{
    const getChats = ()=> {
      console.log('Fetching chats...');

      /*if(doc.exists){console.log('Chats document found:', doc.data());
      setChats(doc.data());}
      else{
        console.log('Chats document not found');
      setChats([]);
      }*/


    const unsub = onSnapshot(doc(db,"userChats",currentUser.uid), (doc) => {
        setChats(doc.data());
    });
    return () => {
      unsub();
      console.log("yes");
    };
  };

    currentUser.uid && getChats();
  },[currentUser.uid])

  
  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload:u})
  }

  return (
    <div className='chats'>
    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => ( 

      <div className='userChat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className='userChatInfo'>
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
  ))}
      

    </div>
  )
}

export default Chats;

/*<div className='userChat'>
        <img src="https://cdn2.vectorstock.com/i/1000x1000/98/11/girl-icon-flat-single-avatarpeaople-icon-from-vector-14449811.jpg" />
        <div className='userChatInfo'>
          <span>Sia</span>
          <p>R u coming?</p>
        </div>
      </div>

      <div className='userChat'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHUndSzxcF1UbSXX3bVILVaUbSIhoc_GEA8g&usqp=CAU" />
        <div className='userChatInfo'>
          <span>Rahul</span>
          <p>Ok</p>
        </div>
      </div> 
      
      
      
      
      
      
      https://cdn2.vectorstock.com/i/1000x1000/98/11/girl-icon-flat-single-avatarpeaople-icon-from-vector-14449811.jpg*/
