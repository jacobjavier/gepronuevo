import React from 'react';
import css from './Header.module.css';

import MainLink from './../../components/MainLink/MainLink';

/*-------------------!!!!!Nuevo Header----------------!!!!!*/
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
//import MailIcon from '@material-ui/icons/Mail';
//import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'



export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, isAdmin: false };
    this.intervalId = 0;
  }
  componentDidMount() {
    this.intervalId = setInterval(() => {
      localStorage.getItem('token')
        ? this.setState({
            isLoggedIn: true,
            isAdmin: localStorage.getItem('admin')
          })
        : this.setState({
            isLoggedIn: false,
            isAdmin: localStorage.getItem('admin')
          });
    }, 300);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    let loginTo = '/login';
    let loginText = 'Iniciar Sesión';
    if (this.state.isLoggedIn) {
      loginTo = '/Logout';
      loginText = 'Cerrar Sesión';
    }
    let adminPath =
      this.state.isAdmin > 0 ? (
        <li>
          <Nav.Link href="/procesos/administrar">Administrar</Nav.Link>
        </li>
      ) : null;

    return (
      /* <nav className={css.header} onClick={this.handleClick}>
        <ul tabIndex="1">
          <li>
            <MainLink to="/Gepro" text="Gepro"></MainLink>
          </li>
          {adminPath}
          
          <li className={css.login}>
            <MainLink to={loginTo} text={loginText}></MainLink>
          </li>
          
        </ul>
      </nav>*/

      <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="/Gepro">GEPRO</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/procesos/administrar">{adminPath}</Nav.Link>
      
      
      
    </Nav>
    
          
          
      <Button variant="outline-light" ><MainLink to={loginTo} text={loginText}></MainLink></Button>
    
  </Navbar>


    );
  }
}







const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


