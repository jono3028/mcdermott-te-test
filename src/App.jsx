import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

import { getFilterLimits, applyFilters, removeEmptyFilters } from './utils/filterUtils';

import { Loader, Dimmer } from 'semantic-ui-react';
import { NavColumn } from './Components/NavColumn';
import { FilterControls } from './Components/FilterControls';
import { MockMovieAPI } from './utils/mockAPI';
import { MovieGallery } from './Layouts/MovieGallery';

const movieAPI = new  MockMovieAPI('bondFilms','../data/BondFilms.JSON');

function App() {
  const [apiReady, setApiReady] = useState(false);
  const [movieList, setMovieList ] = useState();
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    movieAPI.fetchMovieData(setApiReady)
  }, []);
  
  useEffect(() => setMovieList(movieAPI.getMovieData), [apiReady]);

  if (!apiReady || movieList === undefined) {
    return (
      <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer>)
  }
  const filterLimits = getFilterLimits(movieList);
  const handleFilterChange = (value, name) => {
    const newFilters = {...activeFilters, [name]: value}
    const cleanedFilters = removeEmptyFilters(value, name, newFilters, filterLimits);
    setActiveFilters(cleanedFilters)
  }
  const filterdMovieList = applyFilters(movieList, activeFilters);
  
  const handleFavoriteToggle = uuid => {
    const newList = movieAPI.updateMovieFavorite(uuid);
    setMovieList(newList);
  }

  const handleCreateFilm = newFilmData => {
    const newList = movieAPI.postMovieData(newFilmData);
    setMovieList(newList);
  }

  return (
    <div className="App">
      <NavColumn onMenuSelect={handleFilterChange}/>
      <div className="App App_maincontainer">
        <FilterControls 
          onFilterChange={handleFilterChange}
          startDate={filterLimits.startDate}
          endDate={filterLimits.endDate}
          options={filterLimits.options}
          />
        <MovieGallery 
          movies={filterdMovieList}
          onSelectFavorite={handleFavoriteToggle}
          title='Bond Films'
          onCreateFilm={handleCreateFilm}
        />
      </div>
    </div>
  );
}

export default App;
