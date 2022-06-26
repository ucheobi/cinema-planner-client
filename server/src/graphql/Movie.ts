import { extendType, floatArg, idArg, nonNull, objectType, stringArg } from "nexus";


export const Movie = objectType({
    name: "Movie",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.string("description");
        t.nonNull.string("timeDuration");
        t.nonNull.float("cost");
    },
})

export const MovieQuery = extendType({
    type: "Query", 
    definition(t) {
        t.nonNull.list.nonNull.field("movies", {
            type: "Movie",
            resolve(_parent, _args, context) {
                return context.prisma.movie.findMany();
            }
        }),
        t.nonNull.field("singleMovie", {
            type: "Movie",
            args: {
                id: nonNull(idArg())
            },
            async resolve(_parent, args, context) {
                const singleMovie = await context.prisma.movie.findUnique({
                    where: { id: parseInt(args.id)}
                })

                if (singleMovie === null) {
                    throw new Error("The movie cannot be found!")
                }

                return singleMovie;
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
                timeDuration: nonNull(stringArg()),
                cost: nonNull(floatArg())
            },
            resolve(_parent, args, context) {
                const { title, description, timeDuration, cost } = args;

                const newMovie = context.prisma.movie.create({   
                    data: {
                        title,
                        description,
                        timeDuration,
                        cost
                    }
                });

                return newMovie;
            }
        }),
        t.nonNull.field("updateMovie", {
            type: "Movie", 
            args: {
                id: nonNull(idArg()),
                title: stringArg(),
                description: stringArg(),
                timeDuration: stringArg(),
                cost: floatArg(),
            },
            async resolve(_parent, args, context) {
                try {
                    const updatedMovie = context.prisma.movie.update({
                        where: { id: parseInt(args.id) },
                        data: {
                            title: args.title || undefined,
                            description: args.description || undefined,
                            timeDuration: args.timeDuration || undefined,
                            cost: args.cost || undefined
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