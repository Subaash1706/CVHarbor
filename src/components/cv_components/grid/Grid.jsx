import React from 'react'


function Grid(props) {
  return (
    <div style={{'display': 'grid','gridTemplateColumns': props.balanced ? `repeat(${props.cols}, 1fr)`: `${props.cols}`, "gridColumn": props.span ? props.span : '', ...props.style}}>
        { props.children }
    </div>
  )
}

export default Grid