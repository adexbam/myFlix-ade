import React from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  componentDidMount() {
    axios.get('https://myflix-ade.herokuapp.com/movies').
    then(response => {
      this.setState({movies: response.data})
    })
    .catch(error => this.setState({error: error.message}))
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  clickHandle() {
    this.setState({
      selectedMovie: null
    });
  }

  register() {
    this.setState({
      register: true
    });
  }



  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
     <div className="main-view">
      {selectedMovie
         ? (<MovieView movie={selectedMovie}onClick={() => this.clickHandle()}/>)
         : (movies.map(movie => (
           <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>)
         ))
      }
     </div>
    );
  }
}

export default MainView
