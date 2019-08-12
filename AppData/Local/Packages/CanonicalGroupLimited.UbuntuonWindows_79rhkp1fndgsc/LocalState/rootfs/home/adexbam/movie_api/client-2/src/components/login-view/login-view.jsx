import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './login-view.scss';

import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix-ade.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      alert('no such user: ' + username);
    });
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
      <Button className="btn-lg btn-dark btn-block" type="button" onClick={handleSubmit}>Submit</Button><br></br>
      <Link to={'/register'}>
        <Button variant="link" className="btn-lg btn-light btn-block">Register</Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn : PropTypes.func.isRequired,
  onClick : PropTypes.func.isRequired,
  register : PropTypes.func.isRequired
}