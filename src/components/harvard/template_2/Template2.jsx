import React from "react"
import useFetchBioFromStore from "../../../hooks/useFetchBioFromStore"
import A4sheet from "../../cv_components/a4/A4sheet"
import Heading from "../../cv_components/heading/Heading"
import classes from './template2.module.css'
import FlexBox from "../../cv_components/flexbox/FlexBox"
import Hr from "../../cv_components/Hr"
import TitleDate from "../../cv_components/title_date/TitleDate"
import SubHeading from "../../cv_components/subheading/SubHeading"
import OutwardList from "../../cv_components/outward_list/OutwardList"
import InwardList from "../../cv_components/inward_list/InwardList"
import { useSelector } from "react-redux"

const Template2 = React.forwardRef((props, ref)=>{
    const bioFromStore = useFetchBioFromStore()
    const { personal, education, xp, skills, ...rest } = bioFromStore
    const skipped = useSelector(state=>state.bioData.skippedSections)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                return ( 
                    <div key={ind}>
                        <Heading style={{textTransform: 'uppercase', fontSize: '10.5px', paddingBlock: '8px'}} centered={true}>{ heading }</Heading>
                        <OutwardList listItems={ [obj[item]] } object = {true} textIndent='1.5rem'/>
                    </div>
                ) 
            }
        })
    }
    return (
        <A4sheet ref={ref}>
            <div className={classes.templateLayout}>
                <FlexBox>
                    <Heading style={{fontSize:'13.5px'}}>{ personal.name }&nbsp;{personal.secondName && personal.secondName }</Heading>
                    <div className={classes.contactContainer}>
                        <span>{ personal.email }</span> | <span>{ personal.phone }</span>
                        <div>{ personal.linkedIn }</div>
                    </div>
                </FlexBox>
                <Hr />
                {/* Education section */}
                {!skipped.includes('Education') && <section>
                    <Heading style={{textTransform: 'uppercase', fontSize: '10.5px', paddingBlock: '8px'}} centered={true}>Education</Heading>
                    {
                    education.map((item, ind)=>{
                        return(
                        <div key={ind} style={{'paddingTop': '10px'}}>
                            <TitleDate 
                                uppercase = { true }
                                // title={ `${item.course}, ${item.stream}`}
                                title={item.name}
                                date={`${item.start_date.split('-')[0]}-${item.end_date.includes('-') ? item.end_date.split('-')[0]: item.end_date}`}
                                style={{fontSize: '10.5px'}}
                            />
                            <p>{`${item.course}, ${item.stream}`}</p>
                            {item.accomplishments && <OutwardList listItems={ item.accomplishments && item.accomplishments } textIndent = {'1.5rem'} />}
                        </div>
                        )
                        })
                    }
                </section>}
                {/* Experience section */}
                {!skipped.includes('Experience') &&<section>
                    <Heading style={{textTransform: 'uppercase', fontSize: '10.5px', paddingBlock: '5px'}} centered={true}>Professional Experience</Heading>
                    { xp.map((item, ind)=>{
                        return(
                            <div key={ind} style={{'paddingTop': '10px'}}>
                                <TitleDate 
                                    uppercase = { true }
                                    title={item.name}
                                    date={`${item.start_date.split('-')[1]}  ${item.start_date.split('-')[0]}-${item.end_date.includes('-') ? (`${item.start_date.split('-')[1]}  ${item.end_date.split('-')[0]}`): item.end_date}`}
                                    style={{fontSize: '10.5px'}}
                                />
                                <p>{`${item.role}`}</p>
                                {item.accomplishments && <OutwardList listItems={ item.accomplishments && item.accomplishments } textIndent={'1.5rem'} />}
                            </div>
                            )
                    }) }   
                </section>}
                    {/* Technical Skills */}
                {!skipped.includes('Skills') &&<section>
                    <Heading style={{textTransform: 'uppercase', fontSize: '10.5px', paddingBlock: '5px'}} centered={true}>Technical Skills</Heading>
                    <ul className={classes.skills}>
                        { skills.flat().map((item, ind)=>{
                            return(
                                <li key={ ind }>{ item }</li>
                            )
                        })}
                    </ul>
                </section>}
                {/* Rest section */}
                <section>
                    { Object.values(bioFromStore).some(Boolean) && renderRest(rest) }
                </section>
            </div>
        </A4sheet>
)})

export default Template2