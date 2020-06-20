import React from 'react';
import axios from 'axios'; 

class Login extends React.Component<any , any> {
 
  constructor(props:any){
    super(props);

    this.state = {
      email : '' , 
      password : '' 
    }; 
   
  }

  valueChanged( inputName : string ,  event : any ){     
    // if(inputName === 'email'){

    //   let value = event.target.value ; 

    //   if(value[0] === 'a'){
    //     this.setState({error: 'bla bla' }); 
    //   }

    //   return ; 

    // }
    this.setState({ [inputName] : event.target.value }); 
  }
  
  login(){

    axios.post("http://localhost:3000/api/login" , {
      email: this.state.email , 
      password: this.state.password 
    } , {
     withCredentials : true 
    }).then( res => { 
      console.log(res); 
    });
  }
  test(){
    axios.get("http://localhost:3000/api/pro" , {
     withCredentials : true 
     
    }).then( res => { 
      console.log(res); 
    });

  }
  render(){
    
    return (
        <div>
          <br/>
          
          <input placeholder="Email: ex:fadi@gmail.com " name="email" type="email" onChange={ (e) => this.valueChanged('email' , e)} />  <br/> 
          <input name="password" placeholder="password" type="password" onChange={ (e) => this.valueChanged('password' , e)} />  <br/> 
          <button onClick={() => this.login() }>Send</button> <br/> 
          <button onClick={() => this.test() }>test</button>

        </div>
    );
  }
}


export default Login;
