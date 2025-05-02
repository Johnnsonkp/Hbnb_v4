import DashboardCard from '../components/dashboard/dashboardCard/DashboardCard'
import React from 'react'
import UserCardDashboard from '../components/dashboard/userCard/UserCardDashboard'

function Dashboard() {
  const styles =  {
    container: {
      display: "flex",
      flexDirection: 'row',
      alignItems: 'center',
      padding: "0rem",
      marginTop: '50px',
    }
  }

  const content = {
    "schema": [
      {
        "title": "User account",
        "description": "User details",
        "path": "/user",
        "icon": "/icons8-user-default-64.png",
        "icon_1": "/static/react/icons8-user-default-64.png"
      },
      {
        "title": "Trips",
        "description": "View your trips history",
        "path": "/trips",
        "icon": "/icons8-trekking-64.png",
        "icon_1": "/static/react/icons8-trekking-64.png"
      },
      {
        "title": "Manage your listings",
        "description": "Listings dashboard",
        "path": "/hosting",
        "icon": "/manage-listings-64.png",
        "icon_1": "/static/react/manage-listings-64.png",
      },
      {
        "title": "Leave a review",
        "description": "Review previous stays",
        "path": "/review",
        "icon": "/icons8-rating-64.png",
        "icon_1": "/static/react/icons8-rating-64.png"
      },
      {
        "title": "Wishlists",
        "description": "wishlisted listings",
        "path": "/wishlist",
        "icon": "/icons8-heart-64.png",
        "icon_1": "/static/react/assets/icons8-heart-64.png"
      }
    ]
  }

  return (
    <div className='page-content'>
      <div>Dashboard</div>
      <h3>User Dashboard</h3>
      <div style={styles.container}>
        <UserCardDashboard />
        <div style={{display: 'flex', flexWrap: 'wrap', width: '90%'}}>
          {content.schema.map((item, index) => (
            <DashboardCard key={index} item={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard