import React from 'react'
import classes from './list.module.css'

// Accepted format: 
//                  (i) props.object=false -> [ 'item 1', 'item 2', 'item 3' ] 
//                  (ii) props.object=true -> [ [ { name: '' }, { name: ''  ] ]

function InwardList(props) {
    const { listItems, object } = props
    const itemsArray = listItems.includes('\n') ? listItems.split('\n') : [...listItems]
  return (
    <ul className={classes.inwardList}>
        { !object ? itemsArray.map((ele, ind)=><li key={ind}>{ele}</li>) : 
         listItems[0].map((item, ind)=><li key={`${ind}${item.name}`}>{ item.name }</li>) }
    </ul>
  )
}

export default InwardList