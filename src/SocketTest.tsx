import React from 'react';

import io from 'socket.io-client'; 


class SocketTest extends React.Component<any , any> {
  socket: SocketIOClient.Socket | null = null;
  
 
  constructor(props:any){
    super(props);

    this.state = {
      connected : false , 
      messages : []  , 
      serverMessage : ""   
    }; 
   
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
    socket.on("server-message" , (data:any) => {
        this.setState( {messages : [...this.state.messages , data.message ]  });
    }); 
    
    this.socket = socket;  

  }
  
  send(){    
    if(this.socket)      
      this.socket.emit("message" , { message : this.state.message}); 
  }
  changeValue(event:any){
    this.setState({message : event.target.value }); 
  }
  
  render(){
    
    return (
      <div className="App">
        <div>
        <p>Working</p>
         <p>{this.state.connected && <span>Connected </span>}</p>
         <p>{!this.state.connected && <span>Disconneted </span>}</p>

        </div>
        <div >
          <input placeholder="Message" onChange={this.changeValue.bind(this)}  />
          <button onClick={() => this.send()} >Send Data</button>
        </div>
        <div>
          <p>Serve Message</p>
          {this.state.messages.map( (m:any) => <p>{m}</p>)}

        </div>
      </div>
    );
  }
}


export default SocketTest;
