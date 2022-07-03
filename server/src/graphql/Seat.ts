import { objectType } from "nexus";

export const Seat = objectType({
    name: "Seat",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.list.int("seatNumbers");
        t.nonNull.int("totalSeat");
        t.nonNull.int("availableSeat");
        t.field("movie", {
            type: "Movie",    
        })
    },
    
})