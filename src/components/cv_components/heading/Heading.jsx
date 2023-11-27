import React from 'react'
import classes from './heading.module.css'

function Heading(props) {
  return (
    <div style={{...props.style, 'textAlign': `${props.centered ? 'center': 'left'}`}} className={classes.heading}>
        {props.children}
    </div>
  )
}

export default Heading