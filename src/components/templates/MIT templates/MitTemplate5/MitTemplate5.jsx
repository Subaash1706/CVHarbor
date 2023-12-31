import React from 'react'
import A4sheet from '../../../cv_components/a4/A4sheet'
import classes from './mit.module.css'
import Heading from '../../../cv_components/heading/Heading'
import useFetchBioFromStore from '../../../../hooks/useFetchBioFromStore'
import FlexBox from '../../../cv_components/flexbox/FlexBox'
import Hr from '../../../cv_components/Hr'
import OutwardList from '../../../cv_components/outward_list/OutwardList'
import { useSelector } from 'react-redux'

// Requires summary
const MitTemplate5 = React.forwardRef((props, ref) => {
    const bioInfo = useFetchBioFromStore()
    const { personal, education , xp, skills, ...rest} = bioInfo
    const skipped = useSelector(state=>state.bioData.skippedSections)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                return(
                    <div key={ind}>
                        <Heading centered={true}>{heading}</Heading>
                        <Hr />
                        <div>{
                            obj[item].map((item, ind)=>{
                                return(
                                    <ul key={ind}>
                                      <li style={{listStylePosition:'inside'}}>
                                        {item.name}
                                      </li>  
                                      {item.accomplishments &&<OutwardList listItems={item.accomplishments} textIndent={'2rem'}/>}
                                    </ul>
                                )
                            })
                        }</div>
                    </div>
                )
            }
        })
    }
  return (
    <A4sheet ref={ref}>
        <div className={classes.templateLayout}>
            {/* Personal Section */}
            <section>
                <FlexBox centered={true}>
                    <Heading style={{fontSize: '14px'}}>{ personal.name }&nbsp;{personal.secondName && personal.secondName }</Heading>
                    <div>
                        <span><a href={`mailto:${personal.email}`}>{personal.email}</a></span>
                        <span>{personal.phone}</span>
                    </div>
                    <div>
                        <a href={`mailto:${personal.linkedIn}`}>{personal.linkedIn}</a>
                    </div>
                </FlexBox>

            </section>
            {/* Summary section */}
            <section style={{paddingTop: '8px'}}>
                <Heading centered={true}>Career Objective</Heading>
                <Hr />
                <div>{personal.summary}</div>
            </section>
            {/* Education section */}
            {!skipped.includes('Education') &&<section style={{paddingTop: '8px'}}>
                <Heading centered={true}>Career Objective</Heading>
                <Hr />
                {
                    education.map((item, ind)=>{
                        return(
                            <div key={ind} className={classes.gridContainer} style={{paddingTop: '5px'}}>
                                <div className={classes.grid1}>
                                    {item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}
                                </div>
                                <div className={classes.grid2}>
                                    <div style={{fontWeight: '550'}}>{item.course}, {item.stream}</div>
                                    <div>{item.name}</div>
                                    <div>{item.selector==='GPA' ? `GPA: ${item.grade}` : `${item.grade}%`}</div>
                                    { item.accomplishments ? <OutwardList listItems={item.accomplishments}/> : <></>}
                                </div>
                            </div>
                        )
                    })
                }
            </section>}
            {/* Skills Section */}
            {!skipped.includes('Skills') &&<section style={{paddingTop: '8px'}}>
                <Heading centered={true}>Career Objective</Heading>
                <Hr />
                <OutwardList listItems={skills.flat()}/>
            </section>}
            {/* Experience section */}
            {!skipped.includes('Experience') &&<section style={{paddingTop: '8px'}}>
                <Heading centered={true}>Professional Experience</Heading>
                <Hr />
                {
                    xp.map((item, ind)=>{
                        return(
                            <div key={ind} className={classes.gridContainer} style={{paddingTop: '5px'}}>
                                <div className={classes.grid1}>
                                    {item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}
                                </div>
                                <div className={classes.grid2}>
                                    <div style={{fontWeight: '550'}}>{item.role}</div>
                                    <div>{item.name}</div>
                                    {item.accomplishments ? <OutwardList listItems={item.accomplishments}/> : <></>}
                                </div>
                            </div>
                        )
                    })
                }
            </section>}
            {/* Additional section */}
            <section style={{paddingTop: '8px'}}>
                { Object.values(rest).some(Boolean) && renderRest(rest) }
            </section>
        </div>
    </A4sheet>
  )
})

export default MitTemplate5