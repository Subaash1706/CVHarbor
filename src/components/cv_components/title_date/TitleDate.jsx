import React from 'react'
import FlexBox from '../flexbox/FlexBox'

function TitleDate(props) {
    const { title, date } = props
  return (
    <FlexBox style={{'justifyContent': 'space-between'}} direction = 'row'>
        <p>{title}</p>
        <p>{date}</p>
    </FlexBox>
  )
}

export default TitleDate