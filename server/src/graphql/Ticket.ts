import { arg, booleanArg, enumType, extendType, floatArg, idArg, intArg, list, nonNull, objectType, stringArg } from "nexus";

export const TicketType = enumType({
    name: "TicketType",
    members: [
        "SINGLE",
        "COUPLES",
        "FAMILY"
    ]
})

export const Ticket = objectType({
    name: "Ticket",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("firstName");
        t.nonNull.string("lastName");
        t.nonNull.string("email");
        t.nonNull.field("ticketType", { type: Ticket });
        t.nonNull.boolean("active");
        t.nonNull.dateTime("createdAt");
        t.nonNull.float("totalCost");
        t.nonNull.field("movieId", {
            type: "Movie",
            args: {
                movieId: nonNull(intArg())
            },
            //@ts-ignore
            resolve(_parent, args, context) {
                 return context.prisma.movie
                    .findUnique({ where: { id: args.movieId }})
            } 
        });
        t.field("seat", {
            type: "Seat",
            //@ts-ignore
            resolve(parent, _args, context) {
                return context.prisma.ticket
                    .findUnique({
                        where: { id: parent.id }
                    })
                    .seat()
            }
        })
    },
})


export const TicketQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("tickets", {
            type: "Ticket",
            //@ts-ignore
            resolve(_parent, _args, context) {
                return context.prisma.ticket.findMany()
            }
        }),
        t.nonNull.field("ticket", {
            type: "Ticket", 
            args: {
                id: nonNull(intArg())
            },
            //@ts-ignore
            async resolve(_parent, args, context) {
                let ticket = await context.prisma.ticket.findUniqueOrThrow({
                    where: { id: args.id }
                });                  

                if (ticket === null ) {
                    throw new Error("This ticket is not found or does not exist")
                }

                return ticket;
            }
        })
    },
})


export const TicketMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("bookTicket", {
            type: "Ticket",
            args: {
                email: nonNull(stringArg()),
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                ticketType: arg({ type : "TicketType", default: "SINGLE"}),
                active: nonNull(booleanArg()),
                createdAt: nonNull(stringArg()),
                totalCost: nonNull(floatArg()),
                movieId: nonNull(intArg()),
                seatPosition: arg({ type: "SeatType", default: "NORMAL"}),
                seatNumber: nonNull(intArg()), 
            },
            async resolve(_parent, args, context) {
                try {    
                    let ticket = await context.prisma.ticket.create({
                        data: {
                            email: args.email,
                            firstName: args.firstName,
                            lastName: args.lastName,
                            ticketType: args.ticketType as string,
                            active: args.active,
                            createdAt: args.createdAt as Date | string,
                            totalCost: args.totalCost,                 
                            movie: {
                                connect: {id: args.movieId },
                            }, 
                            seat: {
                                create: {
                                    seatNumber: args.seatNumber,
                                    seatPosition: args.seatPosition as string,                                   
                                }
                            }
                        },
                        
                    })                    
                
                    return ticket;
                } catch (error) {
                    throw new Error(`${error}`)
                }                
            }
        }), 
        t.nonNull.field("updateTicket", {
            type: "Ticket",
            args: {
                id: nonNull(idArg()),
                email: stringArg(),
                firstName: stringArg(),
                lastName: stringArg(),
                ticketType: arg({ type: 'TicketType', default: "SINGLE"}),
                active: booleanArg(),
                createdAt: stringArg(),
                totalCost: floatArg(),
                movieId: idArg()
            }, 
            async resolve(_parent, args, context) {
                try {
                    const updatedTicket = await context.prisma.ticket.update({
                        where: { id: parseInt(args.id)},
                        data: {
                            email: args.email || undefined,
                            firstName: args.firstName || undefined,
                            lastName: args.lastName || undefined,
                            ticketType: args.ticketType || undefined,
                            active: args.active || undefined,
                            totalCost: args.totalCost || undefined
                        }
                    })
                    return updatedTicket;
                } catch (err) {
                    throw new Error(`${err}`)
                }
            }
        }),
        t.nonNull.field("deleteTicket", {
            type: "Ticket",
            args: {
                id: nonNull(idArg())
            },
            async resolve(_parent, args, context) {
                try {
                    return context.prisma.ticket.delete({
                        where: { id: parseInt(args.id)}
                    })
                } catch (error) {
                    throw new Error(`${error}`)
                }
            }
        })
    },
})

