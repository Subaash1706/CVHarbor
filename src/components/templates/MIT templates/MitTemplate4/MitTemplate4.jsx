import React from 'react'
import A4sheet from '../../../cv_components/a4/A4sheet'
import classes from './mit.module.css'
import FlexBox from '../../../cv_components/flexbox/FlexBox'
import Heading from '../../../cv_components/heading/Heading'
import useFetchBioFromStore from '../../../../hooks/useFetchBioFromStore'
import Hr from '../../../cv_components/Hr'
import TitleDate from '../../../cv_components/title_date/TitleDate'
import OutwardList from '../../../cv_components/outward_list/OutwardList'
import { useSelector } from 'react-redux'

const MitTemplate4 = React.forwardRef((props, ref) => {
    const bioInfo = useFetchBioFromStore()
    const { personal, education, xp, skills, ...rest } = bioInfo
    const skipped = useSelector(state=>state.bioData.skippedSections)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                return(
                    <div key={ind}>
                        <Heading style={{fontSize: '12px', paddingTop: '5px', textTransform: 'uppercase'}}>{heading}</Heading>
                        <Hr />
                        <div>{
                            obj[item].map((item, ind)=>{
                                return(
                                    <div key={ind}>
                                        <TitleDate title={item.name} date={item.date?`${item.date.split('-')[0]}`:''}/>
                                        {item.accomplishments &&<OutwardList listItems={item.accomplishments}/>}
                                    </div>
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
                    <Heading>{ personal.name }&nbsp;{personal.secondName && personal.secondName }</Heading>
                    <div>{personal.phone}</div>
                    <div><a href={`mailto:${personal.email}`}>{personal.email}</a></div>
                </FlexBox>
            </section>
            {/* Education section */}
            {!skipped.includes('Education') &&<section>
                <Heading style={{fontSize: '12px'}}>EDUCATION</Heading>
                <Hr />
                {
                    education.map((item, ind)=>{
                        return(
                        <div key={ind}>
                            <FlexBox style={{justifyContent: 'space-between'}} direction='row'>
                                <Heading>{item.name}</Heading>
                                <div style={{fontWeight: '550'}}>{ item.selector === 'GPA' ? `GPA: ${item.grade}` : `${item.grade}%`}</div>
                            </FlexBox>
                            <FlexBox style={{justifyContent: 'space-between'}} direction='row'>
                                <div style={{fontStyle: 'italic'}}>{item.course}, {item.stream}</div>
                                <div>{item.end_date ? `${item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}` : item.end_date}</div>
                            </FlexBox>
                            {item.accomplishments &&<OutwardList listItems={item.accomplishments}/>}
                        </div>

                        )       
                    })
                }
            </section>}
            {/* Experience section */}
            {!skipped.includes('Experience') &&<section>
                <Heading style={{fontSize: '12px', paddingTop: '5px'}}>EXPERIENCE</Heading>
                <Hr />
                {
                    xp.map((item, ind)=>{
                        return(
                        <div key={ind}>
                            <Heading>{item.name}</Heading>
                            <FlexBox style={{justifyContent: 'space-between'}} direction='row'>
                                <Heading style={{fontStyle: 'italic'}}>{item.role}</Heading>
                                <div>{item.end_date ? `${item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}` : item.end_date}</div>
                            </FlexBox>
                            {item.accomplishments &&<OutwardList listItems={item.accomplishments}/>}
                        </div>

                        )       
                    })
                }
            </section>}
            {/* Skills section */}
            {!skipped.includes('Skills') &&<section>
                <Heading style={{fontSize: '12px', paddingTop: '5px'}}>SKILLS</Heading>
                <Hr />
                <div>{skills.flat().join(', ')}</div>
            </section>}
            {/* Additional section */}
            <section>
                {Object.values(rest).some(Boolean) && renderRest(rest) }
            </section>
        </div>
    </A4sheet>
  )
})

export default MitTemplate4