import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    apiUser: "",
    apiToken: ""
};

const authSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setUser(state, action) {
            const {apiUser, apiToken} = action.payload;
            state.apiUser = apiUser;
            state.apiToken = apiToken;
        }
    },
});

export const { setUser } =
    authSlice.actions;

export default authSlice.reducer;
