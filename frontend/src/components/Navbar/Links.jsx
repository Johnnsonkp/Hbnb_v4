import './nav.css'

import React, {useEffect, useState} from 'react'

import { UserContext } from '../../store/context/userContext'
import { storeUserData } from '../../store/actions/userActions'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

function Links() {
  const [userDetails, setUserDetails] = useState(null)
  const {userState, userDispatch} = useContext(UserContext)
  const navigate = useNavigate()

  const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND
  const API = import.meta.env.VITE_API_PATH
  const current_user_path = import.meta.env.VITE_CURRENT_USER_PATH
  const USERS_PATH = import.meta.env.VITE_USERS_PATH

  console.log(`BASE_URL: ${BASE_URL}/${API}/${USERS_PATH}/${current_user_path}`)

  const getUserInfo = async () => {
    try {
      // const response = await fetch('http://127.0.0.1:5000/api/v1/users/current_user', {
      const response = await fetch(`${BASE_URL}/${API}/${USERS_PATH}/${current_user_path}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  }

  useEffect(() => {
    getUserInfo().then((data) => {
      console.log("<---getUserInfo--->", data)
      setUserDetails(data);
      storeUserData(data, userDispatch)
    })

    
  }, []);
  
  return (
    <ul className="nav-links">
      <li className="card">
        <div className="dropdown-container">
          <div className="group">
            <button type="button" className="dropdown-button" style={{padding: userDetails?.first_name? "0.4rem 0.9rem" : ''}}>
              {userDetails?.first_name? 
                <div style={{color: '#333', textTransform: 'capitalize', textAlign: 'center'}}>
                  {userDetails?.first_name[0]}
                </div> :
                <>
                  <span className="dropdown-icon"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 16 16">
                    <rect x="0.5" y="0.5" width="15" height="15" rx="20" ry="20" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1"/>
                    <path fill="#9ca3af" d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                  </svg>
                </>}
            </button>
            <div className="dropdown-menu">
              <div className="dropdown-options">
                <button style={{backgroundColor: '#fff'}}onClick={() => navigate('/auth/sign-up')} className="dropdown-option">Sign up</button>
                <button style={{backgroundColor: '#fff'}}onClick={() => navigate('/auth/login')} className="dropdown-option">Log In</button>
                <button style={{backgroundColor: '#fff'}}onClick={() => navigate('/dashboard')} className="dropdown-option">Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  )
}

export default Links