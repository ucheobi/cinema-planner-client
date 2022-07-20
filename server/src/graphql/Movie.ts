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

export const MovieGenres = enumType({
    name: "MovieGenres", 
    members: [
        "ROMANCE",
        "ACTION",
        "COMEDY",
        "HORROR",
        "SciFi",
        "THRILLER",
        "CRIME",
        "DRAMA"
    ]
})

export const Movie = objectType({
    name: "Movie",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("description");
        t.nonNull.string("duration");
        t.nonNull.field("genre", { type: MovieGenres });
        t.nonNull.float("cost");
        t.nonNull.string("url");
        t.nonNull.dateTime("date");
        t.nonNull.field("availability", { type: Availability });
        t.nonNull.dateTime("time");
        t.nonNull.list.field("tickets", {
            type: "Ticket",
            resolve(parent, _args, ctx) {
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
                genre: arg({ type: 'MovieGenres', default: "ACTION"}),
                date: nonNull(stringArg()),
                url: nonNull(stringArg()),
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
                        genre: args.genre as string,
                        cost: args.cost,
                        url: args.url,
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
                genre: stringArg(),
                duration: stringArg(),
                date: stringArg(),
                url: stringArg(),
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
                            genre: args.genre || undefined,
                            cost: args.cost || undefined,
                            date: args.date || undefined,
                            url: args.url || undefined,
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