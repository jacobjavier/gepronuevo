import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
export default function withAuth(ComponentToProtect, onlyAdmin) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        redirectUrl:"/login"
      }; 
    }
    componentDidMount() {
      const myHeaders = [
        {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + localStorage.token
        }
      ];
      fetch(`${process.env.REACT_APP_API}/checkToken/` + localStorage.token, {
        method: 'GET'
        //     headers: myHeaders,
        //    ,credentials: 'include'
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false, redirect: false });
            let tokenData = JSON.parse(atob(localStorage.token.split('.')[1])); 
            if(onlyAdmin && !tokenData.admin){
              this.setState({ redirect:true, redirectUrl:"/Gepro" }); 
            } 
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return 'Cargando';
      }
      if (redirect) {
        return <Redirect to={this.state.redirectUrl} />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
