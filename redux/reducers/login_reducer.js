import {IS_LOGGEDIN,LOGOUT} from '../actions/types'

const initialState={
    isLoggedIn: false
}
const login_reducer= (state = initialState, action)=>{

    switch (action.type){
        case IS_LOGGEDIN:
            return { 
                ...state,
                isLoggedIn: true

            }
        case LOGOUT:
            return { 
                ...state,
                isLoggedIn: false

            }
        default:
            return state
    }
}

export default login_reducer