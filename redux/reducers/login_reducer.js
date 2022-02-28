import {IS_LOGGEDIN,LOGOUT, TOKEN} from '../actions/types'

const initialState={
    isLoggedIn: false,
    token:null
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
        case TOKEN:
            return { 
                ...state,
                token: action.data

            }
        default:
            return state
    }
}

export default login_reducer