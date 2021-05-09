const initialState = {login:false}

export const loginReducer = (state=initialState, action) => {
	switch(action.type){
		case 'SET_LOGIN':
			return {...state, login:action.payload}
		default:
			return state
	}
}