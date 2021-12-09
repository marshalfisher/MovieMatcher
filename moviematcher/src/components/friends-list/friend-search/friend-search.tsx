import React, {useState, useEffect} from 'react';
import FriendIcon from '../friend-icon/friend-icon';
import { ServerApiService } from '../../../services/ServerApi';
import { setFriendIds } from '../../../redux/features/user/friendsIdSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/app/hooks';
import { selectAuth } from '../../../redux/features/modals/authSlice';
import { User } from '../../../../../interfaces/responses';
import { selectFriendIds } from '../../../redux/features/user/friendsIdSlice';
import { selectLoggedInUser } from '../../../redux/features/user/loggedInUsers';
<<<<<<< HEAD
import './friend-search.css';

const FriendSearch = () => {
  const [query, setQuery] = useState('');
  const [friends, setFriends] = useState<IUser[]>([]);
  const accessToken = useAppSelector(selectAuth);
  const friendIds = useAppSelector(selectFriendIds);
=======
const FriendSearch = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAuth);
  const friendIds = useAppSelector(selectFriendIds);
  const [query, setQuery] = useState('');
  const [friends, setFriends] = useState<User[]>([]);
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc
  const loggedInUsers = useAppSelector(selectLoggedInUser);
  function handleChange (e: React.FormEvent<HTMLInputElement>) {
<<<<<<< HEAD
    const input = e.currentTarget.value
    setQuery(input);
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchFriends = async() => {
      try{
        let userFriends = await ServerApiService.getFriends(accessToken);
        let sortedArray:IUser[] = userFriends.sort((a, b) => {
          if(loggedInUsers.includes(a.username) && loggedInUsers.includes(b.username)) return 0
          return loggedInUsers.includes(a.username) ? -1 : 1
        })
        if(!isCancelled) {
          setFriends(sortedArray)
        }
      } catch (e) {
        console.error(e);
      }
    };

    if(accessToken) {
      fetchFriends()
    };
    
    return () => {
      isCancelled = true;
    };
  }, [accessToken, friendIds, loggedInUsers]);
=======
      const input = e.currentTarget.value
      setQuery(input);
  }
    useEffect(() => {
      let isCancelled = false;
      const fetchFriends = async() => {
       let userFriends = await ServerApiService.getFriends(accessToken);
       let sortedArray:User[] = userFriends.sort((a, b) => {
         if(loggedInUsers.includes(a.username) && loggedInUsers.includes(b.username)) return 0
         return loggedInUsers.includes(a.username) ? -1 : 1
        })
       if(!isCancelled) {
         setFriends(sortedArray)
       }
      }
      if(accessToken) {
        fetchFriends()
      }
      return () => {
        isCancelled = true;
      }
    }, [accessToken, friendIds, loggedInUsers])
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc
  
  const filterFriends = () => {
    return friends.filter(friend => {
      return friend.username.includes(query)
<<<<<<< HEAD
    });
  };
=======
    }) 
  }
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc

  return (
    <div className="friend-search">
      <div className="search-bar-container">
        <input className="search-bar" value={query} placeholder="Search..." onChange={handleChange}/>
      </div>
      <div className="friend-icons">
        {filterFriends().map((friend:any) => {
          return <FriendIcon key={friend.id} user={friend} friend={true} />
        })}
        </div>
    </div>
  )
}

export default FriendSearch
