import React from 'react'
import classes from './mit.module.css'
import A4sheet from '../../../cv_components/a4/A4sheet'
import useFetchBioFromStore from '../../../../hooks/useFetchBioFromStore'
import Heading from '../../../cv_components/heading/Heading'
import FlexBox from '../../../cv_components/flexbox/FlexBox'
import Hr from '../../../cv_components/Hr'
import Grid from '../../../cv_components/grid/Grid'
import TitleDate from '../../../cv_components/title_date/TitleDate'
import OutwardList from '../../../cv_components/outward_list/OutwardList'
import { useSelector } from 'react-redux'

const MitTemplate1 = React.forwardRef((props, ref) => {
    const bioInfo = useFetchBioFromStore(); 
    const { personal, education, xp, skills, ...rest } =bioInfo
    const skipped = useSelector(state=>state.bioData.skippedSections)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                return(
                    <div className={classes.sectionGrid}>
                        <Heading className={classes.grid1} style={{fontWeight: '550'}}>{heading}</Heading>
                        <div className={classes.grid2}>{
                            obj[item].map((item, ind)=>{
                                return(
                                    <div key={ind}>
                                        <TitleDate title={item.name} date={item.date?`${item.date.split('-')[1]}-${item.date.split('-')[0]}`:''}/>
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
            {/* Personal section */}
            <section style={{paddingBlock: '8px'}}>
                <FlexBox centered={true}>
                    <Heading style={{fontSize: '13px', fontWeight: '550'}}>{ personal.name }&nbsp;{personal.secondName && personal.secondName }</Heading>
                    <div>
                        <span>{personal.phone}</span>
                        <span>&nbsp;•&nbsp;</span>
                        <span>{personal.email}</span>
                        <span>&nbsp;•&nbsp;</span>
                        <span>{personal.linkedIn}</span>
                    </div>
                </FlexBox>
                <div><Hr /></div>
            </section>
            {/* Education section */}
            {!skipped.includes('Education') &&<section>
                <div className={classes.sectionGrid}>
                    <Heading className={classes.grid1} style={{fontWeight: '550'}}>Education</Heading>
                    {
                        education.map((item, ind)=>{
                            return(
                                <div key={ind} style={{paddingBottom: '8px'}} className={classes.grid2}>
                                    <div style={{fontWeight: '550'}}>{item.name}</div>
                                    <TitleDate title={`${item.course}, ${item.stream}`} date={item.end_date.includes('-') ? `${item.end_date.split('-')[1]} ${item.end_date.split('-')[0]}`: `${item.end_date}`}/>
                                    {item.accomplishments &&<OutwardList listItems={item.accomplishments}/>}
                                    <div></div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>}
            {/* Experience section  */}
            {!skipped.includes('Experience') &&<section>
                <div className={classes.sectionGrid}>
                    <Heading className={classes.grid1} style={{fontWeight: '550'}}>Experience</Heading>
                    {
                        xp.map((item, ind)=>{
                            return(
                                <div key={ind} style={{paddingBottom: '8px'}} className={classes.grid2}>
                                    <div style={{fontWeight: '550'}}>{item.name}</div>
                                    <TitleDate title={`${item.role}`} date={item.end_date.includes('-') ? `${item.end_date.split('-')[1]} ${item.end_date.split('-')[0]}`: `${item.end_date}`}/>
                                    {item.accomplishments &&<OutwardList listItems={item.accomplishments}/>}
                                </div>
                            )
                        })
                    }
                </div>
            </section>}
            {/* Skills section */}
            {!skipped.includes('Skills') &&<section>
                <div className={classes.sectionGrid}>
                    <Heading className={classes.grid1} style={{fontWeight: '550'}}>Skills</Heading>
                    <div className={classes.grid2}>{skills.flat().join(', ')}</div>
                </div>
            </section>}
            {/* Additional section */}
            <section>
                { renderRest(rest) }
            </section>
        </div>
    </A4sheet>
  )
})

export default MitTemplate1