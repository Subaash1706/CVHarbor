import React from 'react'
import classes from './backdrop.module.css'

function Backdrop(props) {
  return (
    <div className={classes.backdropContainer}>
        { props.children }
    </div>
  )
}

export default Backdrop