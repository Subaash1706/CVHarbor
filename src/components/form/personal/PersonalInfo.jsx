import React, { useEffect, useState } from 'react'
import classes from './personal.module.css'
import FlexBox from '../../cv_components/flexbox/FlexBox'
import LabelInput from '../form_components/LabelInput'
import { useDispatch, useSelector } from 'react-redux'
import { bioActions } from '../../store/store'
import ExistingData from '../existing_data/ExistingData'
import avatar_placeholder from '../../../assets/images/sample/avatar_placeholder.jpg'
import saveSvg from '../../../assets/svg/save_FILL1_wght400_GRAD0_opsz24.svg'
import arrow from '../../../assets/svg/arrow_right_alt_FILL0_wght400_GRAD0_opsz24.svg'
import NextContainer from '../NextContainer'

function PersonalInfo() {
    const dispatch = useDispatch()
    const [ personalInfo, setPersonalInfo ] = useState({name: '', secondName: '', email: '', phone: '', linkedIn: ''})
    const [ editableValue, setEditableValue ] = useState({name: '', secondName: '', email: '', phone: '', linkedIn: ''})
    const personalInfoFromStore = useSelector(state=>state.bioData.data.personal)
    const currentTemplateInfo = useSelector(state=>state.bioData.selectedTemplate)
    const templateDetails = `${currentTemplateInfo.category}${currentTemplateInfo.templateNumber}`
    const [ validity, setValidity ] = useState(false)
    const [ saved , setSaved ] = useState(false)
    useEffect(()=>{
        if(personalInfoFromStore.length > 0) setSaved(true)
    }, [ personalInfoFromStore ])
    function valueChangeHandler(e){
        setPersonalInfo(prev=>{return{...prev, [e.target.name]: e.target.value}})
        setValidity(Object.values(personalInfo).every(Boolean))
        if(personalInfo.email && personalInfo.phone){
            setPersonalInfo(prev => {return{...prev, [ 'id' ] : `${prev.email.slice(0, 5)}_${prev.phone.slice(0, 8)}`}} )
        }
    }
    function submitHandler(e){
        e.preventDefault()
        if(!Object.values(personalInfoFromStore).every(Boolean))dispatch(bioActions.updateBioData({ personal: personalInfo }))
        else{
            const existing = personalInfoFromStore.findIndex(item=>item.id === editableValue.id)
            // console.log(existing, editableValue)
            const dupe = [...personalInfoFromStore]
            dupe.splice(existing, 1, personalInfo)
            dispatch(bioActions.replaceBioData({personal: dupe}))
            setEditableValue({name: '', secondName: '', email: '', phone: '', linkedIn: ''})
        }
        if(validity){ setSaved(true)}
    }
    function storedActionHandler(e, id){
        const existing = personalInfoFromStore.findIndex(item=>item.id === id)
        const dupe = [...personalInfoFromStore]
        if(e.target.id === 'edit') {
            const editable = dupe[existing]
            const { name, secondName, email, phone, linkedIn } = editable
            setEditableValue({name, secondName, email, phone, linkedIn})
            setPersonalInfo(editable)
        }
        else if(e.target.id === 'delete'){
            dupe.slice(existing, 1)
        } 
        dispatch(bioActions.replaceBioData( {personal: dupe} ))
    }
    const fileInput = document.querySelector('.avatar');
    const avatarSpace = document.querySelector('.avatarSpace')
    function fileSelectorFunction(e){
        fileInput.click();
    }
    function fileChangeHandler(e){
        const image = fileInput.files[0];
        const fr = new FileReader
        fr.onloadend = ()=>{
            const res = fr.result
            avatarSpace.style.backgroundImage = `url(${res})`;
            avatarSpace.style.backgroundSize = 'cover';
            setPersonalInfo(prev=>{return{...prev, ['avatar']: res}})
        }
        fr.readAsDataURL(image);
    }
    // console.log(personalInfo)
  return (
    <div className='formSectionContainer'>
        { saved && <ExistingData target={ 'personal' } disableAddMore = {true} onClick={ storedActionHandler }/>}
        { (!saved || Object.values(editableValue).every(Boolean)) 
            && <>
            <FlexBox style={{justifyContent: 'space-between'}} direction='row'>
                <div className='heading'>
                    Personal
                </div> 
                <center>
                    <button className='proceedButton' onClick={submitHandler} disabled={!validity}>
                        Save
                        {/* <img src={saveSvg} /> */}
                    </button>
                </center>
            </FlexBox>
            {(templateDetails === 'mod1' || templateDetails === 'mod2') && <div className={`${classes.avatarSpace} avatarSpace`} onClick={fileSelectorFunction}>
                <input type="file" accept='images/*' className={`${classes.avatar} avatar`} style={{visibility:'hidden'}} onChange={fileChangeHandler} name = 'avatar'/>
            </div>}

            <FlexBox style={{alignItems: 'start'}} >
                <FlexBox direction='row' width='100'>
                    <LabelInput id='firstName' labelName='First Name' placeholder='First name' name='name' onChange={ valueChangeHandler } value={ personalInfo.name }/>
                    <LabelInput id='lastName' labelName='Last Name' placeholder='Last name' name='secondName' onChange={ valueChangeHandler } value={ personalInfo.secondName }/>
                </FlexBox>
                <FlexBox direction='row' width='100'>
                    <LabelInput id='email' labelName='Email' placeholder='Email' name='email' onChange={ valueChangeHandler } value={ personalInfo.email }/>
                    <LabelInput id='phone' labelName='Phone' placeholder='Phone' name='phone' onChange={ valueChangeHandler } value={ personalInfo.phone }/>
                </FlexBox>
                <FlexBox direction='row' width='100'>
                    <LabelInput id='linkedIn' labelName='LinkedIn link' placeholder='LinkedIn' name='linkedIn' onChange={ valueChangeHandler } value={ personalInfo.linkedIn }/>
                </FlexBox>
                {
                    (templateDetails === 'har3' || templateDetails === 'mit5' || templateDetails === 'mod1' || templateDetails === 'mod2' ) &&
                    <FlexBox direction='row' width='100'>
                        <LabelInput id='summary' labelName='Personal summary' placeholder='Personal summary (Recommended)' name='summary' onChange={valueChangeHandler} value={personalInfo.summary}/>
                    </FlexBox>
                }
            </FlexBox>
        {/* <center>
            <button className={classes.proceed} onClick={submitHandler} disabled={!validity}>Save</button>
        </center> */}
        </>}
        {/* <NextContainer next={true} onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '1'}))}/> */}
        {/* <center className='nextContainer'>
            <button className='nextSection' onClick={()=>dispatch(bioActions.updateCurrentPage({direction: '1'}))}>Next Section</button>
        </center> */}
    </div>
    )
}

export default PersonalInfo