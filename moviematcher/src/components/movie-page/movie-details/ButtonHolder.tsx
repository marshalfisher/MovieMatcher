import React from 'react';
import { Button } from '@chakra-ui/button';
import { MovieDetailsInterface } from '../../../../../interfaces/MovieDetails';
import {useAppDispatch, useAppSelector} from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { selectFavoriteMovieIds, setFavoriteMovieIds, removeFavoriteMovieIds } from '../../../redux/features/user/watchListIds';
import { selectBlackListIds, removeBlackListIds, setBlackListIds } from '../../../redux/features/user/blackListids';
import { ServerApiService } from '../../../services/ServerApi';
import { FaPlus, FaMinus, FaTimes, FaSkull} from 'react-icons/fa';
import { selectRatings, removeRating } from '../../../redux/features/user/ratingsSlice';
import StarRatings from 'react-star-ratings';
import { setActivities } from '../../../redux/features/user/activitiesSlice';
type Props = {
  movie:MovieDetailsInterface
}
<<<<<<< HEAD

const ButtonHolder: React.FC<any>  = ({movie, setRatingModalToggle, setWatchedMovies, watchedMovies, flexColumn }) => {

=======
const ButtonHolder: React.FC<any>  = ({movie, setRatingModalToggle}) => {
  const dispatch = useAppDispatch();
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc
  const accessToken = useAppSelector(selectAuth);
  const favoriteMovieIds = useAppSelector(selectFavoriteMovieIds);
  const blackListIds = useAppSelector(selectBlackListIds);
  const userRatings = useAppSelector(selectRatings);
<<<<<<< HEAD
  const [watchedMovieToggle, setWatchedMovieToggle] = useState<boolean>(false);
  const [watchedMovieDateToggle, setWatchedMovieDateToggle] = useState<boolean>(false);
  const [watchDate, setWatchDate] = useState<Date>(new Date(Date.now()))
  const dispatch = useAppDispatch();

=======
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc
  const handleAddToWatchList = async() => {
    try{
      let watchList;
      if(favoriteMovieIds.includes(movie.id)){
        watchList = await ServerApiService.deleteFromWatchList(accessToken, movie.id);
      } else {
        if(blackListIds.includes(movie.id)) {
          dispatch(removeBlackListIds(movie.id))
        }
        watchList = await ServerApiService.addToWatchList(accessToken, movie.id);
      };
      let ids = watchList.map((movie) => movie.movieid)
      const activities = await ServerApiService.getActivities(accessToken);
      dispatch(setActivities(activities));
      dispatch(setFavoriteMovieIds(ids));

    } catch (e) {
      console.error(e);
    }
  };
  
  const handleBlackList = async() => {
    try{
      let blackList;
      if(blackListIds.includes(movie.id)) {
        blackList = await ServerApiService.deleteFromBlackList(accessToken, movie.id);
      } else {
        if(favoriteMovieIds.includes(movie.id)) {
          dispatch(removeFavoriteMovieIds(movie.id))
        }
        blackList = await ServerApiService.addToBlackList(accessToken, movie.id);
      };
      let ids = blackList.map((movie) => movie.movieid)
      const activities = await ServerApiService.getActivities(accessToken);
      dispatch(setActivities(activities));
      dispatch(setBlackListIds(ids));

    } catch (e) {
      console.error(e);
    };
  };

  const checkRatings = () => {
    let currMovieRating;
    userRatings.map((item: {rating: Number, movieid: number}) => {
      if (item.movieid === movie.id) currMovieRating = item.rating;
      return item.rating;
    })
    return currMovieRating;
  };

  const handleDeleteRating = async () => {
<<<<<<< HEAD
    try {
      ServerApiService.removeRating(accessToken, movie.id)
      const activities = await ServerApiService.getActivities(accessToken);
      dispatch(setActivities(activities));
      dispatch(removeRating(movie.id));
    } catch (e) {
      console.error(e)
    };
  };

  const updateWatchDate = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      setWatchDate(new Date(e.target.value))
    } catch (e) {
      console.error(e)
    };
  };

  const updateWatchedMovie = async () => {
    try{
      console.log(watchDate)
      const newestMovie = await ServerApiService.addWatchedMovie(accessToken, {movieID: movie.id, createdDate: watchDate});
      setWatchedMovieToggle(false)
      setWatchedMovieDateToggle(false)
      setWatchedMovies([...watchedMovies, newestMovie]);
      setWatchDate(new Date(Date.now()))
    } catch (e) {
      console.error(e);
    };
  };

=======
    ServerApiService.removeRating(accessToken, movie.id)
    const activities = await ServerApiService.getActivities(accessToken);
    dispatch(setActivities(activities));
    dispatch(removeRating(movie.id))
  }
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc
  return (
    <div className='movie-details-button-holder' style={{marginTop: "1.5rem"}}>
      <Button 
        style={{backgroundColor:'transparent'}}
        className='enlarge-on-hover'
        onClick={handleAddToWatchList}
      >
        {favoriteMovieIds.includes(movie.id) ? <FaTimes color='red' /> : <FaPlus color='green'/>}
        <span style={{fontStyle:'italic', marginLeft:'5px'}}>{favoriteMovieIds.includes(movie.id) ? 'No Longer Interested' :'Want to Watch' } </span>
      </Button>
      <Button
        style={{backgroundColor:'transparent'}}
        className='enlarge-on-hover'
        onClick={handleBlackList}>
        { blackListIds.includes(movie.id) ? <FaMinus color='red'/> : <FaSkull color='red' /> }
        <span style={{fontStyle:'italic', marginLeft:'5px'}}>{blackListIds.includes(movie.id) ? 'Remove Blacklist' : 'Add to BlackList'}</span>
      </Button>
      {checkRatings() 
        ? <Button title="click to delete rating" onClick={handleDeleteRating}>
          You rated: 
          <StarRatings 
            rating={checkRatings()}
            starDimension="1.5rem"
            starSpacing="1px"
            starRatedColor='gold'
          />
          </Button> 
        : <Button onClick={() => setRatingModalToggle(true)}>Rate</Button>}
    </div>
  );
};

export default ButtonHolder;
