import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom';
import css from './App.module.css';
// Containers
import Administrate from './containers/Administrate/Administrate';
import Procedures from './containers/Procedures/Procedures';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import WithAuth from './containers/WithAuth';
import Header from './containers/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';



// Global
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route
            path="/Gepro"
            exact
            component={WithAuth(Procedures, false)}
          ></Route>
          <Route
            path="/procesos/administrar"
            exact
            component={WithAuth(Administration, true)}
          ></Route>
          <Route
            path="/procesos/administrar/:id"
            exact
            component={WithAuth(Administration, true)}
          ></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/logout" exact component={Logout}></Route>
          <Route path="/" exact component={Login}></Route>
        </Switch>
      </div>
    </Router>
  );
}
function Administration() {
  let { id } = useParams();
  let match = useRouteMatch();
  return <Administrate id={id} match={match}></Administrate>;
}

export default App;
