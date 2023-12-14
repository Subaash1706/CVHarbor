import React from 'react'
import A4sheet from '../../cv_components/a4/A4sheet'
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
    const dummyCertificationsArray = [ { name: 'Certification 1', date: 'YYYY/MM' }, { name: 'Certification 2', date: 'YYYY/MM'}]
    const personalInfo = bio.personal.length > 0 ? bio.personal[0] : dummyPersonalData
    const educationInfo = bio.education.length > 0 ? bio.education : dummyEducationData
    const skillsInfo = bio.skills.length > 0 ? bio.skills : dummySkills
    const xpInfo = bio.xp.length > 0 ? bio.xp : dummyXpDetails
    const certificationsInfo = bio.certifications.length > 0 ? bio.certifications : dummyCertificationsArray;
    const { personal, education, skills, xp, certifications, ...rest } = bio

    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                // console.log('list', [ obj[item] ])
                return ( 
                    <div key={ind}>
                        <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>{ heading }</Heading>
                        <Hr />
                        <InwardList listItems={ [obj[item]] } object = {true}/>
                    </div>
                    ) 
            }
        })
    }
  return (
        <A4sheet ref={ref}>
            <div className={classes.templateLayout}>
                <FlexBox style={{'margin': '1.5rem 0px'}}>
                    <Heading style={{'fontWeight': '550', 'fontSize':'14px'}}>{ personalInfo.name }&nbsp;{personalInfo.secondName && personalInfo.secondName }</Heading>
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
                            <TitleDate 
                                title={ `${item.course}, ${item.stream}`}
                                date={`${item.start_date.split('-')[0]}-${item.end_date.includes('-') ? item.end_date.split('-')[0]: item.end_date}`}
                             />     
                            <p>{ item.grade } {item.selector === 'GPA' ? 'CGPA' : '%'} </p>
                            {item.accomplishments && <InwardList listItems={ item.accomplishments }/>}
                        </section>
                    )
                })}

                {/* Technical Skills */}
                <section>
                    {/* { console.log(skillsInfo.flat())} */}
                    <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>Technical Skills</Heading>
                    <Hr />
                    <ul className={classes.skills}>
                        { skillsInfo.flat().map((item, ind)=>{
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
                        <TitleDate title={ item.role } date={`${item.start_date.split('-')[0]}-${item.end_date.includes('-') ? item.end_date.split('-')[0]: item.end_date}`}/>
                        {item.accomplishments && <InwardList listItems={ item.accomplishments }/>}
                    </section>
                    )
                })}
                {/* Certifications */}
                <section>
                    <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>Certifications</Heading>
                    <Hr />
                    <InwardList listItems = {[certificationsInfo]} object='true'/>
                </section>
                {/* {Others} */}
                <section>
                    { renderRest(rest) } 
                </section>
            </div>

        </A4sheet>
  )
})

export default Template1