const initialState = {
    islogedin : false,
}


export const LoginCheck = (state = initialState , action)=>{
    switch(action.type){
        case 'LOGIN_CHECK' : return{islogedin : true}
        default : return state
    }
}