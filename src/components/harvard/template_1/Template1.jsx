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

const Template1 = React.forwardRef((props, ref)=>{
  return (
        <A4sheet ref={ref}>

            <div className={classes.templateLayout}>
                <FlexBox style={{'margin': '1.5rem 0px'}}>
                    <Heading style={{'fontWeight': '550', 'fontSize':'14px'}}>Name</Heading>
                        <div className={classes.contactContainer}>
                            <span style={{'marginRight': '8px'}}>sampleemail@email.com</span>
                            <span>+91234567890</span>
                        </div>
                </FlexBox> 
                {/* Education Section */}
                <section>
                    <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>Education</Heading>
                    <Hr />
                    <SubHeading style={{'fontWeight': '550', 'fontSize':'13px'}}>University name</SubHeading>
                    <TitleDate title='Course Name' date='MM/YYYY'/>
                    <p>Cgpa 9.04</p>
                    <InwardList listItems={['Achievement 1', 'Achievement 2', 'Achievement 3', 'Achievement 4', 'Achievement 5']}/>
                </section>
                {/* Technical Skills */}
                <section>
                    <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>Technical Skills</Heading>
                    <Hr />
                    <ul className={classes.skills}>
                        <li>Skill 1</li>
                        <li>Skill 2</li>
                        <li>Skill 3</li>
                        <li>Skill 4</li>
                        <li>Skill 5</li>
                        <li>Skill 6</li>
                        <li>Skill 7</li>
                        <li>Skill 8</li>
                    </ul>
                </section>
                {/* Experience section */}
                <section>
                    <Heading style={{'fontWeight': '550', 'fontSize': '14px','margin': '1rem 0px'}} centered='true'>Professional Experience</Heading>
                    <Hr />
                    <SubHeading style={{'fontWeight': '550', 'fontSize':'13px'}}>Company name</SubHeading>
                    <TitleDate title='Job role' date='MM/YYYY - MM/YYYY'/>
                    <InwardList listItems={['Achievement 1', 'Achievement 2', 'Achievement 3', 'Achievement 4']}/>
                </section>
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