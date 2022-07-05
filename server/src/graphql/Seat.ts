import { enumType, objectType } from "nexus";


export const SeatType = enumType({
    name: "SeatType",
    members: [
        "NORMAL",
        "VIP",
        "VVIP"
    ]
})

export const Seat = objectType({
    name: "Seat",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.int("seatNumber");
        t.nonNull.field("seatPosition", { type: SeatType });
        t.field("ticket", {
            type: "Ticket",    
        })
    },  
})