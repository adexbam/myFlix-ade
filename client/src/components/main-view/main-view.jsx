import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route} from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import { setMovies, setLoggedInUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
// eslint-disable-next-line
import { MovieCard } from '../movie-card/movie-card';
import  MovieView  from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import  DirectorView from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null,
      collapsed: true
    };

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  
  componentDidMount() {
    /* set `user` state and call `getMovies` if localStorage contains `token` item */
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-ade.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
      localStorage.setItem('movies', JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://myflix-ade.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
        this.props.setLoggedInUser(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });
    this.props.setLoggedInUser(authData.data);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  
  
  onSignedIn(user) {
    this.setState({
      user: user
    });
  }

  loginComponent(){
    this.setState({
      register: false
    })
  }

  logOut() {
    //clears storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('movies');
    //resets user state to render again
    this.setState({
      user: null
    })
    //make login screen appear after logging out
    window.open('/', '_self');
  }

  render() {
    const { user } = this.state;

    return (
      <Router>
          <div>
            <Navbar color="info" light>
            <NavbarBrand href="/" className="mr-auto mrAuto">MyFlix-Ade</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                 <NavLink href="/" onClick={() => this.logOut()}>Log out</NavLink>
                </NavItem>
                <NavItem>
                 <NavLink href="/users/:Username">{user}</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            </Navbar>
          </div>
          <div className="main-view">
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <MoviesList />;
              }
            }/>
           <Route exact path="/movies/:id" render={({match}) => <MovieView movieId={match.params.id}/>}/>
            <Route exact path="/register" render={() => <RegistrationView onSignedIn={user => this.onSignedIn(user)} />} />
            <Route exact path="/genres/:name" render={({ match }) => <GenreView genreName={match.params.name}/>}/>
            <Route exact path="/directors/:name" render={({ match }) => <DirectorView directorName={match.params.name}/>}/>
            <Route exact path="/users/:Username" render={() => <ProfileView />}/>
            </div>
        </Router>
    );
  }
} 

export default connect(null, { setMovies, setLoggedInUser } )(MainView);