import React, { useState } from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import CheckBoxLabel from '../form_components/CheckBoxLabel'
import LabelInput from '../form_components/LabelInput'
import LabelDate from '../form_components/LabelDate'

function SelectiveAdditional(props) {
    // const [ isChecked, setisChecked ] = useState({
    //     heading: false, 
    //     date: false, 
    //     description: false
    // })
    const obj = props.checkedArray.map((item, ind)=>{return{
        [item]: {heading: false, date: false, description: false}
    }})
    const [ isChecked, setisChecked ] = useState(obj)
    console.log(isChecked)
    const [ value, setValue ] = useState({})
    function valueChangeHandler(e){
        setValue((prev)=>{return{...prev, [e.target.id]: e.target.value}})
    }
    function checkHandler(e, ind, item){
        // setisChecked(prev=>{return{...prev, [prev[ind][item][e.target.id]]: e.target.checked}})
        setisChecked(prev=>{return{...prev, [prev[ind]]: {[e.target.id]: e.target.checked}}})
    }
    console.log(isChecked)
  return ( <>
    { props.checkedArray.map((item,ind)=>{
        return(
            <FlexBox key={`${ind}_${item}`} style={{'alignItems': 'start', border: '1px solid gray', marginBottom: '2rem', padding: '2rem', 'borderRadius': '10px'}}>
            <div className='subHeading'>{item}</div>
            <FlexBox direction='row' width='100' style={{justifyContent: 'space-between', padding: '8px', marginBottom: '1rem', borderBottom: '1px solid gray'}}>
                <CheckBoxLabel id='heading' labelName='Enable heading' name='heading' checked={(isChecked[ind])[item.heading]} onChange={(e)=>checkHandler(e, ind, item)}/>
                <CheckBoxLabel id='date' labelName='Enable month year status' name='date' checked={(isChecked[ind])[item.date]}  onChange={(e)=>checkHandler(e, ind, item)}/>
                <CheckBoxLabel id='description' labelName='Enable description' name='description' checked={(isChecked[ind])[item.description]} onChange={(e)=>checkHandler(e, ind, item)}/>
            </FlexBox>
            <FlexBox direction='row' width='100'>
                <LabelInput id='Heading' labelName='Add a heading' name='Heading' disabled={!isChecked.heading} style={{}} onChange={valueChangeHandler}/>
                <LabelDate id='Date' labelName='Month and Year of completion' name="Date" disabled={!isChecked.date} onChange={valueChangeHandler}/>
            </FlexBox >
            <FlexBox width='100'>
                <textarea style={{width: '100%', height: '8rem', resize: 'none', padding: '8px', fontSize: '1.25rem'}}  placeholder='Enter a brief description. Use new line to create points' disabled={!isChecked.description} onChange={valueChangeHandler} id='description'></textarea>
            </FlexBox>
            <a style={{'fontSize': '1.25rem', 'cursor': 'pointer'}}>+Add more</a>
        </FlexBox>
        )
    }) 
 }
    </>)
}

export default SelectiveAdditional