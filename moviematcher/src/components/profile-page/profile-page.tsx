import RecentActivity from '../recent-activity/recent-activity';
import { useEffect } from 'react';
import ProfileInfo from './profile-info/profile-info';
import './profile-page.css'
import BlackAndWatchList from '../BlackAndWatchList';
const ProfilePage = () => {
<<<<<<< HEAD
  useEffect(() => {
    window.scrollTo(0, 0);
  }, );

  return (
    <div className='profile'>
      <div className='profile-container'>
        <ProfileInfo />
        <div style={{width: "5%"}}></div>
        <RecentActivity profile={true}/>
      </div>
      <BlackAndWatchList />
    </div>
  );
};
=======
    useEffect(() => {
        window.scrollTo(0, 0);
    }, )

    return (
        <div className='profile'>
            <ProfileInfo />
            <BlackAndWatchList />
            <RecentActivity />
        </div>
    )
}
>>>>>>> 3d01abd3c620998113cdce4174a35a8303ce87fc

export default ProfilePage
