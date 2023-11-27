import React from 'react'
import classes from './subheading.module.css'

function SubHeading(props) {
  return (
    <div style={{...props.style, 'textAlign': `${ props.centered ? 'center' : 'left'}`}} className={classes.subheading}>
        { props.children }
    </div>
  )
}

export default SubHeading