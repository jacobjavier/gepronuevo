import React from 'react';
import axios from 'axios';  
// Components 
import MainInput from './../../components/MainInput/MainInput';
import MainButton from './../../components/MainButton/MainButton';

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'' ,
      password:''
    }; 
  } 

  render() { 
    localStorage.clear(); 
    return ( <div  >
            </div>);
  }
  componentDidMount() { 
    localStorage.clear();
    this.props.history.push('login');
    //this.props.history.push('/');
  } 
}
