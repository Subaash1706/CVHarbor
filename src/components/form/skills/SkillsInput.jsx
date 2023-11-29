import React, { useState, useEffect } from 'react'
import classes from './skillsinput.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'
import deleteSvg from '../../../assets/svg/delete_FILL0_wght400_GRAD0_opsz24.svg'

function SkillsInput(props) {
    function deleteHandler(e){
        props.onDelete(e.target);
    }
    return (
        <div className={classes.skillsContainer}>
            <FlexBox direction='row'>
                <LabelInput id={ props.id } placeholder='Skill' labelName='Skill_1'/>
                <img id={ props.id } src={deleteSvg} style={{'verticalAlign': 'middle', 'paddingRight': '5px'}} onClick={deleteHandler}/>
            </FlexBox>
        </div>
  )
}

export default SkillsInput