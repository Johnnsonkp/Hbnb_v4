import React, {useState} from 'react'

export default function TabSlide() {
  const [active, setActive] = useState("home");
  
  const styles = {
    topNav: {
      paddingTop: "3px",
      margin: "auto",
      position: "absolute",
      top: 0,
      left: "45%",
      zIndex: 50,
    },
    button: {
      fontSize: "0.8rem",
      padding: "2px",
      width: "50%",
      backgroundColor: "transparent",
      color: "#333",
      border: "1px solid transparent",
      cursor: 'pointer'
    },
    activeButton: {
      backgroundColor: "#fff",
      color: "var(--color-text)",
      fontWeight: "bold",
      border: "1px solid lightgray",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      transition: "0.3s ease-in-out",
    },
    tabInner: {
      width: "140%",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(111, 111, 111, 0.1)",
      borderRadius: "3px",
      padding: "2px",
    }
  };
  
  
  return (
    <div style={styles.topNav}>
      <div style={styles.tabInner}>
        <button
          style={active === "home" ? { ...styles.button, ...styles.activeButton } : styles.button}
          onClick={() => setActive("home")}
        >
          Home
        </button>
        <button
          style={active === "Experience" ? { ...styles.button, ...styles.activeButton } : styles.button}
          onClick={() => setActive("Events")}
        >
          Events
        </button>
      </div>
    </div>
  )
}
