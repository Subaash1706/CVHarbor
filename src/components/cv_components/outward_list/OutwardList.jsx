import React from 'react'
import classes from './outwardlist.module.css'
import FlexBox from '../flexbox/FlexBox'

// Accepted format: 
//                  (i) props.object=false -> [ 'item 1', 'item 2', 'item 3' ] 
//                  (ii) props.object=true -> [ [ { name: '' }, { name: ''  ] ]

function OutwardList(props) {
    const { listItems, object } = props
    const itemsArray = listItems.includes('\n') ? listItems.split('\n') : [...listItems]
  return (
    <ul className={classes.outwardList} style={{textIndent: props.textIndent ? props.textIndent : '', ...props.style}}>
        { !object ? itemsArray.map((ele, ind)=><li key={ind} style={{...props.style}}>{ele}</li>) : 
         listItems[0].map((item, ind)=>
         <React.Fragment key={ind}>
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

export default OutwardList