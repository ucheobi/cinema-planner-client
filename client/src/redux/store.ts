import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/movie/modalSlice";
import seatReducer from "./features/seat/seatSlice";
import userReducer from "./features/user/userSlice";
import ticketReducer from "./features/ticket/ticketSlice";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        user: userReducer,
        seat: seatReducer,
        ticket: ticketReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;
