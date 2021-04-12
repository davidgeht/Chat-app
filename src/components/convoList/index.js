import React from "react";
import {useHistory, Link} from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {firestore} from '../../auth/firebase/firebase';
import Navbar from "../nav/index";
import {useAuth} from '../../auth/context/authContext';
import contacts from '../../contacts';
import NewConvo from '../newconvo/index';

const ConvoList=()=>{
const history = useHistory();
const { currentUser } = useAuth();
// we want to check if theres already any exisiting conversations with the current user and any other residents.
const convoRef = firestore.collection("conversations");
const query=  convoRef.where("userIds",'array-contains',currentUser._id);
const [convos] = useCollectionData(query, { idField: 'id' });
const {setCurrentUser}=useAuth();

const convoList = convos && convos.map(convo =>{
  let users=convo.userIds
  let name = user.firstName+" "+user.lastName
  // we check which id were having the conversation with
  let recieverID =users.find(id=>{
    return id !== currentUser._id
  })
  // then we match that id with the contacts we have, to display that users information
  let user=contacts.find(contact=>{
      return recieverID == contact._id
  })

  return  (<div className="convo-list" onClick={()=>{
      history.push(`/chatroom/`,  {conversationID:convo.id, name:name })
  }}>
        {name}
    </div>)
})

return(
    <div>
        <Navbar/>
        <NewConvo/>
        <div className="convo-section">
           <h2>Conversations:</h2> 
            {convoList}
        </div>
        <div>
            <h3> change user </h3>
            {/* here i added a button to change the current user to another contact so i can display a conversation  */}
            {/* since were using our own resident ids to identify other users, the auth in this app is just to access the application there is no futher use*/}
            <button onClick={()=>setCurrentUser({
                _id:4,
                firstName:"James",
                lastName:"Smith",
                email:"jamessmith@gmail.com"})}>James Smith</button>
        </div>
    </div>
)
}
export default ConvoList;