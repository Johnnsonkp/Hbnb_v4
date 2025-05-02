import './../../index.css'

import Links from './Links';
import Logo from './Logo';
import NavContainer from './NavContainer';
import React from 'react'
import SearchBar from './SearchBar';

function Navbar() {

  const styles = {
    navContainer: {
      display: "flex",
      width: "100%",
      height: 'inherit'
    }
  }
  
  return (
    <NavContainer>
      <nav style={styles.navContainer}>
        <Logo />
        <SearchBar />
        <Links />
      </nav>
    </NavContainer>
  )
}

export default Navbar