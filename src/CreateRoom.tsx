import React from 'react';
import axios from 'axios'; 
import { withRouter } from "react-router-dom";


class CreateRoom extends React.Component<any , any> {
  
  constructor(props:any){
    super(props);
  }
 
 async create(){    
    let response = await axios.post("http://localhost:3000/api/room"); 
    let room = response.data.room; 
    this.props.history.push('/room/' + room);  // redirect to /room/:room 
    
  }
  
  render(){
    
    return (
      <div className="App">
          <button onClick={() => this.create()} >Create Room </button>
      </div>
    );
  }
}


export default withRouter(CreateRoom); 
