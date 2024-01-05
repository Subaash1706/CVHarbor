import { configureStore, createSlice, current } from '@reduxjs/toolkit'

const dummyPersonalData = { name: 'Name', secondName: 'Second name',  email: 'samplemail@email.com', phone: '+9112345677890', linkedIn: 'user@LinkedIn.com'}
const dummyEducationData = [
    { name: 'Institute name 1',  course: 'Course name 1', stream: 'stream 1', selector: 'GPA', grade: 9.04, start_date: 'YYYY-MM',end_date: 'YYYY-MM', accomplishments: ['Achievement 1', 'Achievement 2', 'Achievement 3'] },
    { name: 'Institute name 2', course: 'Course name 2', stream: 'stream 2', selector: 'Percentage',  grade: 80.4, start_date: 'YYYY-MM', end_date: 'YYYY-MM',accomplishments: 'Achievement 1\n Achievement 2\n Achievement 3' }
]
const dummySkills = [ 'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']
const dummyXpDetails = [
    { name: 'Company name', role: 'Job role', start_date: 'YYYY-MM', end_date: 'YYYY-MM', accomplishments: 'Achievement 1\n Achievement 2\n Achievement 3' }, 
    { name: 'Company name 2', role: 'Job role', start_date: 'YYYY-MM', end_date: 'YYYY-MM', accomplishments: 'Achievement 1\n Achievement 2\n Achievement 3' }
]

const formPage = ['Personal Info', 'Education', 'Skills', 'Experience', 'Additional']
let currentIndex = 0;

function updateBioData(state, action){
    const [key] = Object.keys(action.payload)
    const [value] = Object.values(action.payload)
    return {...state, data: {...state.data, [key]: [...state.data[key], value]}}
}
function replaceBioData(state, action){
    const [ target ] = Object.keys(action.payload)
    state.data[target] = action.payload[target]
    // return { ...state, data: { ...state.data, [target]: [action.payload]}}
    // console.log(state.data[target])
}
function updateCurrentPage(state, action){
    const { direction, target } = action.payload;
    if(direction){
        if(direction === '1') currentIndex += 1
        else if(direction === '-1') currentIndex-=1
    }
    else{
        currentIndex = +target;
    }
    state.currentForm = state.allSections[currentIndex] 
}
function updatePagesArray(state, action){
    state.allSections.push(...action.payload)
}
function updateSkippedSections(state, action){
    const existing = state.skippedSections.find(item=>item===action.payload)
    if(!existing) state.skippedSections.push(action.payload)
    else return
}
function setCurrentTemplate(state, action){
    if(action.payload.chosenTemplate) state.selectedTemplate.category = action.payload.chosenTemplate
    else state.selectedTemplate.templateNumber = action.payload.templateNumber
}
function setPagePreviewStatus(state, action){
    state.pagePreviewStatus = action.payload
}
const bioData = createSlice({
    name: 'bioData',
    initialState: {
        data: {
        personal: [], 
        education: [], 
        skills: [], 
        xp: [], 
        additional: [], 
        certifications: [],
        projects: [], 
        recognitions: [],
        publications: [], 
        accomplishments: [],
        languages: [],
        volunteering: []
    }, 
    allSections: formPage,
    currentForm: formPage[0], 
    skippedSections: [], 
    pagePreviewStatus: false,
    selectedTemplate: { category: 'har', templateNumber: ''}
}, 
    reducers:{ updateBioData, updateCurrentPage, updatePagesArray, replaceBioData, updateSkippedSections, setCurrentTemplate, setPagePreviewStatus }
})

const store = configureStore( { reducer: { 'bioData': bioData.reducer } } )
const bioActions = bioData.actions
export default store 
export { bioActions, dummyEducationData, dummyPersonalData, dummySkills, dummyXpDetails }
