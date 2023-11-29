import React from 'react'
import A4sheet from '../../cv_components/a4/A4sheet'
import A4Container from '../../cv_components/a4/A4Container'
import Heading from '../../cv_components/heading/Heading'
import SubHeading from '../../cv_components/subheading/SubHeading'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import classes from './template1.module.css'
import Hr from '../../cv_components/Hr'
import TitleDate from '../../cv_components/title_date/TitleDate'
import InwardList from '../../cv_components/inward_list/InwardList'
import { dummyEducationData, dummyPersonalData, dummySkills, dummyXpDetails } from '../../store/store'
import { useSelector } from 'react-redux'

const Template1 = React.forwardRef((props, ref)=>{
    const bio = useSelector(state=>state.bioData.data)
    const personalInfo = bio.personal.length > 0 ? bio.personal[0] : dummyPersonalData
    const educationInfo = bio.education.length > 0 ? bio.education : dummyEducationData
    const skillsInfo = bio.skills.length > 0 ? bio.skills : dummySkills
    const xpInfo = bio.xp.length > 0 ? bio.xp : dummyXpDetails
  return (
        <A4sheet ref={ref}>
            <div className={classes.templateLayout}>
                <FlexBox style={{'margin': '1.5rem 0px'}}>
                    <Heading style={{'fontWeight': '550', 'fontSize':'14px'}}>{ personalInfo.name }</Heading>
                        <div className={classes.contactContainer}>
                            <span style={{'marginRight': '8px'}}>{ personalInfo.email }</span>
                            <span>{ personalInfo.phone }</span>
                        </div>
                </FlexBox> 
                {/* Education Section */}
                <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>Education</Heading>
                <Hr />
                { educationInfo.map((item, index)=>{
                    return(
                        <section key={index}>
                            <SubHeading style={{'fontWeight': '550', 'fontSize':'13px'}}>{ item.name }</SubHeading>
                            <TitleDate title='Course Name' date='MM/YYYY'/>
                            <p>Cgpa { item.grade }</p>
                            <InwardList listItems={ item.accomplishments }/>
                        </section>
                    )
                })}

                {/* Technical Skills */}
                <section>
                    <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>Technical Skills</Heading>
                    <Hr />
                    <ul className={classes.skills}>
                        { skillsInfo.map((item, ind)=>{
                            return(
                                <li key={ ind }>{ item }</li>
                            )
                        })}
                    </ul>
                </section>
                {/* Experience section */}
                <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>Professional Experience</Heading>
                <Hr />
                { xpInfo.map((item, ind)=>{
                    return(
                    <section key={ind}>
                        <SubHeading style={{'fontWeight': '550', 'fontSize':'13px'}}>{ item.name }</SubHeading>
                        <TitleDate title={ item.role } date={`${item.start_date}-${item.end_date}`}/>
                        <InwardList listItems={ item.accomplishments }/>
                    </section>
                    )
                })}
                {/* Certifications */}
                <section>
                    <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>Certifications</Heading>
                    <Hr />
                    <InwardList listItems = {['Certification 1', 'Certification 2', 'Certification 3', 'Certification 4']}/>
                </section>
            </div>

        </A4sheet>
  )
})

export default Template1