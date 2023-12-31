import React from 'react'
import classes from './template7.module.css'
import A4sheet from '../../cv_components/a4/A4sheet'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import Heading from '../../cv_components/heading/Heading'
import useFetchBioFromStore from '../../../hooks/useFetchBioFromStore'
import TitleDate from '../../cv_components/title_date/TitleDate'
import OutwardList from '../../cv_components/outward_list/OutwardList'
import InwardList from '../../cv_components/inward_list/InwardList'
import { useSelector } from 'react-redux'

const Template7 = React.forwardRef((props, ref) => {
    const bioInfo = useFetchBioFromStore()
    const { personal, education, xp, skills, ...rest } = bioInfo
    const skipped = useSelector(state=>state.bioData.skippedSections)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                return(
                    <ul key={ind} className={classes.noList}>
                        <li style={{fontWeight: '550'}}>
                            <div style={{textAlign:'center'}}>{heading}</div> 
                            {
                                obj[item].map((item, ind)=>{
                                    return(<div key={ind} style={{fontWeight: '400'}}>
                                        <div>{item.name}</div>
                                    </div>)
                                })
                            }
                        </li>
                        <li>

                        </li>
                    </ul>
                )
            }
        })
    }
  return (
    <A4sheet ref={ref}>
        <div className={classes.templateLayout}>
           {/* Personal section  */}
           <section>
                <FlexBox>
                    <Heading>{ personal.name }&nbsp;{personal.secondName && personal.secondName }</Heading>
                    <div>
                        <span>{personal.phone}</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span>
                            <a href={`mailto:${personal.email}`}>{personal.email}</a>
                        </span>
                        <span>&nbsp;/&nbsp;</span>
                        <span><a href={`mailto:${personal.linkedIn}`}>{personal.linkedIn}</a></span>
                    </div>
                </FlexBox>
           </section>
           {/* Education section  */}
           {!skipped.includes('Education') &&<section>
                <Heading centered={true} style={{paddingBlock: '7px'}}>Education</Heading>
                {
                    education.map((item, ind)=>{
                        return(
                            <ul key={ind} className={classes.noList}>
                                <li style={{fontWeight: '550'}}>{item.name}</li>
                                <li>
                                    <TitleDate title={`${item.course}, ${item.stream}`} date={`${item.start_date.split('-')[0]}-${item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}`}/>
                                </li>
                                {item.accomplishments && <OutwardList listItems={item.accomplishments}/>}
                            </ul>
                        )
                    })
                }
           </section>}
           {/* Expereince section */}
           {!skipped.includes('Experience') &&<section>
                <Heading centered={true} style={{paddingBlock: '7px'}}>Expereince</Heading>
                {
                    xp.map((item, ind)=>{
                        return(
                            <ul key={ind} className={classes.noList}>
                                <li style={{fontWeight: '550'}}>{item.name}</li>
                                <li>
                                    <TitleDate title={`${item.role}`} date={`${item.start_date.split('-')[0]}-${item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}`}/>
                                </li>
                                {item.accomplishments &&<OutwardList listItems={item.accomplishments}/>}
                            </ul>
                        )
                    })
                }
           </section>}
           {/* Skills section */}
           {!skipped.includes('Skills') &&<section>
                <Heading centered={true} style={{paddingBlock: '7px'}}>Skills</Heading>
                {
                    skills.flat().map((item, ind)=>{
                        return(<ul key={ind} className={classes.noList}>
                            <li>{item}</li>
                        </ul>)
                    })
                }
           </section>}
           {/* Additional section  */}
           <section>
            { renderRest(rest) }
           </section>
        </div>
    </A4sheet>
  )
})

export default Template7