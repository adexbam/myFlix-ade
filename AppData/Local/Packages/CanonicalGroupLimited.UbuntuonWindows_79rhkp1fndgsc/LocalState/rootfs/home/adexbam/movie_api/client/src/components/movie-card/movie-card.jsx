import React from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Card style={{ width: '16rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onClick(movie)} variant="link">Details</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.PropTypes = {
  movie: PropTypes.shape ({
    Title: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default MovieCard