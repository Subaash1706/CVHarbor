import React, { useState } from 'react'
import classes from './skills.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import SkillsInput from './SkillsInput'
import Grid from '../../cv_components/grid/Grid'

function Skills(props) {
    const [ count, setCount ] = useState(1)
  return (
    <div className='formSectionContainer'>
        <div className='heading'>Skills section</div>
        <Grid balanced='true' cols='2' style={{'gap': '18px'}}>
            { Array.from({length: count}, (_, ind)=>
                <SkillsInput key={ind}/>
            )}
        </Grid>
            <a className={classes.addMore} onClick={()=>setCount(prev=>prev+=1)}>Add more</a>
    </div>
  )
}

export default Skills