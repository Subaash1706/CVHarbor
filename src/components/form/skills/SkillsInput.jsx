import React, { useState, useEffect } from 'react'
import classes from './skillsinput.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'
import deleteSvg from '../../../assets/svg/delete_FILL0_wght400_GRAD0_opsz24.svg'

function SkillsInput() {

    return (
        <div className={classes.skillsContainer}>
            <FlexBox direction='row'>
                <LabelInput id='Skill_1' placeholder='Skill' labelName='Skill_1'/>
                <img src={deleteSvg} style={{'verticalAlign': 'middle', 'paddingRight': '5px'}} />
            </FlexBox>
        </div>
  )
}

export default SkillsInput