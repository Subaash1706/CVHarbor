import React from 'react'
import FlexBox from '../flexbox/FlexBox'

function TitleDate(props) {
    const { title, date } = props
  return (
    <FlexBox style={{'justifyContent': 'space-between'}} direction = 'row'>
        <p style={{textTransform: props.uppercase ? 'uppercase' : '', ...props.style}}>{title}</p>
        <p style={{...props.style}}>{date}</p>
    </FlexBox>
  )
}

export default TitleDate