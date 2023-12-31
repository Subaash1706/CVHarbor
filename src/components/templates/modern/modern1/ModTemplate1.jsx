import React from 'react'
import A4sheet from '../../../cv_components/a4/A4sheet'
import classes from './modern.module.css'
import image from '../../../../assets/images/image.png'
import Heading from '../../../cv_components/heading/Heading'
import Hr from '../../../cv_components/Hr'
import useFetchBioFromStore from '../../../../hooks/useFetchBioFromStore'
import OutwardList from '../../../cv_components/outward_list/OutwardList'
import { useSelector } from 'react-redux'

const ModTemplate1 = React.forwardRef((props, ref) => {
    const bio = useFetchBioFromStore();
    const { personal, education, xp, skills, languages, ...rest } = bio;
    const skipped = useSelector(state=>state.bioData.skippedSections)
    console.log(personal)
    function renderRest(obj){
        const objKeys = Object.keys(obj)
        return objKeys.map((item, ind)=>{
            const heading = item.slice( 0, 1 ).toUpperCase() + item.slice( 1, item.length)
            if(obj[item].length > 0){
                return(
                    <div key={ind}>
                        <Heading style={{fontSize: '16px'}}>{heading}</Heading>
                        <Hr /> 
                        <ul style={{listStylePosition: 'inside'}}>{
                            obj[item].map((item, ind)=>{
                                return(
                                    <li style={{fontSize: '10px'}}>{item.name}</li>
                                )
                            })
                        }</ul>
                    </div>
                )
            }
        })
    }
    return (
    <A4sheet ref={ref}>
        <div className={classes.templateLayout}>
            <div className={classes.pageGrid}>
                <div className={classes.gridLeft}>
                    <div className={classes.gridLeftItemsContainer}>
                        <img src={personal.avatar ? personal.avatar : image} className={classes.avatar}/>
                    <section className={classes.pesonalDetails}>
                        <Heading centered={true} style={{fontSize: '16px'}}>Contact</Heading>
                        <Hr />
                        <div>
                            <Heading>Phone</Heading>
                            <div>{personal.phone}</div>
                        </div>
                        <div>
                            <Heading >Email</Heading>
                            <div>{personal.email}</div>
                        </div>
                        <div>
                            <Heading>LinkedIn</Heading>
                            <div>{personal.linkedIn}</div>
                        </div>
                    </section>
                    {/* Education section */}
                    {!skipped.includes('Education') &&<section className={classes.educationalDetails}>
                        <Heading centered={true} style={{fontSize: '16px'}}>Education</Heading>
                        <Hr />
                        {
                            education.map((item, ind)=>{
                                return(
                                    <div key={ind} className={classes.educationalDetails}>
                                        <div>{item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}</div>
                                        <div style={{fontWeight: '900'}}>{item.course}, {item.stream}</div>
                                        <div>{item.name}</div>
                                    </div>
                                )
                            })
                        }
                    </section>}
                    {/* Skills section */}
                    {!skipped.includes('Skills') &&<section className={classes.skillsDetails}>
                        <Heading centered={true} style={{fontSize: '16px'}}>Expertise</Heading>
                        <Hr /> 
                        <ul>
                            {
                                skills.flat().map((item,ind)=>{
                                    return <li key={ind}>{item}</li>
                                })
                            }
                        </ul>                     
                    </section>}
                    {/* Languages section */}
                    {!skipped.includes('Languages') &&languages.length > 0 && <section className={classes.skillsDetails}>
                        <Heading centered={true} style={{fontSize: '16px'}}>Languages</Heading>
                        <Hr /> 
                        <ul>
                            {
                                languages.map((item,ind)=>{
                                    return <li key={ind}>{item.name}</li>
                                })
                            }
                        </ul>                     
                    </section>}
                    </div>
                </div>
                <div className={classes.gridRight}>
                    {/* Personal section */}
                    <section>
                        <Heading style={{fontSize: '22px'}}>{personal.name}&nbsp;<span style={{fontSize: '22px', fontWeight: 200}}>{personal.secondName}</span></Heading>
                        {personal.summary ?<div style={{fontSize: '10px'}}>{personal.summary}</div> : <div style={{fontSize: '10px'}}>
                           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ab omnis deserunt quae, laboriosam ad consequuntur odit adipisci inventore ut, voluptas minus autem? Maxime iste autem voluptatibus necessitatibus, adipisci minus in impedit animi dignissimos ipsam. 
                        </div>}
                        

                    </section>
                    {/* Experience section */}
                    {!skipped.includes('Experience') &&<section>
                        <Heading>Experience</Heading>
                        <Hr />
                        <ul style={{listStylePosition: 'inside'}}>
                        {
                            xp.map((item, ind)=>{
                                return(
                                    <li key={ind} style={{fontSize: '10px', marginBottom: '10px'}}>
                                        {item.start_date.split('-')[0]} - {item.end_date.includes('-') ? item.end_date.split('-')[0] : item.end_date}
                                        <div style={{marginLeft: '1.2rem'}}>
                                            <div  style={{fontSize: '10px'}}>{item.name}</div>
                                            <div style={{fontSize: '12px', fontWeight: '900'}}>{item.role}</div>  
                                            {item.accomplishments &&<OutwardList listItems={item.accomplishments} style={{color: 'gray', fontSize: '8px', listStyleType: 'none'}}/>}
                                        </div>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </section>}
                    {/* Additional section */}
                    <section>
                        {Object.values(rest).some(Boolean) && renderRest(rest) }
                    </section>
                </div>
            </div>
        </div>
    </A4sheet>
  )
})

export default ModTemplate1