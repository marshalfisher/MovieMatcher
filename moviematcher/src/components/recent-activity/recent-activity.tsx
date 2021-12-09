import React, { useEffect, useState } from 'react'
import ActivityList from '../activity-list/activity-list'
import { useParams } from "react-router-dom";
import { useAppSelector } from '../../redux/app/hooks';
import { selectAuth } from '../../redux/features/modals/authSlice';
<<<<<<< HEAD
import { ServerApiService } from '../../services/ServerApi';
import { selectUserId } from '../../redux/features/user/userIdSlice';
require('./recent-activity.css');

type props = {
  profile: boolean
}

const RecentActivity = ({profile}: props) => {
  const params = useParams();
  const userID = useAppSelector(selectUserId);
  const accessToken = useAppSelector(selectAuth);
  const [username, setUsername] = useState<string>(); 

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const getUser = async () => {
      try {
        if (Number(params.id) === userID) setUsername('Your');
        else {
          const user = await ServerApiService.getSpecificUser(accessToken, Number(params.id));
          setUsername(user.username + '\'s');
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (params.id) getUser();
  }, []);

  return (
    <div className={profile ? "recent-activity profile-page-true" : "recent-activity"}>
      <div className="activity-header">{username ? username : ''} Recent Activity</div>
      <ActivityList/>
    </div>
  )
};
=======
import { ServerApiService } from '../../services/ServerApi'
require('./recent-activity.css');


const RecentActivity = () => {
    const params = useParams();
    const accessToken = useAppSelector(selectAuth)
    const [username, setUsername] = useState<string>(); 

    useEffect(() => {
        window.scrollTo(0, 0);
        async function getUser() {
            const user = await ServerApiService.getSpecificUser(accessToken, Number(params.id))
            setUsername(user.username);
        }
        if (params.id) getUser();
    }, [])

    return (
        <div>
            <div className="activity-header">{username ? username + '\'s' : ''} Recent Activity</div>
            <ActivityList />
        </div>
    )
}
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc

export default RecentActivity
