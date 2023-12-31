import React from 'react'
import A4sheet from '../../cv_components/a4/A4sheet'
import classes from './template5.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import Heading from '../../cv_components/heading/Heading'
import useFetchBioFromStore from '../../../hooks/useFetchBioFromStore'
import TitleDate from '../../cv_components/title_date/TitleDate'
import InwardList from '../../cv_components/inward_list/InwardList'
import monthNames from '../../monthName'
import { useSelector } from 'react-redux'

const Template5 = React.forwardRef((props, ref) => {
    const bio = useFetchBioFromStore()
    const { personal, education, skills, xp, ...rest } = bio
    const skipped = useSelector(state=>state.bioData.skippedSections)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                // console.log(obj[item])
                return (
                    <div key={ind}>
                        <Heading style={{textTransform: 'uppercase', fontWeight: '700', paddingTop: '8px'}} centered={true}>{ heading }</Heading>
                        { obj[item].map((item, ind)=>{
                            console.log(item)
                            return(
                                <div key={ind}>
                                    <TitleDate title={item.name} date={item.date ? `${monthNames[+item.date.split('-')[1]]} ${item.date.split('-')[0]}` : 'MM/YYYY'} style={{fontWeight: '550'}}/>
                                    {/* <Heading style={{textTransform: 'uppercase', fontWeight: '300'}}>{ item.name }</Heading> */}
                                    {item.description ? <InwardList listItems={[item.description]} /> : <></>}
                                </div>
                            )
                        })}
                        
                        {/* <InwardList listItems={ [obj[item]] } object = {true}/> */}
                    </div>
                ) 
            }
        })
    }
  return (
    <A4sheet ref={ref}>
        <div className={classes.templateLayout}>
            {/* Personal */}
            <section>
                <FlexBox>
                    <Heading style={{textTransform: 'uppercase'}}>{ personal.name }&nbsp;{personal.secondName && personal.secondName }</Heading>
                    <div>
                        <span><a href={`mailto:${personal.email}`}>{personal.email}</a></span> •&nbsp;
                        <span>{personal.phone}</span>
                    </div>
                </FlexBox>
            </section>
            {/* Education */}
            {!skipped.includes('Education') &&<section>
                <Heading style={{textTransform: 'uppercase', fontWeight: '700', paddingTop: '8px'}} centered={true}>Education</Heading>
                {
                    education.map((item, ind)=>{
                        return(
                            <div key={ind} style={{paddingBottom:'5px'}}>
                                <div style={{fontWeight: '550'}}>{item.course}, {item.stream}</div>
                                <div>
                                    {item.name}
                                    <span>, ({`${monthNames[+item.end_date.split('-')[1]]} ${item.end_date.split('-')[0]}, Grade: ${item.grade}`})</span>
                                </div>
                            </div>
                        )
                    })
                }
            </section>}
            {/* Experience */}
            {!skipped.includes('Experience') &&<section>
                <Heading style={{textTransform: 'uppercase', fontWeight: '700'}} centered={true}>Professional Experience</Heading>
                {
                    xp.map((item, ind)=>{
                        const [ year, month ] = item.end_date.includes('-') ? item.end_date.split('-') : ['', item.end_date]
                        return(
                            <div key={ind} style={{paddingTop: '5px'}}>
                                <TitleDate title={item.name} date={`${monthNames[+month]} ${year}`} style={{fontWeight: '550'}}/>
                                <div style={{fontStyle: 'italic', paddingBottom: '5px'}}>{item.role}</div>
                                {item.accomplishments && <InwardList listItems={item.accomplishments}/>}
                            </div>
                        )
                    })
                }
            </section>}
            {/* Additional */}
            <section>
                { renderRest(rest) }
            </section>
        </div>
    </A4sheet>
  )
})

export default Template5