import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user:{
        username:'',
        email:'',
		first_name:'',
		last_name:''
    },
	token:'',
    isLoggedIn: false
};

const UserSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		login:(state,action)=>{
			state.token = action.payload.token;
			state.user = action.payload.user;
            state.isLoggedIn = true;
		},
		logout:(state,action)=>{
			state.isLoggedIn = false;
			state.token = '';
		}
	}
});

export const {login, logout} = UserSlice.actions;
export default UserSlice.reducer;