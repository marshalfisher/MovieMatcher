import {AccessTokenResponse, User as UserInterface} from '../../../interfaces/responses'
import { UserPlaceholder } from '../UserPlaceholder'
import { Movie } from '../../../interfaces/MovieInterface';
import { FavoriteMovieInterface } from '../../../interfaces/favoriteMovieInterface'
import axios from 'axios';
const BASE_URL = 'http://localhost:3001'
interface User {
  username:string,
  email:string,
  password:string,
  profile_pic:string | ArrayBuffer | null
}
export const ServerApiService = {
  getUser: async(accessToken:string): Promise<UserInterface> => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      });
      return await response.json();
    } catch (e) {
      console.log(e);
      return UserPlaceholder;
    }
  },
  createUser: async(user:User): Promise<AccessTokenResponse> => {
    try {
      let response = await fetch(`${BASE_URL}/user/create`, {
        method:'POST',
        mode:'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return {user: UserPlaceholder, accessToken:''}
    }
  },
  userLogin: async(username:string, password:string): Promise<AccessTokenResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
      const {user, accessToken} = await response.json()
      return {user, accessToken};
    } catch (e) {
      console.log(e);
      return {user: UserPlaceholder, accessToken:''};
    }
  },
  getFriends: async(accessToken:string): Promise<UserInterface[]> => {
    try{
      const response = await fetch(`${BASE_URL}/user/friends`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return [UserPlaceholder]
    }
  },
  getAllUsers: async(accessToken:string): Promise<UserInterface[]> => {
    try{
      const response = await fetch(`${BASE_URL}/user/allPeople`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return [UserPlaceholder]
    }
  },
  getSpecificUser: async(accessToken:string, id:number): Promise<UserInterface> => {
    try{
      const response = await fetch(`${BASE_URL}/user/otherUser`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body:JSON.stringify({id})
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return UserPlaceholder
    }
  },
  removeFriend: async(accessToken:string, friendId:number): Promise<UserInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/friends`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({friendid:friendId})
      })
      return await response.json();
    }catch(err) {
      console.log(err)
      return [UserPlaceholder]
    }
  },
  addFriend: async(accessToken:string, friendId:number): Promise<UserInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/friends`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({friendid:friendId})
      })
      return await response.json();
    }catch(err) {
      console.log(err)
      return [UserPlaceholder]
    }
  },
  updateUser: async(accessToken:string, image:File): Promise<UserInterface> => {
    try {
      const fd= new FormData();
      fd.append('image', image)
      return await axios.post(`${BASE_URL}/user/picture`, fd, {
        headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
        },
      });
    } catch (e) {
      console.log(e);
      return UserPlaceholder;
    }
  },
  addToWatchList: async(accessToken:string, movieID:number): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/wants`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({movieID})
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  },
  getWatchList: async(accessToken:string): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/wants`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },

      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  },
  deleteFromWatchList: async(accessToken:string, movieID:number): Promise<FavoriteMovieInterface[]> => {
    try {
      const response = await fetch(`${BASE_URL}/user/wants`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({movieID})
      })
      return await response.json();
    }catch(err) {
      console.log(err);
      return []
    }
  }
}



// router.post('/user/wants', authMiddleware, addWant);
// router.delete('/user/wants', authMiddleware, deleteWant);
// router.get('/user/wants', authMiddleware, getWant);
