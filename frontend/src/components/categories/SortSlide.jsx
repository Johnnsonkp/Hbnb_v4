import React, {useState} from 'react'

export default function SortSlide({title_1, title_2}) {
  const [active, setActive] = useState(title_1);
  
  const styles = {
    topNav: {
      paddingTop: "3px",
      margin: "auto",
      display: 'flex',
      // position: "absolute",
      // top: 0,
      // left: "45%",
      zIndex: 50,
    },
    button: {
      fontSize: "0.8rem",
      padding: "2px",
      width: "50%",
      backgroundColor: "transparent",
      color: "#333",
      border: "1px solid transparent",
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
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
          style={active === title_1 ? { ...styles.button, ...styles.activeButton } : styles.button}
          onClick={() => setActive(title_1)}
        >
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
            </svg> */}
          {title_1}
        </button>
        <button
          style={active === title_2 ? { ...styles.button, ...styles.activeButton } : styles.button}
          onClick={() => setActive(title_2)}
        >

            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
              <rect x="2" y="2" width="5" height="5"/>
              <rect x="9.5" y="2" width="5" height="5"/>
              <rect x="17" y="2" width="5" height="5"/>

              <rect x="2" y="9.5" width="5" height="5"/>
              <rect x="9.5" y="9.5" width="5" height="5"/>
              <rect x="17" y="9.5" width="5" height="5"/>

              <rect x="2" y="17" width="5" height="5"/>
              <rect x="9.5" y="17" width="5" height="5"/>
              <rect x="17" y="17" width="5" height="5"/>
            </svg> */}
          {title_2}
        </button>
      </div>
    </div>
  )
}
