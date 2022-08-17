import { TicketType } from "../../types";


const VIP_SEAT: Array<number> = [17, 18, 24, 25, 31, 38, 45, 52, 59, 66, 67, 73, 74, 80, 87]

export enum SeatCost {
    VIP_SEAT_COST = 14.50,
    NORMAL_TICKET_COST = 10.00, //single individual
    COUPLE_TICKET_COST = 8.40, // 2 members
    FAMILY_TICKET_COST = 6.50 // Family must be at least 3 members
}

export const checkSeatCost = (
    seatNumber: number, 
    numberOfSeats: number = 1,
    typeOfTicket: TicketType): number => {

    let totalCost = 0;
    let VIP = VIP_SEAT.includes(seatNumber)

    if (VIP) {
        totalCost = numberOfSeats * SeatCost.VIP_SEAT_COST;
    } else {
        switch (typeOfTicket.toUpperCase()) {
            case "SINGLE":
                totalCost = numberOfSeats * SeatCost.NORMAL_TICKET_COST;
                break;
            case "FAMILY":
                totalCost = numberOfSeats * SeatCost.FAMILY_TICKET_COST;
                break;
            case "COUPLE":
                numberOfSeats = numberOfSeats * 2;
                totalCost = numberOfSeats * SeatCost.COUPLE_TICKET_COST;
                break;
        }
    }
    
    return totalCost;
}

    //get ticket cost
export const getTicketCost = (ticketType: TicketType): number => {
    let ticketCost = 0;
    switch (ticketType) {
        case TicketType.SINGLE:
            ticketCost = SeatCost.NORMAL_TICKET_COST;
            break;
        case TicketType.COUPLE:
            ticketCost = SeatCost.COUPLE_TICKET_COST;
            break;
        case TicketType.FAMILY:
            ticketCost = SeatCost.FAMILY_TICKET_COST;
            break;
        default:
            ticketCost = SeatCost.VIP_SEAT_COST;
    }
    return ticketCost;
}



