import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { movies, onClick, movieId } = this.props;
    const movie = movies.filter(movie => movie._id === movieId)[0]
    if (!movie) return null;
    return (
       <div className="movie-view">
        <div className="movie-title">
          <div className="label">Title:</div>
          <div className="value">{movie.Title}</div>
        </div>
        <div className="movie-description">
          <div className="label">Description:</div>
          <div className="value">{movie.Description}</div>
        </div>
        <img className="movie-poster" alt='' src={movie.ImagePath} />
        <div className="movie-genre">
          <div className="label">Genre:</div>
          <div className="value">{movie.Genre.Name}</div>
          </div>
        <div className="movie-director">
          <div className="label">Director:</div>
          <div className="value">{movie.Director.Name}</div>
          </div>
       <Link to={'/'}>
          <Button className="view-btn" variant="primary" type="button">
          Back To movie list
          </Button>
        </Link>
       </div>
    );
  }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string,
      Description: PropTypes.string,
      ImagePath: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string
      })
    }),
    onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies
})

export default connect(mapStateToProps, {})(MovieView)