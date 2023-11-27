import React from 'react'
import classes from './list.module.css'

function InwardList(props) {
    const { listItems } = props
  return (
    <ul className={classes.inwardList}>
        { listItems.map((ele)=><li>{ele}</li>) }
    </ul>
  )
}

export default InwardList