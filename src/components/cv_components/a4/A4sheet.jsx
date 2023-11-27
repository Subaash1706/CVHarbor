import React from 'react'
import classes from './sheet.module.css'

const A4sheet = React.forwardRef((props, ref)=>{
  return (
    <div className={`${classes.sheet} printable`} ref={ref}>
        { props.children}
    </div>
  )
})

export default A4sheet