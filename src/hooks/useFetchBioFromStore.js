import React from 'react'
import { useSelector } from 'react-redux'
import { bioActions } from '../components/store/store'
import { dummyEducationData, dummyPersonalData, dummySkills, dummyXpDetails } from '../components/store/store'

const useFetchBioFromStore = () => {
    const dummyCertificationsArray = [ { name: 'Certification 1', date: 'YYYY/MM', accomplishments: ['acc1', 'acc2', 'acc3'] }, { name: 'Certification 2', date: 'YYYY/MM', accomplishments: ['acc1', 'acc2', 'acc3']}]

    const bioDataArrayFromStore = useSelector(state=>state.bioData.data)
    const personal = bioDataArrayFromStore.personal.length > 0 ? bioDataArrayFromStore.personal[0] : dummyPersonalData
    const education = bioDataArrayFromStore.education.length > 0 ? bioDataArrayFromStore.education : dummyEducationData
    const skills = bioDataArrayFromStore.skills.length > 0 ? bioDataArrayFromStore.skills : dummySkills
    const xp = bioDataArrayFromStore.xp.length > 0 ? bioDataArrayFromStore.xp : dummyXpDetails
    const certifications = bioDataArrayFromStore.certifications.length > 0 ? bioDataArrayFromStore.certifications : dummyCertificationsArray;
    const projects = bioDataArrayFromStore.projects 
    const recognitions =  bioDataArrayFromStore.recognitions
    const accomplishments = bioDataArrayFromStore.accomplishments
    const languages = bioDataArrayFromStore.languages 
    const volunteering =  bioDataArrayFromStore.volunteering 
    // const publications =  bioDataArrayFromStore.publications
    const publications = bioDataArrayFromStore.publications

  return { personal, education, skills, xp, certifications, projects, recognitions, publications, accomplishments, languages, volunteering }
}

export default useFetchBioFromStore