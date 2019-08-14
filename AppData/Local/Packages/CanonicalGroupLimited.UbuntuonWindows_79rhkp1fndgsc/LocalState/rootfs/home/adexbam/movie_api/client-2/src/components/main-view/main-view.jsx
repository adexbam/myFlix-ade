import React from 'react';
import axios from 'axios';

import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: null,
      selectedMovieId: null,
      user: null,
      register: false
    };
    this.register = this.register.bind(this);
    this.loginComponent = this.loginComponent.bind(this);
  }
  componentDidMount() {
    /* set `user` state and call `getMovies` if localStorage contains `token` item */
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
    window.addEventListener('hashchange', this.handleNewHash, false);

    this.handleNewHash();
  }
  handleNewHash = () => {
    const movieId = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
  
    this.setState({
      selectedMovieId: movieId[0]
    });
  }
  onMovieClick(movie) {
    window.location.hash = '#' + movie._id;
    this.setState({
      selectedMovieId: movie._id
    });
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  onClickHandle() {
    this.setState({
      selectedMovie: null
    });
  }
  
  onSignedIn(user) {
    this.setState({
      user: user,
      register: false
    });
  }
  register() {
    this.setState({
      register: true
    })
  }
  loginComponent(){
    this.setState({
      register: false
    })
  }
  getMovies(token) {
    axios.get('https://myflix-ade.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, selectedMovieId, user, register } = this.state;

    if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} register={this.register}/>

    if (register) return <RegistrationView loginComponent={this.loginComponent} />
    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;
    const selectedMovie = selectedMovieId ? movies.find(m => m._id === selectedMovieId) : null;

    return (
      <div className="main-view">
       {selectedMovie
          ? (<MovieView movie={selectedMovie}onClick={() => this.onClickHandle()}/>)
          : (movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>)
          ))
       }
      </div>
    );
  }
} 
