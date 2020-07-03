import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'; 
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login'; 
import SocketTest from './SocketTest'; 
import CreateRoom from './CreateRoom'; 
import JoinRoom from './JoinRoom'; 
import Room from './Room';
export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/test">
            <SocketTest /> 
          </Route>
          <Route path="/create-room">
              <CreateRoom /> 
          </Route>
          <Route path="/join-room">
              <JoinRoom /> 
          </Route>
          <Route path="/room/:room">
              <Room /> 
          </Route>
        </Switch>
    </Router>
  );
}

