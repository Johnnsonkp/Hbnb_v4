import './usercard.css'

import React, { useContext } from 'react'

import { UserContext } from '../../../store/context/userContext'

function UserCardDashboard() {
  const {userState, userDispatch} = useContext(UserContext);
  
  return (
    <div className="page-wrapper">
    <aside className="sidebar">
      {/* <!-- Profile --> */}
      <div className="profile">
        <div className="avatar-wrapper">

          {userState?.user && userState?.user?.first_name?.length > 0 ? 
            <div style={{border: '1px solid lightGray', borderRadius: '50%', padding: '20px 35px', fontSize: '1.5rem', textTransform: 'uppercase'}}>{userState?.user?.first_name[0]}</div>
            :
            <div style={{border: '1px solid lightGray', borderRadius: '50%', padding: '20px 35px', fontSize: '1.5rem', textTransform: 'uppercase'}}>t</div>
            }
        </div>
        <p className="greeting">
          {userState?.user && userState?.user?.first_name?.length > 0 ?
            userState?.user?.email : "email@gmail.com"}
        </p>
        <h2 className="name">
          {userState?.user && userState?.user?.first_name?.length > 0 ?
              userState?.user?.first_name : "John"}
              
          {userState?.user && userState?.user?.last_name?.length > 0 ?
              userState?.user?.last_name : " Doe"}
        </h2>
      </div>

      <hr className="separator" />

      {/* <!-- Menu --> */}
      <nav className="menu">
        <a className="menu-link active" href="#">
          <svg className="icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z" />
          </svg>
          Dashboard
        </a>

        <a className="menu-link" href="/">
          <svg className="icon" viewBox="0 0 24 24" strokeWidth="1.5" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z" />
          </svg>
          Back to listing
        </a>
      </nav>
    </aside>
  </div>
  )
}

export default UserCardDashboard