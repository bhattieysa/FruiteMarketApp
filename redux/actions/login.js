import { IS_LOGGEDIN,LOGOUT,TOKEN } from "./types";

export const isLoggedin=()=>(
{
    type: IS_LOGGEDIN,
  
}


)
export const logout=()=>(
    {
        type: LOGOUT,
      
    }
    
    
    )
  

export const token=(token)=>(
{
    type: TOKEN,
    data:token
  
}


)
