import React,{useRef,useState} from "react";
import firebase from 'firebase/app';
import {useLocation} from 'react-router-dom';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {firestore} from '../../auth/firebase/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import {useAuth} from '../../auth/context/authContext';

const Chatroom =()=>{
    const { currentUser } = useAuth();
    const dummy = useRef();
    const location =useLocation();
    // we get the conversationID between these users from location.state
    const conversationId= location.state.conversationID;
    // we use this message ref to point to the specific conversation user the conversationID, and we are looking at the messages sub collection.
    const messageRef= firestore.collection('conversations').doc(conversationId).collection("messages");
    // we are ordering the messages by the time they were created at so we can display them according to when they were sent by
    const query = messageRef.orderBy('createdAt')
    // we  are using the useCollectionData hook to generate an array with our messages that we then map to display it in our chat message function.
    const [messages] = useCollectionData(query, { idField: 'id'})
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
    
        
        // thats the structure i chose, but based on the design and how we are showing the messages we can add more data. 
        await messageRef.add({
          sentBy: currentUser._id,
          name:currentUser.firstName+" "+currentUser.lastName,
          conversationID:conversationId,
          text: formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
    
        setFormValue('');

        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log(messages);
    return (<div>
        
        <main>
        <h1>{location.state.name}</h1>
    
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    
          <span ref={dummy}></span>
    
        </main>
    
        <form onSubmit={sendMessage}>
    
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
    
          <button type="submit" disabled={!formValue}>🕊️</button>
    
        </form>
      </div>)
}

function ChatMessage(props) {
    const { text, sentBy  } = props.message;
    const { currentUser } = useAuth();
    // used to display which messages are from the current user and which message are from the sender.
    const messageClass = sentBy === currentUser._id ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
}
export default  Chatroom;