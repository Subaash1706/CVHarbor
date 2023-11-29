import React from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import classes from './existing.module.css'

function ExistingData(props) {
    const bio = useSelector(state=>state.bioData.data)
    const education = bio[`${props.target}`]
  return (
    <>
        {education.map((item, index)=>{
            return(
                <FlexBox key={index} style={{border: '1px solid gray', alignItems: 'start', padding: '15px', 'position': 'relative', margin: '8px'}} width='100'>
                    <strong style={{'fontSize': '1.5rem'}}>{item.name}</strong>
                    <p>{item.course}, {item.stream}</p>
                    <p>{item.grade}</p>
                    <p>{item.start_date}-{item.end_date}</p>
                    <center className={classes.number}>{index + 1}</center>
                </FlexBox>
            )
        })}
        <a className={classes.addMoreButton} onClick={props.onAddMore}>+Add more</a>
    </>
  )
}

export default ExistingData