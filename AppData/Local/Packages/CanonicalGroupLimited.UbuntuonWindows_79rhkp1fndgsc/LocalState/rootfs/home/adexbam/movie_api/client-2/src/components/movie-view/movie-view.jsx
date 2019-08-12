import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import './movie-view.scss';


export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

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
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
        <div className="movie-director">
          <div className="label">Director:</div>
          <div className="value">{movie.Director.Name}</div>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </div>
        <Link to={'/'}>
          <Button variant="primary" type="button">
          BACK
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
    }).isRequired
};


