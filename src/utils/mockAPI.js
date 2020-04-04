/* eslint-disable array-callback-return */
import { collectionConfigs } from './collectionConfigs';
import { v4 as uuidv4 } from 'uuid';

export class MockMovieAPI {
  
  constructor(collection, dataPath) {
    this.collectionName = collection;
    this.dataPath = dataPath;
  }

  setData(data) {
    this.movieData = data;
  }

  fetchMovieData(isReady) {
    fetch(this.dataPath)
      .then(res => res.json())
      .then(data => {
        const parsedData = this.parseIncomingData(data);
        this.movieData = parsedData;
        isReady(true);
      })
      .catch(err => console.error(err));
  }
  parseIncomingData(data) {
    const parsedFilmList = [];
    const config = collectionConfigs.get(this.collectionName);
    const fields = config.fields;
    
    data[config.collectionName].map(film => {
      const parsedFilm = {}
      const collectionKeys = Object.keys(fields);
      collectionKeys.map(key => {
        const filmKey = fields[key][0];
        if (fields[key].length === 1) {
          parsedFilm[key] = film[filmKey];
        } else {
          const formatter = fields[key][1];
          parsedFilm[key] = formatter(film[filmKey])
        }
      })
      parsedFilm['filmID'] = uuidv4();
      parsedFilm['favorite'] = false;
      parsedFilmList.push(parsedFilm);
    })

    return parsedFilmList;
  }

  get getMovieData() {
    return this.movieData;
  }

  updateMovieFavorite(uuid) {
    const idx = this.movieData.findIndex(film => film.filmID === uuid);
    let movie = this.movieData[idx];

    movie.favorite = !movie.favorite;
    this.movieData.splice(idx, 1, movie);

    return this.movieData;
  }

  postMovieData(newMovie) {
    const data = this.movieData;
    data.push(newMovie)
    this.movieData = data;

    return this.movieData
  }
}