import React, {useState} from 'react'

function FilterBtn({onClick}) {

  const style = {
    select: {
      backgroundColor: "white",
      height: "2.5rem",
      paddingLeft: "1.25rem",
      paddingRight: "1.25rem",
      // borderTopLeftRadius: "9999px",
      // borderBottomLeftRadius: "9999px",
      fontSize: "0.875rem",
      outline: "none",
      border: "1px solid #6b7280",
      color: '#333',
      borderRightWidth: "1px",
      cursor: "pointer",
      maxHeight: "2.5rem",
      overflowY: "hidden"
    },
    option: {
      fontWeight: 500,
      pointer: 'cursor',
    }
  }
  return (
    <button onClick={onClick} style={style.select}>
      <option className={style.option} value="filter">Filters</option>
    </button>
  )
}

export default FilterBtn