import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
    };

  return (
    <Form className="login-form">
      <h2 className="text-center">Login</h2>
      <FormGroup>
        <Label>Username</Label>
        <Input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </FormGroup>
      <Button className="btn-lg btn-dark btn-block" type="button" onClick={handleSubmit}>Submit</Button>
      <p className="text-center pt-3">Or <Link to={'./registration-view/registration-view.jsx'}>register</Link></p> 
    </Form>
  );
}

LoginView.PropTypes = {
  onLoggedIn : PropTypes.func.isRequired,
  onClick : PropTypes.func.isRequired
}