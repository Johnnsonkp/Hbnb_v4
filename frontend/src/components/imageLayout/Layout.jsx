import "./imageLayout.css"

import React from 'react'

function Layout({title, children, customStyles}) {

  const styles = {
    pageWrapper: {
      padding: "2rem",
      paddingBottom: '0px'
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem 1rem"
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginTop: "0.5rem",
      marginBottom: "0.8rem",
      textAlign: 'left',
    }
  };

  return (
    <div style={customStyles?.pageWrapper || styles.pageWrapper}>
      <div style={customStyles?.container || styles.container}>
        <h1 style={customStyles?.title || styles.title}>{title}</h1>
        <div className="layout-grid">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout