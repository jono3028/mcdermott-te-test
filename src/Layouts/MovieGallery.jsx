import React from 'react';
import './MovieGallery.css';
import { Segment, Header } from 'semantic-ui-react';
import { MovieCard } from '../Components/MovieCard';
import { CreateFilm } from '../Components/CreatFilm';

export const  MovieGallery = props => {
  const { title, movies, onSelectFavorite, onCreateFilm } = props;

  const movieCards = movies.map(m => <MovieCard data={m} key={m.filmID} onToggleFavorite={onSelectFavorite}/>)

  return (
    <Segment className="moviegallery">
      <Header as="h1">
        {title}
        <CreateFilm onSaveClick={onCreateFilm} />
      </Header>
      <div className="moviegallery moviegallery_cardcontainer">
        {movieCards}
      </div>
    </Segment>
  )
}