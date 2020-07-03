import React from 'react';
import axios from 'axios'; 
import { withRouter } from 'react-router-dom';


class JoinRoom extends  React.Component<any , any> {
  
  constructor(props:any){
    super(props);

    this.state = { 
      room : ''
    }; 
  }
 
 async join(){    
    let room = this.state.room; 
    this.props.history.push('/room/' + room);  // redirect to /room/:room 
  }
  
  change(e:any){
    this.setState({room : e.target.value }); 
  }
  render(){
    
    return (
      <div className="App">
           <input value={this.state.room} onChange={(e) => this.change(e)} /> 
          <button onClick={() => this.join()} >Join Room </button>
      </div>
    );
  }
}

export default withRouter(JoinRoom);