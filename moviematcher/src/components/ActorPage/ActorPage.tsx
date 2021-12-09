import MovieList from '../movie-list/movie-list';
import  {useState, useEffect} from 'react';
import APIService from '../../services/APISevice';
import { Movie } from '../../../../interfaces/MovieInterface';
import { useParams } from 'react-router';
import ActorDetails from './ActorDetails/ActorDetails'
const ActorPage = () => {
  const { id } : any = useParams();
  const [combinedMovies, setCombinedMovies] = useState<Movie[]>([]);
  useEffect(() => {
    let isCancelled = false;
    async function fetchPopular () {
      try {
        const fetchedCombinedMovies  = await APIService.getCombinedCredits(id);
        if(!isCancelled) {
          setCombinedMovies(fetchedCombinedMovies)
        }
<<<<<<< HEAD
      } catch (e) {
        console.error(e)
      };
    };

    fetchPopular();

    return () => {
        isCancelled = true;
    };
  }, [id]);
  
  return (
    <div>
      <ActorDetails />
      <MovieList criteria = 'Also Starred In' movieList = {combinedMovies} />
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
    return (
        <div>
            <ActorDetails />
            <MovieList criteria = 'Also Starred In' movieList = {combinedMovies} />
        </div>
    )
}
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc

export default ActorPage;