import React from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import ProfileSideBar from "../components/Profile/ProfileSideBar";
import ProfileContent from "../components/Profile/ProfileContent";

const ProfilePage = () => {
  return (
    <div>
        <Header/>
        <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[335px]">
                <ProfileSideBar/>
            </div>
            <ProfileContent/>
        </div>
    </div>
  )
}

export default ProfilePage