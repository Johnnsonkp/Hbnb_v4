import './dashboardCard.css'

import React from 'react'
import { dynamicImgSrc } from '../../../utilities/utils'
import { useNavigate } from 'react-router'

function DashboardCard({item}) {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(item.path)
  }
  return (
    <div onClick={() => handleClick()} className="dashboard-card">
      <div className="icon-container">
        <img style={{width: '40px'}} src={dynamicImgSrc(item.icon)} />
      </div>
      <div>
        <h3 className="dashboard-card-title">{item.title}</h3>
        <p className="dashboard-card-text">
          {item.description}
        </p>
      </div>
    </div>
  )
}

export default DashboardCard