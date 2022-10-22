import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user", 
	initialState: {
		username: null,
		userId: null,
		token: null,
	}, 
	reducers: {
		setUsername(state, action) {
			state.username = action.payload.username;
		},
		setUserId(state, action) {
			state.userId = action.payload.userId;
		},
		setUserToken(state, action) {
			state.token = action.payload.token;
		}
	}
}); 

export const { setUsername, setUserId, setUserToken } = userSlice.actions;
export default userSlice.reducer;

// Selectors 
export const selectUsername = (state) => state.user.username; 
export const selectUserId = (state) => state.user.userId;
export const selectUserToken = (state) => state.user.token;