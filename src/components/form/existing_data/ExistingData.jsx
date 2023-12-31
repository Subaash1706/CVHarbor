import React from 'react'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import classes from './existing.module.css'
import editSvg from '../../../assets/svg/edit_FILL1_wght400_GRAD0_opsz24.svg'
import deleteSvg from '../../../assets/svg/delete_FILL0_wght400_GRAD0_opsz24.svg'

function ExistingData(props) {
    const bio = useSelector(state=>state.bioData.data)
    const target = bio[`${props.target}`]
    const { dataArray } = props
  return (
    <>
        { target && target.map((item, index)=>{
            const { name, secondName, email, phone, linkedIn, course, stream, grade, start_date, end_date, id } = item;
            return(
                    <FlexBox key={index} style={{border: '1px solid gray', alignItems: 'start', padding: '15px', 'position': 'relative', margin: '8px', backgroundColor:'white', borderRadius: '8px', boxShadow: '0px 0px 15px rgba(0 ,0, 0, 0.05)', overflow: 'hidden'}} width='120'>
                        <strong style={{'fontSize': '1.5rem'}}>{name}&nbsp;{ secondName && secondName }</strong>
                        {(course || email ) && <p>{course || email}, {course && stream}</p>}
                        {(grade || phone) && <p>{(grade && `Grade/Percentage: ${grade}`) || phone}</p>}
                        { linkedIn && <p>{ linkedIn }</p>}
                    {start_date && <p>{start_date}-{end_date}</p>}
                        <center className={classes.number}>{index + 1}</center>
                        <div className={classes.editContainer}>
                            <div onClick={(e)=>props.onClick(e, id)}>
                                <img id='edit' src={editSvg} alt="Edit entered info" />
                            </div>
                            {props.target !== 'personal' && <div onClick={(e)=>props.onClick(e, id)}>
                                <img id='delete' src={deleteSvg} alt="Delete current info" />
                            </div>}
                        </div>
                    </FlexBox>
            )
        })}
        { (dataArray && dataArray.length > 0) && 
            dataArray.map((item, index)=>{
                return(
                    <FlexBox key={index} style={{border: '1px solid gray', alignItems: 'start', padding: '15px', 'position': 'relative', margin: '8px'}} width='100'>
                        <strong style={{'fontSize': '1.5rem'}}>{item}</strong>
                        <center className={classes.number}>{index + 1}</center>
                        <div className={classes.editContainer}>
                            <div onClick={(e)=>props.onClick(e, item)}>
                                <img id='edit' src={editSvg} alt="Edit entered info" />
                            </div>
                            <div onClick={(e)=>props.onClick(e, item)}>
                                <img id='delete' src={deleteSvg} alt="Delete current info" />
                            </div>
                        </div>
                    </FlexBox>
                )
            })
        }
        { target ? <a className={classes.addMoreButton} onClick={props.onAddMore} style={{'display': props.disableAddMore && 'none'}}>+Add more</a> : <></>}
    </>
  )
}

export default ExistingData