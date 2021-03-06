import MovieList from '../movie-list/movie-list';
import  {useState, useEffect} from 'react';
import APIService from '../../services/APISevice';
import { IMovie } from '../../../../interfaces/movieInterface';
import { useParams } from 'react-router';
import ActorDetails from './ActorDetails/ActorDetails'

const ActorPage = () => {
  const { id } : any = useParams();
  const [combinedMovies, setCombinedMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    let isCancelled = false;
    async function fetchPopular () {
        const fetchedCombinedMovies  = await APIService.getCombinedCredits(id);
        if(!isCancelled) {
            setCombinedMovies(fetchedCombinedMovies)
        }
    };

    fetchPopular();

    return () => {
        isCancelled = true;
    };
  }, [id])
  
    return (
        <div>
            <ActorDetails />
            <MovieList criteria = 'Also Starred In' movieList = {combinedMovies} />
        </div>
    )
}

export default ActorPage