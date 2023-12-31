import React from 'react'
import A4sheet from '../../cv_components/a4/A4sheet'
import classes from './template3.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import Heading from '../../cv_components/heading/Heading'
import useFetchBioFromStore from '../../../hooks/useFetchBioFromStore'
import Hr from '../../cv_components/Hr'
import OutwardList from '../../cv_components/outward_list/OutwardList'
import monthNames from '../../monthName'
import { useSelector } from 'react-redux'

const Template3 = React.forwardRef((props, ref)=>{
    const bioFromStore = useFetchBioFromStore()
    const { personal, education, xp, skills, ...rest } = bioFromStore
    const skipped = useSelector(state=>state.bioData.skippedSections)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            if(obj[item].length > 0){
                return obj[item].map((item, ind)=>{
                    return ( 
                        <li key={ind} style={{marginLeft: '1rem'}}>
                            <Heading style={{fontSize: '11px'}}>{item.name}{item.description ? <span style={{fontWeight: '400'}}>: {item.description ? item.description : ''}</span> : ''}</Heading>
                        </li> 
                )    
                })

            }
        })
    }
    function renderHeading(rest){
        if(Object.values(rest).some(Boolean)){
            return <Heading style={{fontSize: '11px', padding: '5px 0px 2px 0px'}}>Additional</Heading>
        } 
    }
    return(
        <A4sheet ref={ref}>
            <div className={classes.templateLayout}>
                <FlexBox>
                    <Heading style={{fontSize: '14px'}}>{ personal.name }&nbsp;{personal.secondName && personal.secondName }</Heading>
                    <div>
                        <span>{personal.phone}</span>/
                        <span>{personal.email}</span>
                    </div>
                </FlexBox>
                <Hr />
                {/* Self summary section */}
                <section>
                    <Heading style={{fontSize: '11px', padding: '5px 0px 2px 0px'}}>Summary</Heading>
                    {personal.summary ? <p className={classes.summary}>{personal.summary}.</p> : <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit officia fuga quidem! Deleniti corporis facere, eligendi, harum expedita neque hic tenetur sequi, illum inventore quam!</p>}
                </section>
                {/* Skills section */}
                {!skipped.includes('Skills') && <section>
                    <Heading style={{fontSize: '11px', padding: '5px 0px 2px 0px'}}>Core competencies</Heading>
                    <ul className={classes.skills}>
                        { skills.flat().map((item, ind)=>{
                            return(
                                <li key={ ind }>{ item }</li>
                            )
                        })}
                    </ul>
                </section>}
                {/* Experience section */}
                {!skipped.includes('Experience') &&<section>
                    <Heading style={{fontSize: '11px', padding: '5px 0px 2px 0px'}}>Experience</Heading>
                    { xp.map((item, ind)=>{
                        return(
                            <div className={classes.inward} key={ind}>
                                <Heading style={{fontSize: '11px', padding: '5px 0px 2px 0px'}}>{item.name}</Heading>
                                <FlexBox direction='row' style={{justifyContent: 'space-between'}}>
                                    <Heading style={{fontSize: '11px', fontStyle: 'italic'}}>{item.role}</Heading>
                                    <div>{`${item.start_date.split('-')[0]}-${item.end_date.includes('-') ? (`${item.end_date.split('-')[0]}`): item.end_date}`}</div>
                                </FlexBox>
                                {item.accomplishments && <OutwardList listItems={item.accomplishments}/>}
                            </div>
                        )
                    })}
                </section>}
                {/* Education section */}
                {!skipped.includes('Education') &&<section>
                    <Heading style={{fontSize: '11px', padding: '5px 0px 2px 0px'}}>Education</Heading>
                    { education.map((item, ind)=>{
                        return(
                            <div className={classes.inward} key={ind}>
                                <Heading style={{fontSize: '11px', padding: '5px 0px 2px 0px'}}>{item.name}</Heading>
                                <FlexBox direction='row' style={{justifyContent: 'space-between'}}>
                                    <Heading style={{fontSize: '11px', fontStyle: 'italic'}}>{`${item.course}-${item.stream}`}</Heading>
                                    <div>{`${item.start_date.split('-')[0]}-${item.end_date.includes('-') ? (`${item.end_date.split('-')[0]}`): item.end_date}`}</div>
                                </FlexBox>
                                {item.accomplishments && <OutwardList listItems={item.accomplishments}/>}
                            </div>
                        )
                    })}
                </section>}
                {/* Additional section */}
                <section>          
                    { renderHeading(rest) }
                    <ul className={classes.inward}>
                        { renderRest(rest) }
                    </ul>
                </section>
            </div>
        </A4sheet>
    )
})

export default Template3