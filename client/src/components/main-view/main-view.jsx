import React from 'react';
import axios from 'axios';

import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false
    };
    this.register = this.register.bind(this);
    this.loginComponent = this.loginComponent.bind(this);
  }


  componentDidMount() {
    axios.get('https://myflix-ade.herokuapp.com/movies')
    .then(response => {
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



  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} register={this.register}/>

    if (register) return <RegistrationView loginComponent={this.loginComponent} />
    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

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

export default MainView
