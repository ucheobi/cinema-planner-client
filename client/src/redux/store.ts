import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/movie/modalSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        user: userReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
