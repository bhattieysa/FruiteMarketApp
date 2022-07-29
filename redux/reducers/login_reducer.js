import {IS_LOGGEDIN,LOGOUT, TOKEN,USER_ID,ADDTOCART,DELETEFROMCART} from '../actions/types'

const initialState={
    isLoggedIn: false,
    token:null,
    cart:[]
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
            case USER_ID:
                return { 
                    ...state,
                    userId: action.data
                }
                case ADDTOCART:
                    return { 
                        ...state,
                        cart: action.data
        
                    }
                    case DELETEFROMCART:
                        return { 
                            ...state,
                            cart: action.data
            
                        }
            
        default:
            return state
    }
}

export default login_reducer