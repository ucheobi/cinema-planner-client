import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TicketType } from "../../../types";


export interface SeatState {
    seatNumbers: number[],
    seatPosition: string,
    numberOfSeats: number,
    ticketType: TicketType,
    totalCost: number,
    isActive: boolean,
    isSelected: boolean,
    isReserved: boolean,
}

const initialState: SeatState = {
    seatNumbers: [],
    seatPosition: '',
    numberOfSeats: 1,
    ticketType: TicketType.SINGLE,
    totalCost: 0,
    isActive: false,
    isSelected: false,
    isReserved: false,
}

export const seatSlice = createSlice({
    name: "seat",
    initialState,
    reducers: {
        setSeatDetails: (state: SeatState, action: PayloadAction<SeatState>) => {
            const { 
                isActive, 
                isReserved, 
                isSelected, 
                numberOfSeats, 
                seatNumbers, 
                seatPosition, 
                ticketType,
                totalCost
            } = action.payload;

            state = {
                isActive,
                isReserved,
                isSelected,
                numberOfSeats,
                seatNumbers,
                seatPosition,
                ticketType,
                totalCost
            }

        },
    }
});


export const { setSeatDetails } = seatSlice.actions;


export default seatSlice.reducer;
