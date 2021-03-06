import {useState, useEffect} from 'react';
import { IMovie } from '../../../../interfaces/movieInterface';
import MovieList from '../movie-list/movie-list';
import APIService from '../../services/APISevice';
import BlackAndWatchList from '../BlackAndWatchList';
import { useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/features/modals/authSlice';
import './home.css';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<IMovie[]>([]);
    const [horrorMovies, setHorrorMovies] = useState<IMovie[]>([]);
    const [comedyMovies, setComedyMovies] = useState<IMovie[]>([]);
    const [dramaMovies, setDramaMovies] = useState<IMovie[]>([]);
    const [sciFiMovies, setSciFiMovies] = useState<IMovie[]>([]);
    const [actionMovies, setActionMovies] = useState<IMovie[]>([]);
    const accessToken = useAppSelector(selectAuth);

    useEffect(() => {
      console.log('hit home useEffect')
        async function fetchPopular () {
            const popularMoviesRes = await APIService.getPopularMovies();
            console.log(popularMoviesRes);
            const upcomingMoviesRes = await APIService.getUpcomingMovies();
            console.log(upcomingMoviesRes);
            const horrorMoviesRes = await APIService.getHorrorMovies();
            const actionMoviesRes = await APIService.getActionMovies();
            const sciFiMoviesRes = await APIService.getSciFiMovies();
            const dramaMoviesRes = await APIService.getDramaMovies();
            const comedyMoviesRes = await APIService.getComedyMovies();
            console.log(comedyMoviesRes);
            setPopularMovies(popularMoviesRes.results);
            setUpcomingMovies(upcomingMoviesRes.results);
            setHorrorMovies(horrorMoviesRes.results);
            setComedyMovies(comedyMoviesRes.results);
            setDramaMovies(dramaMoviesRes.results);
            setSciFiMovies(sciFiMoviesRes.results);
            setActionMovies(actionMoviesRes.results);
        };

        fetchPopular();

    }, []);


    return (
        <div className="home">
            <div className='spinner-holder'>
                <div className='welcome-text'>
                Welcome to <img style={{height: '30vh'}} className="logo" src="/logo-brighter.svg" alt="logo" />
                </div>
                <div className="reel">
                    <i></i>
                </div>
                <div className="reel">
                    <i></i>
                </div>
            </div>
            {
            accessToken && <BlackAndWatchList />
            }
            <MovieList criteria="Popular Movies" movieList={popularMovies}/>
            <MovieList criteria="In Theatres" movieList={upcomingMovies}/>
            <MovieList criteria="Comedy Movies" movieList={comedyMovies}/>
            <MovieList criteria="Horror Movies" movieList={horrorMovies}/>
            <MovieList criteria="Action Movies" movieList={actionMovies}/>
            <MovieList criteria="Science Fiction Movies" movieList={sciFiMovies}/>
            <MovieList criteria="Drama Movies" movieList={dramaMovies}/>

        </div>
    );
};

export default Home;
