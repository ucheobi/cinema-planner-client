import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Ticket, TicketType } from "../../../types";


const initialState: Ticket = {
    email: "",
    firstName: "",
    lastName: "",
    ticketType: TicketType.SINGLE,
    active: false,
    totalCost: 0,
    owner: undefined,
    seat: undefined,
}

export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        setTicket: (state: Ticket, action: PayloadAction<Ticket>) => {
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.ticketType = action.payload.ticketType;
            state.active = action.payload.active;
            state.totalCost = action.payload.totalCost;
            state.owner = action.payload.owner;
            state.seat = action.payload.seat;
        },
    }
});


export const { setTicket } = ticketSlice.actions;

export default ticketSlice.reducer;
