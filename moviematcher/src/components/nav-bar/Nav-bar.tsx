import { NavLink } from 'react-router-dom'
import { Button } from '@chakra-ui/button';
import { useAppDispatch, useAppSelector  } from '../../redux/app/hooks';
import { turnOnLogin } from '../../redux/features/modals/loginSlice';
import { selectFriendsList, toggleFriendsList } from '../../redux/features/modals/friendsListSlice'
import { clearToken, selectAuth } from '../../redux/features/modals/authSlice';
import { selectSocketRef } from '../../redux/features/socket/socketRefSlice';
<<<<<<< HEAD
import { useNavigate } from 'react-router';
import SearchBar from '../movie-search/movie-search';
import './nav-bar.css';
import { selectUserId } from '../../redux/features/user/userIdSlice';
=======
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc

import './nav-bar.css'
const Navbar = () => {
<<<<<<< HEAD
  const auth = useAppSelector(selectAuth);
  const userID = useAppSelector(selectUserId)
  const socket = useAppSelector(selectSocketRef);
  const dispatch = useAppDispatch();
  let listBool = useAppSelector(selectFriendsList);
  let navigate = useNavigate();
=======
  const auth = useAppSelector(selectAuth)
  const socket = useAppSelector(selectSocketRef)
  const dispatch = useAppDispatch()
  let listBool = useAppSelector(selectFriendsList) 
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc

  const handleLogOut = () =>{
    socket.emit('logout')
    dispatch(clearToken())
    if (listBool === true)dispatch(toggleFriendsList())
  }
  
  return (
    <div className="nav-bar">
      <div className="nav-areas">
        <NavLink to="/">
<<<<<<< HEAD
          <div>
            <img className="logo" src="/logo.svg" alt="logo" />
          </div>
        </ NavLink>
        { auth &&
        <>
          <NavLink to='/recent' 
            style={({ isActive }) => ({ padding:'10px', backgroundColor:isActive ? "rgb(26, 26, 200)" : "", borderRadius: isActive ? "1rem": "",
             marginLeft: "6vw", boxShadow: isActive ? "0 3px 40px 3px rgb(26, 26, 212)" : '', fontSize : "1rem"})} className='navlink-item enlarge-on-hover'>
            Recent Activity
          </NavLink>
          <NavLink to={`/profile/${userID}`}
            style={({ isActive }) => ({ padding:'10px', backgroundColor:isActive ? "rgb(26, 26, 200)" : "", borderRadius: isActive ? "1rem": "",
            marginLeft: "6vw", boxShadow: isActive ? "0 3px 40px 3px rgb(26, 26, 212)" : '', fontSize : "1rem"})} className='navlink-item enlarge-on-hover'>
            Profile
          </NavLink>
          <NavLink to='/streaming'
            style={({ isActive }) => ({ padding:'10px', backgroundColor:isActive ? "rgb(26, 26, 200)" : "", borderRadius: isActive ? "1rem": "",
            marginLeft: "6vw", boxShadow: isActive ? "0 3px 40px 3px rgb(26, 26, 212)" : '', fontSize : "1rem"})} className='navlink-item enlarge-on-hover'>
            Stream Providers
          </NavLink>
=======
          <img className="logo enlarge-on-hover" src="/logo.svg" alt="logo" />
        </ NavLink>
        { auth &&
        <>
        <NavLink to='/recent' 
          style={({ isActive }) => ({  border: isActive ? '2px solid gray': '', padding:'10px',
          borderRadius: isActive ? '1rem': '',})} className='navlink-item enlarge-on-hover'>
          Recent Activity
        </NavLink>
        <NavLink to='/profile'
          style={({ isActive }) => ({  border: isActive ? '2px solid gray': '', padding:'10px',
          borderRadius: isActive ? '1rem': '',})} className='navlink-item enlarge-on-hover'>
          Profile
        </NavLink>
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc
        </>
      }  
      </div>
      <div className="buttons">
        {auth && <Button className='enlarge-on-hover margin-right' onClick={() => dispatch(toggleFriendsList())}> Friends </Button>}
        {!auth && <Button className='enlarge-on-hover' onClick={() => dispatch(turnOnLogin())}> Login </Button>}
        {auth && <Button className='enlarge-on-hover' onClick={handleLogOut}>Log Out</Button>}
      </div>
    </div>
  )
}

export default Navbar
