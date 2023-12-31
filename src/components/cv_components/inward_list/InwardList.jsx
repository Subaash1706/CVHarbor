import React from 'react'
import classes from './list.module.css'
import FlexBox from '../flexbox/FlexBox'

// Accepted format: 
//                  (i) props.object=false -> [ 'item 1', 'item 2', 'item 3' ] 
//                  (ii) props.object=true -> [ [ { name: '' }, { name: ''  ] ]

function InwardList(props) {
    const { listItems, object } = props
    const itemsArray = listItems.includes('\n') ? listItems.split('\n') : [...listItems]
  return (
    <ul className={classes.inwardList}>
        { !object ? itemsArray.map((ele, ind)=><li key={ind}>{ele}</li>) : 
         listItems[0].map((item, ind)=>
         <React.Fragment key={`${ind}${item.name}`}>
        <FlexBox direction='row' style={{justifyContent: 'space-between'}}>
          <li key={`${ind}${item.name}`}>
            { item.name }
          </li>
          { props.date?
                <span className={classes.date}>{ item.date }</span>
                : '' 
          }
        </FlexBox></React.Fragment>)
        }
    </ul>
  )
}

export default InwardList