import React from 'react'

export default function Decrement({onClick}) {
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
    <button style={styles.button} onClick={onClick}>-</button>
  )
}
