import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { connect } from 'react-redux';

import * as authSelectors from '../main/store/auth/Auth.selectors';
import { actionLogout } from '../main/store/auth/Auth.actions';
import store from '../main/store/Main';

import Login from './pages/login/Login';
import './App.css';

const App = () => {
  const isAuthenticated = authSelectors.isAuthenticated(store.getState());
  const history = useHistory();

  const [authenticated, setAuthenticated] = useState(isAuthenticated ? 'yes' : 'no');

  const onLogoutHandler = () => store.dispatch(actionLogout(history));

  useEffect(() => {
    setAuthenticated(isAuthenticated ? 'yes' : 'no');
  }, [isAuthenticated]);

  return (
    <Router>
      <header>
        <ul>
          <li><Link to="/">Root</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        {isAuthenticated && <button type="button" onClick={onLogoutHandler}>Logout</button>}
        <div>Authenticated {authenticated}</div>
      </header>
      <Switch>
        <Route exact path="/">
          <div>Root path</div>
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard">
          <div>Dashboard path</div>
        </Route>
        <Route exact path="/profile">
          <div>Profile path</div>
        </Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, null)(App);
