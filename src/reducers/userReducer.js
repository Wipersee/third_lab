const initialState = {id:'',email:'',username:'', is_recruiter:'', avatar:'' ,telephone:'',
github:'',
salary_expectation:'',
work_experience_range:'',
work_experience_text:'',
work_expectation:'',
resume:'',
skills:[{name:''}]}

export const userReducer = (state=initialState, action) => {
	switch(action.type){
		case 'SET_USER':
			return {...state, id:action.payload.id,username:action.payload.username,email:action.payload.email, is_recruiter:action.payload.is_recruiter, avatar:action.payload.avatar,telephone:action.payload.telephone,
				github:action.payload.github,
				salary_expectation:action.payload.salary_expectation,
				work_experience_range:action.payload.work_experience_range,
				work_experience_text:action.payload.work_experience_text,
				work_expectation:action.payload.work_expectation,
				resume:action.payload.resume,skills:action.payload.skills}
		default:
			return state
	}
}