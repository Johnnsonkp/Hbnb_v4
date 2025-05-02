import React from 'react'
import { dynamicImgSrc } from '../../utilities/utils'

export default function Logo() {

  const styles = {
    logo: {
      display: "flex",
      alignItems: "center",
      width: "120px",
      flex: "0.4",
      cursor: 'pointer'
    }
  }

  return (
    <div style={styles.logo}>
      <a  href="/home" style={{display: 'flex', alignItems: 'center', padding: '10px'}}>
        <img style={{width: '30px'}} src={dynamicImgSrc('icon.png')} />
        <span className="chip-label">Hbnb</span>
      </a>
    </div>
  )
}
