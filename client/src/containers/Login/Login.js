import React from 'react';
import axios from 'axios';
import css from './Login.module.css';
import MainInput from './../../components/MainInput/MainInput';
import MainButton from './../../components/MainButton/MainButton';
/*!--------- Contenido Nuevo -----------------!*/
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        GEPRO
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(29),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //const classes = useStyles();
  }
  handleLogin() {
    // event.preventDefault();
    let params = axios
      .post(`${process.env.REACT_APP_API}/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          if (res.data.response.length > 0) {
        console.log(res.data.response);
            localStorage.setItem('userid', res.data.response[0].id);
            localStorage.setItem('username', res.data.response[0].usuario);
            localStorage.setItem('email', res.data.response[0].email);
            localStorage.setItem('admin', res.data.response[0].es_admin);
            localStorage.setItem(
              'department',
              res.data.response[0].departamento
            );
          }
          this.props.history.push('Gepro');
        } else {
          const error = Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }
  handleLoginClick(event) {
    this.handleLogin();
  }
  handleUserChange(event) {
    this.setState({ username: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    return (/*
      <div className={css.login} onKeyDown={this.handleKeyDown} tabIndex="0" >
        <h3>Usuario</h3>
        <MainInput
          handleChange={this.handleUserChange.bind(this)}
          value={this.state.username}
        />
        <h3>Contraseña</h3>
        <MainInput
          type="password"
          handleChange={this.handlePasswordChange.bind(this)}
          value={this.state.password}
        />
        <MainButton handleClick={this.handleLoginClick.bind(this)}>
          Iniciar sesión
        </MainButton>
      </div>
    );*/
 

    <Container component="main" maxWidth="xs">
    <CssBaseline />
      <div className={useStyles.paper} onKeyDown={this.handleKeyDown} tabIndex="0">
        <br>
        </br>
        <Avatar className={useStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar credenciales
        </Typography>
        <br></br>
        
          <h3>Usuario</h3>
          <MainInput
          handleChange={this.handleUserChange.bind(this)}
          value={this.state.username}
        />
        <h3>Contraseña</h3>
          <MainInput
          type="password"
          handleChange={this.handlePasswordChange.bind(this)}
          value={this.state.password}
        />
          <MainButton handleClick={this.handleLoginClick.bind(this)}>
          Iniciar sesión
        </MainButton>
          
        
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  
  );

  }
  componentDidMount() {}
}
