import React from 'react'
import classes from './template6.module.css'
import useFetchBioFromStore from '../../../hooks/useFetchBioFromStore'
import A4sheet from '../../cv_components/a4/A4sheet'
import Heading from '../../cv_components/heading/Heading'
import Hr from '../../cv_components/Hr'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import OutwardList from '../../cv_components/outward_list/OutwardList'
import InwardList from '../../cv_components/inward_list/InwardList'

//requires name, phone, email, linkedin link, summary, requires accomplishments in all sections for better results
const Template6 = React.forwardRef((props, ref) => {
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
                        <Heading style={{fontWeight: '550', fontSize: '13px'}}>{heading}</Heading>
                        <ul className={classes.indentify}>
                            {
                                obj[item].map((item, ind)=>{
                                    return(
                                        <React.Fragment key={ind}>
                                        <li >
                                            <span style={{fontWeight: '550'}}>{item.name}</span><span>&nbsp;</span>
                                            {item.date ? <span>{`${item.date.split('-')[0]}, ${item.date.split('-')[1]}`}</span> : <></>}
                                        </li>
                                            {item.description && <OutwardList listItems={[item.description]} textIndent={'1.25rem'}/>}
                                            </React.Fragment>
                                    )
                                })
                            }

                        </ul>
                    </div>
                    )


                
            }
        })
    }
    return (  
        <A4sheet ref={ref}>
            <div className={classes.templateLayout}>
                {/* Personal section */}
                <section style={{paddingBlock: '2rem'}}>
                    <Heading style={{fontWeight: '550', fontSize:'13px'}}>{ personal.name }&nbsp;{personal.secondName && personal.secondName }</Heading>
                    <Hr />
                    <div>
                        <span>
                            {personal.phone}
                        </span>
                        <span>&nbsp;•&nbsp;</span>
                        <span>
                            <a href={`mailto:${personal.email}`}>
                                {personal.email}
                            </a>
                        </span>
                        <span>&nbsp;•&nbsp;</span>
                        <span>
                            <a href={personal.linkedIn}>{personal.linkedIn}</a>
                        </span>
                    </div>
                </section>
                {/* Summary section */}
                {personal.summary ? <section>
                    <Heading style={{fontWeight: '550', fontSize: '13px'}}>Summary</Heading>
                    <OutwardList listItems={personal.summary.split('.')} textIndent={'2rem'}/>
                </section> : <></>}
                {/* Education section */}
                {!skipped.includes('Education') &&<section>
                    <Heading style={{fontWeight: '550', fontSize: '13px'}}>Education</Heading>
                    {
                        education.map((item, ind)=>{
                            return(<div key={ind}>
                                <ul className={classes.indentify}>
                                    <li>
                                        <span style={{fontWeight: '550'}}>{item.name}</span>
                                    </li>
                                    <li style={{fontStyle: 'italic'}}>
                                        <span>{item.course}, {item.stream}</span>
                                        <span>, {item.start_date.split('-')[0]} - {item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}</span>
                                    </li>
                                </ul>
                                {item.accomplishments && <OutwardList listItems={item.accomplishments} textIndent={'2.5rem'}/>}
                            </div>)
                        })
                    }
                </section>}
                {/* Experience section */}
                {!skipped.includes('Experience') &&<section>
                    <Heading style={{fontWeight: '550', fontSize: '13px'}}>Experience</Heading>
                    {
                        xp.map((item, ind)=>{
                            return(<div key={ind}>
                                <ul className={classes.indentify}>
                                    <li>
                                        <span style={{fontWeight: '550'}}>{item.name}</span>
                                    </li>
                                    <li style={{fontStyle: 'italic'}}>
                                        <span>{item.role}</span>
                                        <span>, {item.start_date.split('-')[0]} - {item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}</span>
                                    </li>
                                </ul>
                                {item.accomplishments && <OutwardList listItems={item.accomplishments} textIndent={'2.5rem'}/>}
                            </div>)
                        })
                    }
                </section>}
                {/* Additional section */}
                <section>
                    { renderRest(rest) }
                </section>
            </div>
        </A4sheet>
  )
})

export default Template6