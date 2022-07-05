import { prisma } from "@prisma/client";
import { arg, enumType, extendType, floatArg, idArg, intArg, list, nonNull, objectType, stringArg } from "nexus";


export const Availability = enumType({
    name: "Availability",
    members: [ 
        "AVAILABLE",
        "CANCELLED",
        "POSTPONED"
    ]
})

export const Movie = objectType({
    name: "Movie",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("description");
        t.nonNull.string("duration");
        t.nonNull.float("cost");
        t.nonNull.dateTime("date");
        t.nonNull.field("availability", { type: Availability });
        t.nonNull.dateTime("time");
        t.nonNull.list.field("tickets", {
            type: "Ticket",
            resolve(parent, args, ctx) {
                return ctx.prisma.movie
                    .findUnique({ where: { id: parent.id }})
                    .tickets()
            }
        })
    }
})


export const MovieQuery = extendType({
    type: "Query", 
    definition(t) {
        t.nonNull.list.nonNull.field("movies", {
            type: "Movie",
            resolve(_parent, _args, context) {
                return context.prisma.movie.findMany() 
            }
        }),
        t.nonNull.field("movie", {
            type: "Movie",
            args: {
                id: nonNull(idArg())
            },
            async resolve(_parent, args, context) {
                let movie = await context.prisma.movie.findUniqueOrThrow({
                    where: { id: parseInt(args.id)},
                })

                if (movie === null) {
                    throw new Error("The movie cannot be found!")
                }
                return movie 
            }
        })
    },
})

export const MovieMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createMovie", {
            type: "Movie",
            args: {
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                duration: nonNull(stringArg()),
                date: nonNull(stringArg()),
                time:  nonNull(stringArg()),
                availability: arg({ type: 'Availability', default: "AVAILABLE"}),
                cost: nonNull(floatArg()),
            },
            async resolve(_parent, args, context) {

                let movie = await context.prisma.movie.create({   
                    data: {
                        title: args.title,
                        description: args.description,
                        duration: args.duration,
                        cost: args.cost,
                        time: args.time as string | Date,
                        availability: args.availability as string,
                        date: args.date as string | Date
                    }
                });

                return movie ;
            }
        }),
        t.nonNull.field("updateMovie", {
            type: "Movie", 
            args: {
                id: nonNull(idArg()),
                title: stringArg(),
                description: stringArg(),
                duration: stringArg(),
                date: stringArg(),
                time:  stringArg(),
                availability: arg({ type: 'Availability'}),
                cost: floatArg(),
            },
            async resolve(_parent, args, context) {
                try {
                    
                    const updatedMovie = await context.prisma.movie.update({
                        where: { id: parseInt(args.id) },
                        data: {
                            title: args.title || undefined,
                            description: args.description || undefined,
                            duration: args.duration || undefined,
                            cost: args.cost || undefined,
                            date: args.date || undefined,
                            time: args.time || undefined,
                            availability: args.availability || undefined,
                        }
                    })
                    return updatedMovie;
                } catch(err) {
                    throw new Error(`${err}`)
                }
            }    
        }),
        t.nonNull.field("deleteMovie", {
            type: "Movie",
            args: {
                id: nonNull(idArg()),
            },
            async resolve(_parents, args, context) {
                try {
                    return context.prisma.movie.delete({
                        where: { id: parseInt(args.id)}
                    })
                } catch (error) {
                    throw Error(`${error}`);
                }
            }
        })
    },
})