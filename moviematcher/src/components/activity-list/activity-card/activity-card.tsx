<<<<<<< HEAD
import {useState, useEffect} from 'react';
import { IMovieDetails } from '../../../../../interfaces/MovieDetails';
=======
import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './activity-card.css'
import { MovieDetailsInterface } from '../../../../../interfaces/MovieDetails';
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc
import {IProfileInfo} from '../../../../../interfaces/userInterface';
import { ServerApiService } from '../../../services/ServerApi';
import APIService from '../../../services/APISevice';
import { useAppSelector } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { selectUserId } from '../../../redux/features/user/userIdSlice';
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import './activity-card.css';

const ActivityCard = ({activity}: any) => {

  const navigate = useNavigate();
  const accessToken = useAppSelector(selectAuth);
  const userID = useAppSelector(selectUserId);
  const [doer, setDoer] = useState<IProfileInfo>();
  const [friend, setFriend] = useState<IProfileInfo>();
  const [movie, setMovie] = useState<IMovieDetails>();

  useEffect(() => {
    async function fetchData() {
      try{
        const movie = await APIService.getIndividualMovie(activity.movieid);
        setMovie(movie);
        const doer = await ServerApiService.getSpecificUser(accessToken, activity.uid);
        if (doer.id === userID) doer.username = 'You';
        setDoer(doer);
        if (activity.friendid) {
          const friend = await ServerApiService.getSpecificUser(accessToken, activity.friendid);
          if (friend.id === userID) {
            friend.username = doer.username;
            doer.username = 'You';
          };
          setFriend(friend);
        }
      } catch (e) {
        console.error(e)
      }
    };
    fetchData();
  }, [activity]);
  
  function outputActivity() {
    if (doer && movie) {
      switch (activity.type) {
        case 'whitelist':
          return <p>{doer.username} added {movie.original_title} to {doer.username === 'You' ? 'your' : 'their'} Watchlist</p>
        case 'blacklist':
          return <p>{doer.username} added {movie.original_title} to {doer.username === 'You' ? "your" : 'their'} Blacklist</p>
        case 'rating':
          return <p style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>{doer.username} rated {movie.original_title}
                   <span style={{marginLeft:'15px'}}><StarRatings
                    rating={activity.rating}
                    starDimension="1.2rem"
                    starSpacing="1px"
                    starRatedColor='gold'
                    /></span>
                  </p>
        case 'watched_movie':
          return <p>{doer.username} watched {movie.original_title}{friend ? ' with ' + friend.username : ''}</p>
      }
    } else return <div>Loading</div>
  };
  return (
    <div className="activity-card">
      <div>
        {movie 
          ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster" style={{height: "6rem"}} onClick={() => navigate(`/movieDetails/${movie.id}`)}></img>
          : <div />
        }
      </div>
      <div className="activity-info">
        {outputActivity()}
        <p>{moment(activity.createdAt).format('dddd MMM D, YYYY')}</p>
      </div>
      <div className="activity-movie-thumb"></div>
    </div>
  );
};
=======

const ActivityCard = ({activity}: any) => {
    const accessToken = useAppSelector(selectAuth);
    const userID = useAppSelector(selectUserId);
    const [doer, setDoer] = useState<IProfileInfo>()
    const [friend, setFriend] = useState<IProfileInfo>();
    const [movie, setMovie] = useState<MovieDetailsInterface>();

    useEffect(() => {
        async function fetchData() {
            const movie = await APIService.getIndividualMovie(activity.movieid)
            setMovie(movie);
            const doer = await ServerApiService.getSpecificUser(accessToken, activity.uid)
            if (doer.id === userID) doer.username = 'You';
            setDoer(doer);
            if (activity.friendid) {
                const friend = await ServerApiService.getSpecificUser(accessToken, activity.friendid);
                if (friend.id === userID) friend.username = 'You';
                setFriend(friend)
            }
        }
        fetchData()
    }, [])

    function outputActivity() {
        if (doer && movie) {
            switch (activity.type){
                case 'whitelist':
                    return doer.username === 'You' 
                        ? <p>{doer.username} added {movie.original_title} to your Watchlist</p>
                        : <p>{doer.username} added {movie.original_title} to thier Watchlist</p>
                case 'blacklist':
                    return doer.username === 'You' 
                        ? <p>{doer.username} added {movie.original_title} to your Blacklist</p>
                        : <p>{doer.username} added {movie.original_title} to thier Blacklist</p>
                case 'rating':
                    return activity.rating > 1
                        ? <p>{doer.username} rated {movie.original_title} {activity.rating} stars</p>
                        : <p>{doer.username} rated {movie.original_title} {activity.rating} star</p>
                case 'watched_movie':
                    return friend 
                        ? <p>{doer.username} watched {movie.original_title} with {friend.username}</p>
                        : <p>{doer.username} watched {movie.original_title}</p>
            }
        } else return <div>Loading</div>
    }

    return (
        <div className="activity-card">
            <div>
                {movie 
                    ? <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster" style={{height: "6rem"}}></img>
                    : <div />
                }
            </div>
            <div className="activity-info">
                {outputActivity()}
                <p>{moment(activity.createdAt).format('dddd MMM D, YYYY')}</p>
            </div>
            <div className="activity-movie-thumb"></div>
        </div>
    )
}
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc

export default ActivityCard
