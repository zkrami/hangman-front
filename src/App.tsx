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
export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login">
              <Login />
          </Route>
        </Switch>
    </Router>
  );
}

