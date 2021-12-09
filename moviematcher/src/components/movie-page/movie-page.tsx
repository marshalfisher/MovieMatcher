import MovieList from '../movie-list/movie-list';
import MovieDetails from './movie-details/movie-details';
import React, {useState, useEffect} from 'react';
import APIService from '../../services/APISevice';
import { Movie } from '../../../../interfaces/MovieInterface';
import { useParams } from 'react-router';
const MoviePage = () => {
  const { id } : any = useParams();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([])
  useEffect(() => {
    let isCancelled = false;
    async function fetchPopular () {
      try {
        const fetchedPopularMovies  = await APIService.getSimilarMovies(id);
        if(!isCancelled) {
          setSimilarMovies(fetchedPopularMovies.results)
        }
<<<<<<< HEAD
      } catch (e) {
        console.error(e)
      }
    };

    fetchPopular();

    return () => {
        isCancelled = true;
    };
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <MovieDetails />
      <MovieList criteria = 'Similar Movies' movieList = {similarMovies} />
    </div>
  );
};
=======
    }
    fetchPopular()
    return () => {
        isCancelled = true;
    }
  }, [id])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
    return (
        <div>
            <MovieDetails />
            <MovieList criteria = 'Similar Movies' movieList = {similarMovies} />
        </div>
    )
}
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc

export default MoviePage
