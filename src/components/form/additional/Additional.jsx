import React, { useEffect, useState } from 'react'
import classes from './additional.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../../store/store'
import SelectorLabel from '../form_components/SelectorLabel'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import CheckBoxLabel from '../form_components/CheckBoxLabel'
import SelectiveAdditional from './SelectiveAdditional'
import { miscArray } from '../Form'
import NextContainer from '../NextContainer'
import Grid from '../../cv_components/grid/Grid'
import styles from '../form_components/checkbox.module.css'

function Additional(props) {
    const { log: l } = console
    const dispatch = useDispatch()
    const bio = useSelector(state=>state.bioData.data)
    const currentPage = useSelector(state=>state.bioData.currentForm)
    const { personal, education, skills, xp, certifications, ...rest } = bio
    const page = useSelector(state=>state.bioData.allSections)
    const restPages = page.slice( 5 )
    // l(restPages)
    const [ isChecked, setisChecked ] = useState({
        Certifications: false, 
        Projects: false, 
        Recognitions: false, 
        Publications: false,
        Accomplishments: false,
        Languages: false,
        Volunteering: false
    });
    const [ checkedArr, setCheckedArr ] = useState([])
    const [ proceedState, setProceedState ] = useState(restPages.length > 0)
    const [ nextAdditionalValue, setNextAdditionalValue ] = useState( false )
    function checkChangeHandler(e){
        setisChecked(prev=>{return{...prev, [e.target.id]: e.target.checked}})
    }
    useEffect(()=>{
        setCheckedArr([...Object.keys(isChecked).filter((check)=>isChecked[check])])
    }, [ isChecked ])
    useEffect(()=>{
        if(miscArray.includes( currentPage )){
            setProceedState(true) 
        }
    }, [ currentPage ])
    function preProceedState(){
        dispatch(bioActions.updatePagesArray(checkedArr))
        dispatch(bioActions.updateCurrentPage({direction: '1'}))
    }
    function submitHandler(){
        dispatch(bioActions.updateCurrentPage({direction: '1'}))
    }
    function togglePage(e){
        if(e.target.id==='previous') dispatch(bioActions.updateCurrentPage({direction: '-1'}))
        else if(proceedState && e.target.id==='next'){
            dispatch(bioActions.updateCurrentPage({direction: '1'}))
            setNextAdditionalValue(true)
        }
    }
  return (
    <div className='formSectionContainer'>
        <FlexBox direction='row' style={{justifyContent: 'space-between'}}>
            <div className="heading">Additional{proceedState && `: ${currentPage}`}</div>
            <center>
                <button className='proceedButton' onClick={preProceedState} style={{'display': proceedState ? 'none': 'block'}} disabled={!checkedArr.length> 0}>Proceed</button>
            </center>
        </FlexBox>
        { !restPages.includes(currentPage) ? 
            <FlexBox style={{ 'alignItems': 'start', marginTop: '1rem'}}>
                <CheckBoxLabel id='Certifications' labelName='Certifications' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Certifications} />
                <CheckBoxLabel id='Projects' labelName='Projects' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Projects}/>
                <CheckBoxLabel id='Recognitions' labelName='Recognitions' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Recognitions}/>
                <CheckBoxLabel id='Publications' labelName='Publications' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Publications}/>
                <CheckBoxLabel id='Accomplishments' labelName='Accomplishments' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Accomplishments}/>
                <CheckBoxLabel id='Languages' labelName='Languages' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Languages}/>
                <CheckBoxLabel id='Volunteering' labelName='Volunteering' style={{color: 'black', fontSize: '1.25rem'}} onChange={checkChangeHandler} checked={isChecked.Volunteering}/>
            </FlexBox> : <SelectiveAdditional onAdditionalValue={nextAdditionalValue} onRetreat={()=>setNextAdditionalValue(false)} restPages={ restPages } /> }

        {/* <NextContainer onClick={togglePage} back={true} next={ !proceedState ? false : true }/> */}
        {/* <center className='nextContainer'>
            <button onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '-1'}))}>Back</button>
            <button style={{'display': !proceedState ? 'none': ''}} onClick={()=>{dispatch(bioActions.updateCurrentPage({direction: '1'})); setNextAdditionalValue(true)}}>Next Section</button>
        </center> */}
    </div>
  )
}

export default Additional