import { configureStore, createSlice } from '@reduxjs/toolkit'

const dummyPersonalData = { name: 'Name', secondName: '',  email: 'samplemail@email.com', phone: '+9112345677890', linkedIn: 'user@LinkedIn.com'}
const dummyEducationData = [
    { name: 'Institute name 1',  course: 'Course name 1', stream: 'stream 1', selector: 'GPA', grade: 9.04, start_date: 'YYYY-MM',end_date: 'YYYY-MM', accomplishments: ['Achievement 1', 'Achievement 2', 'Achievement 3'] },
    { name: 'Institute name 2', course: 'Course name 2', stream: 'stream 2', selector: 'Percentage',  grade: 80.4, start_date: 'YYYY-MM', end_date: 'YYYY-MM',accomplishments: ['Achievement 1', 'Achievement 2', 'Achievement 3'] }
]
const dummySkills = [ 'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5']
const dummyXpDetails = [
    { name: 'Company name', role: 'Job role', start_date: 'YYYY-MM', end_date: 'YYYY-MM', accomplishments: ['Achievement 1', 'Achievement 2', 'Achievement 3'] }, 
    { name: 'Company name 2', role: 'Job role', start_date: 'YYYY-MM', end_date: 'YYYY-MM', accomplishments: ['Achievement 1', 'Achievement 2', 'Achievement 3'] }
]

const formPage = ['Personal Info', 'Education', 'Skills', 'Experience', 'Additional']
let currentIndex = 0;

function updateBioData(state, action){
    const [key] = Object.keys(action.payload)
    const [value] = Object.values(action.payload)
    return {...state, data: {...state.data, [key]: [...state.data[key], value]}}
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
    state.currentForm = formPage[currentIndex] 
}

const bioData = createSlice({
    name: 'bioData',
    initialState: {data: {
        personal: [], 
        education: [], 
        skills: [], 
        xp: [], 
        additional: []
    }, currentForm: formPage[0]}, 
    reducers:{ updateBioData, updateCurrentPage }
})

const store = configureStore( { reducer: { 'bioData': bioData.reducer } } )
const bioActions = bioData.actions
// console.log(bioActions)
export default store 
export { bioActions, dummyEducationData, dummyPersonalData, dummySkills, dummyXpDetails }
