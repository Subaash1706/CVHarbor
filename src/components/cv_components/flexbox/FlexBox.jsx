import React from 'react'
import classes from './flex.module.css'

function FlexBox(props) {
  return (
    <div className={ classes.flexbox} style={{...props.style, 'flexDirection': `${props.direction || 'column'}`}}>
        { props.children}
    </div>
  )
}

export default FlexBox