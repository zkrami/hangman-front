import React from 'react';
import axios from 'axios'; 
import { withRouter } from 'react-router-dom';


class Room extends React.Component<any , any> {
  
  constructor(props:any){
    super(props);
    // path = /room/:room 

    let room = this.props.match.params.room ; 
    this.state = { 
      room : room  
    }; 
    
  }
  componentDidMount(){

  }
 
  render(){
    return (
      <div className="App">
          {this.state.room}
      </div>
    );
  }
}


export default withRouter(Room); 
