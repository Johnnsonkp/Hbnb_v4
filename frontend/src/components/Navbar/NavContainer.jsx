import React from 'react'
import { useEffect } from "react";

const NavContainer = ({children}) => {

  const styles = {
    headerContainer: {
      background: "#fff",
      zIndex: 50,
      fontSize: "16px",
      color: "#333",
      padding: "10px 5px",
      fontWeight: 400,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      top: "35px",
      width: "70%",
      borderRadius: "25px",
      left: 0,
      right: 0,
      margin: "auto",
      height: '55px',
      border: '1px solid lightGray',
      boxShadow: "0 1px 7px rgba(0, 0, 0, 0.25)",
    },
  };

  useEffect(() => {
    let navContainer = document.getElementById('nav-container')

    function onScroll() {
      if (window.scrollY > 100) {
        console.log('Scrolled past 100px!');
        navContainer.style.top = '0px'
      }else {
        navContainer.style.top = '35px'
      }
    }
  
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="nav-container" style={styles.headerContainer}>
      {children}
    </div>
  )
}

export default NavContainer