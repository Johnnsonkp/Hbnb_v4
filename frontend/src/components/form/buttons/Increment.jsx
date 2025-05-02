import React, { Children } from 'react'

export default function Increment({onClick}) {

  const styles = {
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems:"center",
      width: "1.5rem",
      height: "2.2rem",
      margin: '2px',
      color: "#333",
      backgroundColor: "#EEEEEE",
      outline: "none"
    }
  }
  return (
    // <button style={styles.button}>{children}</button>
    <button style={styles.button} onClick={onClick}>+</button>
  )
}
