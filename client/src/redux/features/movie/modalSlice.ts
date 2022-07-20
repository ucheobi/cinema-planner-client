import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
    show: boolean;
    details: boolean;
    movieId: number;
}

const initialState: ModalState = {
    show: false,
    details: false,
    movieId: 0
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showModal: (state: ModalState, action: PayloadAction<boolean>) => {
            state.show = action.payload;
        },
        showDetails: (state: ModalState, action: PayloadAction<boolean>) => {
            state.details = action.payload;            
        },
        setMovieId: (state: ModalState, action: PayloadAction<number>) => {
            state.movieId = action.payload;
        } 
    }
});


export const { showModal, showDetails, setMovieId } = modalSlice.actions;
export const selectModal = (state: ModalState) => state.show;

export default modalSlice.reducer;
