import React, { useContext, useState } from "react";
import {collection,query,where,getDocs,setDoc,doc,updateDoc,serverTimestamp,getDoc,} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";


const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);


  console.log("Searching for:", username); // Check the value of usern


  const handleSearch = async () => {
    console.log("Handle Search");

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

      console.log("Query: ",q);

    try{
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      console.log("Query Snapshot:", querySnapshot); // Check the query results


      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }catch(err){
      console.log("Error:", err); // Log any errors
      setErr(true);
    }

  };

  const handleKey = (e) => {
    //console.log("Handle key");
    e.code === "Enter" && handleSearch();
  };


  const handleSelect = async() => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db, "chats", combinedId));

      if(!res.exists()){
        await setDoc(doc(db,"chats",combinedId),{messages:[]});

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

      }
    }catch(err){

    }

    setUser(null);
    setUsername("")

  };

  return (
    <div className="search">
    <div className="searchForm">
      <input
        type="text"
        placeholder="Find a user"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
    </div>
    {err && <span>No Users</span>}
    {user && (
      <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>
    )}
  </div>
  );
};

export default Search;


/*Sam's uid -   3tbNLNb8lJRKgphBr74pvA2tkCl2 
Shreya's uid - 8D1fOcmWnDatxNsETTfQiNEr4Cb2*/

  /* <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user" onKeyDown={handleKey} onChange={(e)=>setUsername(e.target.value)} value={username} />
      </div>
        {err && <span>No Users</span>}
        {user && (<div className="userChat">
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>)}
    </div> */