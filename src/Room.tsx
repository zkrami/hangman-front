import React from 'react';
import axios from 'axios'; 
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client'; 

import "./room.css"; 
class Room extends React.Component<any , any> {
  socket: SocketIOClient.Socket | null = null;
  
  constructor(props:any){
    super(props);
    // path = /room/:room 

    let room = this.props.match.params.room ; 
    this.state = { 
      room : room ,
      connected : false , 
      users : {} , 
      letters : ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "m", "n", "o", "l", "p", "q", "r", "s", "t", "u", "y", "v", "w", "x", "z"].map(e => ({ letter : e , clikced : false }))
    }; 
    
  }
  getStoreId(){
    let id = localStorage.getItem("id");
    if(!id) return ""; 
    return id ; 
  }
  storeId(id:string){
    localStorage.setItem("id" , id); 
  }
  markLetter(letter:string){
    console.log("Mark Letter " , letter) ; 
    let letters = this.state.letters; 
    let found = letters.find( (e:any) => e.letter == letter ); 
    found.clicked = true ; 
    this.setState({letters});

  }
  componentDidMount(){

    const socket = io("http://localhost:3000" );     
    socket.on("connect" , () => {
       console.log("connected to server"); 
       this.setState({connected : true}); 
    });
    socket.on("disconnect" , ()=> {
      console.log("disconnected to server"); 
      this.setState({connected : false}); 
    }); 
    socket.on("id" , (id : string ) => {
        console.log("My Id " , id) ; 
        this.storeId(id); 
        this.setState({id:id}); 
    });
    socket.on("user-joined" , (users:any) => { // user has joined my room 
      console.log("user joined" , users) ; 
      this.setState({users:users}); 
    }); 
    socket.on("move-recieved" , ({letter} : any ) => {
      this.markLetter(letter); 
    })
    let id = this.getStoreId(); 

    socket.emit("join-room" , {room : this.state.room , id : id }); 
     
    this.socket = socket;  
  }
  letterClick(letter:string){
    
    this.socket?.emit("move" , {
      player : this.state.id , 
      move : letter,
      room : this.state.room 
    });
  }
 
  render(){
    return (
      <div className="App">
           <p>
           {this.state.connected && <span>Connected </span>}
           {!this.state.connected && <span>Disconnected </span>}
         </p>

         <div className="user-list">
           <h3>User List</h3>
           <ul>
             { Object.keys(this.state.users).map( (user:any) => <li key={user}>User: {user}</li>)}
           </ul>
         </div>
         <div className="control-wrapper">              
              {this.state.letters.map( (e:any) => <div className={ e.clicked ? "success" : "" }  key={e.letter} onClick= {() => this.letterClick(e.letter) }>{e.letter}</div> )}

         </div>
      


      </div>
    );
  } 
}


export default withRouter(Room); 
