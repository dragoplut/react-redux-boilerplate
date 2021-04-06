import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { actionLogin } from '../../../main/store/auth/Auth.actions';
import store from '../../../main/store/Main';
import './Login.scss';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const history = useHistory();
  const onSubmitHandler = () => store.dispatch(actionLogin(credentials, history));

  return (
    <div>
      <h3>Login page</h3>
      <div>
        <input type="text" name="email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} value={credentials.email}/>
        <input type="password" name="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password}/>
        <button type="submit" onClick={onSubmitHandler}>Submit</button>
      </div>
    </div>
  );
};

export default LoginPage;
