import React from 'react'
import classes from './grid.module.css'

function Grid(props) {
  return (
    <div className={classes.gridContainer} style={{'display': 'grid','gridTemplateColumns': props.balanced ? `repeat(${props.cols}, 1fr)`: `${props.cols}`, "gridColumn": props.span ? props.span : '', ...props.style}}>
        { props.children }
    </div>
  )
}

export default Grid