import React from 'react';
import { useAuth } from '../../auth/context/authContext';
import firebase from 'firebase/app';
import contacts from '../../contacts';
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import {firestore} from '../../auth/firebase/firebase';


const NewConvo =()=>{
    const convoRef = firestore.collection('conversations');
    const history = useHistory();
  
    const createConversation =async (user1,user2,name)=>{
        //query checks if theres a conversation between those two users
        let query= await convoRef.where("userIds","array-contains",user1 && user2).get();
        if(query.empty){
            // if empty we create a new one 
          const res= await convoRef.add({
                userIds:[user1,user2],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            history.push(`/chatroom/`,  {conversationID:res.id, name:name})
        }else{
            // if exists we route them to the chat room, we save the conversationID and contact name to location.state, and it wont require us to check the name of the 
            query.forEach(doc=> history.push(`/chatroom/`,  {conversationID:doc.id, name:name}))   
        }

    }
    const {currentUser}=useAuth();

    const contactList = contacts.map(contact=>{
        let userName=contact.firstName+" "+contact.lastName
      return(  <Dropdown.Item onClick={()=>{
           createConversation(currentUser._id,contact._id,userName )
        }}>
        {userName}
        </Dropdown.Item>)
    })
    return(
        // i used the drop as an example, to show the list of contacts.
        <div>
            
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    New Convo
                </Dropdown.Toggle>

            <Dropdown.Menu>
               {contactList}
            </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
export default NewConvo;