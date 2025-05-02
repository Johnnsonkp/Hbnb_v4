import React from 'react'
import { UserContext } from '../store/context/userContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

function Trips() {
  const {userState, userDispatch} = useContext(UserContext)
  const navigate = useNavigate()
  
  // console.log("userState.user.reservations", userState.user.reservations)
  return (
    <div id="root">

      <div style={{marginTop: '50px', textAlign: 'left'}}>
        <h4>Upcoming trips</h4>

        {userState?.user?.reservations?.title ?
          <div style={{marginTop: '20px', border: '1px solid lightGray', display: 'flex', borderRadius: '8px'}}>
            <img style={{height: '170px'}} src={userState?.user?.reservations?.img[0]} />

            <div style={{display: 'flex', flexDirection: 'column', margin: '10px'}}>
              <h3>{userState?.user?.reservations?.title}</h3>
              <p>Hosted by {userState?.user?.reservations?.userId || userState?.user?.reservations?.username}</p>
            </div>
            <button>Leave a review</button>
          </div> :
          <>
            <p>No trips booked...yet!</p>
            <button onClick={() => navigate("/listings")}>Start searching</button>
          </>
        }
      </div>
    </div>
  )
}

export default Trips