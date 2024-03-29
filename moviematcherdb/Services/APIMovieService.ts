const axios = require('axios');
import { IMovie, IResults } from "../../interfaces/movieInterface";
import { IMovieDetails} from '../../interfaces/MovieDetails'
import { movieDetailsPlaceHolder } from '../../moviematcher/src/moviePlaceholder'
import { IActorList } from '../../interfaces/ActorList';
import { actorListPlaceholder } from '../../moviematcher/src/actorListPlaceholder';
import  ActorDetailsInterface  from '../../interfaces/ActorDetails';
import { actorDetailsPlaceholder } from '../../moviematcher/src/actorDetailsPlaceholder';


export const APIMovieService = {
  fetchMovie: async (id: number) =>{
    try {
      const result = await axios.get('')
      await result;//.json();
    } catch (e) {
        console.log(e)
    }
  },

  getPopularMovies: async(): Promise<IResults> => {
    try {
      const popularMovies = await axios.get('https://api.themoviedb.org/3/discover/movie/?api_key=*&watch_region=US&with_watch_providers=10')
      return  popularMovies.data;//.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getUpcomingMovies: async(): Promise<IResults> => {
    try {
      const latestMovies = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=*&language=en-US&page=1')
      return latestMovies.data;//.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },

  getFilteredMoviesQuery: async(params: string)  => {
    const movies = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=*&language=en-US&include_adult=true&include_video=false&watch_region=US' + params)
    return movies.data;
  },

  getCastID: async(castString: string) => {
    try{
    const cast = castString.trim().replace(' ', '%20');
    const castIDArr = await axios.get(`https://api.themoviedb.org/3/search/person?api_key=*&language=en-US&query=${cast}&page=1&include_adult=false`)
    if(castIDArr.data.results.length === 0){
      return '';
    }
    const castID = castIDArr.data.results[0].id;
    return(castID);
  }
  catch(err){
    console.log(err);
  }
  },

  getMoviesBase: async() => {
    try{
    const movies = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=*&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false')
    return movies.data;
    } catch(err){
      console.log(err);
    }
  },

  getIndividualMovie: async(id:string | number): Promise<IMovieDetails>  => {
    try {
      const movie  = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=*&language=en`);
      return await movie//.json()
    }catch(e) {
      console.log(e);
      return movieDetailsPlaceHolder
    }
  },
  getActorListQuery: async(id:number): Promise<IActorList> => {
    try {
        const actorList = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=*`)
        return actorList.data//.json()
    } catch(err) {
      console.log(err)
      return actorListPlaceholder
    }
  },
  getStreamProvidersQuery: async(id:number): Promise<any> => {
    try {
      const streamProvider = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=*`)
      const data = streamProvider.data//.json();
      return data.results;
    }catch(err) {
      console.log(err)
      return actorListPlaceholder
    }
  },
  getSimilarMoviesQuery: async(id:number): Promise<IResults> => {
    try {
      const similarMovies = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=*&with_watch_providers=10&watch_region=US`)
      return similarMovies.data//.json();
    } catch (e) {
      console.log(e);
      return {results:[]};
    }
  },
  getActorDetailsQuery: async(actorId:number): Promise<ActorDetailsInterface> => {
    try {
      const actorDetails = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=*`)
      return actorDetails.data//.json();

    }catch(e) {
     console.log(e)
      return actorDetailsPlaceholder;
    }
  },
  getCombinedCreditsQuery: async(actorId:number): Promise<IMovie[]> => {
    try {
      const similarMovies = await axios.get(`https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=*`)
      let data = await similarMovies//.json();
      return data.cast
    }catch(err) {
      console.log(err)
      return []
    }
  },
  getSpecificMovieQuery: async(id: number): Promise<IMovieDetails> => {
    try {
      const movie  = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=*&language=en`);
      return movie.data;
    } catch(err) {
     console.log(err);
      return movieDetailsPlaceHolder
    }

  }
}

module.exports = {
  APIMovieService
}
