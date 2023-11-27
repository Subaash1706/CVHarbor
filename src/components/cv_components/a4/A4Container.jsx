import React from 'react'
import A4sheet from './A4sheet'
import classes from './a4container.module.css'

function A4Container(props) {
  return (
    <div className={classes.a4container}>
        {props.children}
    </div>
  )
}

export default A4Container