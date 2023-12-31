import React from 'react'
import A4sheet from '../../cv_components/a4/A4sheet'
import classes from './template4.module.css'
import Heading from '../../cv_components/heading/Heading'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import useFetchBioFromStore from '../../../hooks/useFetchBioFromStore'
import Hr from '../../cv_components/Hr'
import TitleDate from '../../cv_components/title_date/TitleDate'
import OutwardList from '../../cv_components/outward_list/OutwardList'
import { useSelector } from 'react-redux'

const Template4 = React.forwardRef((props, ref) => {
    const bioFromStore = useFetchBioFromStore()
    const { personal, education, xp, skills, ...rest } = bioFromStore
    const skipped = useSelector(state=>state.bioData.skippedSections)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const names = []
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                    obj[item].forEach((item)=>{
                        names.push(item.name)})
                        return ( 
                            <div key={ind}>
                                <div style={{fontSize: '10.5px'}}>
                                    {heading}: {names.join(', ')}
                                </div>
                            </div>
                        )  
            }
        })
    }
    function renderLinearName(reference, target, item, names){
        if(reference === target){
            return(<span>{item.name}: {names.join('')}</span>)
        }
    }
    return (
    <A4sheet ref={ref}>
        <div className={classes.templateLayout}>
            {/* Personal section */}
            <section>
                <FlexBox>
                    <Heading style={{fontSize: '11px'}}>{ personal.name }&nbsp;{personal.secondName && personal.secondName }</Heading>
                    <div><a href={`mailto:${personal.email}`}>{personal.email}</a> | <span>{personal.phone}</span></div>
                </FlexBox>
            </section>
            {/* Education section */}
            {!skipped.includes('Education') &&<section>
                <Heading style={{fontSize: '11px', paddingBlock: '8px'}} centered={true}>Education</Heading>
                <Hr />
                {
                    education.map((item, ind)=>{
                        return(
                            <div key={ind}>
                                <Heading style={{fontSize:'11px', textTransform: 'uppercase'}}>{item.name}</Heading>
                                <TitleDate title={`${item.course}, ${item.stream}`} date={`${item.end_date.includes('-') ? `${item.end_date.split('-')[1]} ${item.end_date.split('-')[0]}`: item.end_date}`}/>
                                {item.accomplishments && <OutwardList listItems={item.accomplishments} textIndent={'1rem'}/>}
                            </div>
                        )
                    })
                }
            </section>}
            {/* Experience section */}
            {!skipped.includes('Experience') &&<section>
                <Heading style={{fontSize: '11px', paddingBlock: '8px'}} centered={true}>Professional Experience</Heading>
                <Hr />
                {
                    xp.map((item, ind)=>{
                        return(
                            <div key={ind}>
                                <Heading style={{fontSize:'11px', textTransform: 'uppercase'}}>{item.name}</Heading>
                                <TitleDate title={item.role} date={`${item.start_date.split('-')[1]} ${item.start_date.split('-')[0]}-${item.end_date.includes('-') ? `${item.end_date.split('-')[1]} ${item.end_date.split('-')[0]}`: item.end_date}`}/>
                                {item.accomplishments && <OutwardList listItems={item.accomplishments} textIndent={'1rem'}/>}
                            </div>
                        )
                    })
                }
            </section>}
            {/* Skills section */}
            {!skipped.includes('Skills') &&<section>
                <Heading style={{fontSize: '11px', paddingBlock: '8px'}} centered={true}>Technical Skills</Heading>
                <Hr />
                <div>{
                        skills.flat().join(', ')
                    }</div>
            </section>}
            {/* Additional Section */}
            <section>
                <Heading style={{fontSize: '11px', paddingBlock: '8px'}} centered={true}>Additionals</Heading>
                <Hr />
                    {renderRest(rest)}
            </section>
        </div>
    </A4sheet>
  )
})

export default Template4