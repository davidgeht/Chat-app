import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import ConvoList from "./components/convoList/index";
import Chatroom from "./components/chatroom/index";
import Login from './components/login/index';

import {useAuth} from './auth/context/authContext';
import './App.css'

function App() {
  const {user}=useAuth();
  return (
    
      <Router>
        <div className="App">
          <Switch>
          <Route exact path='/'>
            {user ? <ConvoList/>:<Login/>}
          </Route>
          <Route path='/chatroom'>
            <Chatroom/>
          </Route>
        </Switch>
        </div>
      </Router>
    
  );
}

export default App;
