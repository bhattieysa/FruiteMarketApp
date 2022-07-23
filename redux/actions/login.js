import { IS_LOGGEDIN,LOGOUT,TOKEN,USER_ID,ADDTOCART,DELETEFROMCART } from "./types";

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
  
})
export const userId=(userId)=>(
    {
        type: USER_ID,
        data:userId
    })
    export const cart=(cart)=>(

        
        {
            
            type: ADDTOCART,
            data:cart
        }
        
        
        
        )
        export const deleteCart=(deletecart)=>(
            {
                type: DELETEFROMCART,
                data:deletecart
            }
            
            
            
            )
