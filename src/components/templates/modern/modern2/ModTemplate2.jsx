import React from 'react'
import A4sheet from '../../../cv_components/a4/A4sheet'
import classes from './mod.module.css'
import Heading from '../../../cv_components/heading/Heading'
import useFetchBioFromStore from '../../../../hooks/useFetchBioFromStore'
import Hr from '../../../cv_components/Hr'
import image from '../../../../assets/images/image.png'
import OutwardList from '../../../cv_components/outward_list/OutwardList'
import { useSelector } from 'react-redux'

const ModTemplate2 = React.forwardRef((props, ref) => {
    const bio = useFetchBioFromStore();
    const { personal, education, xp, skills, ...rest } = bio
    const skipped = useSelector(state=>state.bioData.skippedSections)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                return(
                    <div key={ind}>
                        <div className={classes.heading2}>{heading}</div>
                        <ul >{
                            obj[item].map((item, ind)=>{
                                return(
                                    <li >{item.name}</li>
                                )
                            })
                        }</ul>
                    </div>
                )
            }
        })
    }
    // console.log(skills)
  return (
    <A4sheet ref={ref}>
        <div className={classes.templateLayout}>
            <section className={classes.personalSection}>
                <Heading style={{fontSize: '25px', fontWeight: '550', textTransform: 'uppercase'}}>{personal.name} {personal.secondName}</Heading>
            </section>
            <div className={classes.gridLeft}>
                {/* Personal section */}
                <section className={classes.container}>
                    {/* Experience */}
                    {!skipped.includes('Experience') &&<section>
                        <div className={classes.heading}>
                            Experience
                        </div>
                        <div>{
                            xp.map((item, ind)=>{
                                return(
                                    <React.Fragment key={ind}>
                                        <div style={{fontWeight: '550'}}>{item.role}</div>
                                        <div style={{fontStyle: 'italic'}}>
                                            {item.name}&nbsp;
                                            <span>{item.start_date.split('-')[0]}-{item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}</span>
                                        </div>
                                        {item.accomplishments &&<OutwardList listItems={item.accomplishments}/>}
                                    </React.Fragment>
                                )
                            })
                        }</div>
                    </section>}
                    {/* Education */}
                    {!skipped.includes('Education') &&<section>
                    <div className={classes.heading}>
                            Education
                        </div>
                        <div>{
                            education.map((item, ind)=>{
                                return(
                                    <React.Fragment key={ind}>
                                        <div style={{fontWeight: '550'}}>{item.course}, {item.stream}</div>
                                        <div style={{fontStyle: 'italic'}}>
                                            {item.name}&nbsp;
                                            <span>{item.start_date.split('-')[0]}-{item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}</span>
                                        </div>
                                        {item.accomplishments &&<OutwardList listItems={item.accomplishments}/>}
                                    </React.Fragment>
                                )
                            })
                        }</div>
                    </section>}
                </section>
            </div>
            <div className={classes.gridRight}>
                <div className={classes.rightSection}>
                <div className={classes.avatar}>
                    <img src={personal.avatar ? personal.avatar : image}/>
                </div>
                    <div className={classes.heading2}>Contact me at</div>
                    <section className={classes.indent}>
                        <div>{personal.phone}</div>
                        <div>{personal.email}</div>
                        <div>{personal.linkedIn}</div>
                    </section>
                    {/* Skills */}
                
                    {!skipped.includes('Skills') &&<section>
                    <div className={classes.heading2}>
                        Skills
                    </div>
                        {skills.length > 0 && <ul className={classes.skills}>
                            { skills.flat().map((item, ind)=>{
                                return(
                                    <li key={ ind }>{ item }</li>
                                )
                            })}
                        </ul>
                    }</section>}
                    { Object.values(rest).some(Boolean) && renderRest(rest)}
                </div>
            </div>
        </div>
    </A4sheet>
  )
})

export default ModTemplate2