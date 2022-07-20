import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


 interface User {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
 }

 const user: User = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
};

export interface UserState {
    currentUser: User | null,
    loading: boolean,
    error: boolean,
    member: boolean,
}

const initialState: UserState = {
    currentUser: user,
    loading: false,
    error: false,
    member: false,
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state: UserState, action: PayloadAction<UserState>) => {
            state.currentUser = action.payload.currentUser;
            state.loading = true;
        },
        logoutUser: (state: UserState, action: PayloadAction<UserState>) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        registerUser: (state: UserState, action: PayloadAction<UserState>) => {
            state.currentUser = action.payload.currentUser;
            state.loading = true;
            state.error = false;
            console.log(action.payload);
        },
        authFailure: (state: UserState, action: PayloadAction<UserState>) => {
            state.loading = false;
            state.error = true;
        },
        setMember: (state: UserState) => {
            state.member = !state.member;
        }
    }
});

export const { loginUser, logoutUser, registerUser, authFailure, setMember } = userSlice.actions;
export const selectUser = (state: UserState) => state;

export default userSlice.reducer;





