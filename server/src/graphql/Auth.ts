import { arg, extendType, nonNull, objectType, stringArg } from "nexus";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export const AuthPayload = objectType({
    name: "AuthPayload",
    definition(t) {
        t.nonNull.string("token");
        t.nonNull.field("user", {
            type: "User"
        })
    },
})

export const AuthMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("signup", {
            type: "AuthPayload",
            args: { 
                firstName: nonNull(stringArg()),
                lastName: nonNull(stringArg()),
                email: nonNull(stringArg()),
                role: arg({ type: 'Role', default: 'USER'}),
                password: nonNull(stringArg()),
            },
            async resolve(_parent, args, context) {
                const { email, firstName, lastName } = args;

                const password = await bcrypt.hash(args.password, 10);

                const user = await context.prisma.user.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        role: args.role as string,
                        password
                    }
                });

                const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as jwt.Secret);

                return {
                    token,
                    user
                }
            }
        }),
        t.nonNull.field("login", {
            type: "AuthPayload", 
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(_parent, args, context) {
                const user = await context.prisma.user.findUniqueOrThrow({
                    where: { email: args.email }
                })

                if(!user) {
                    throw new Error("No user user found");
                }

                const valid = await bcrypt.compare(args.password, user.password);

                if(!valid) {
                    throw new Error("Invalid User");
                }

                const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET as jwt.Secret);

                return {
                    token,
                    user
                }
            }
        })
    },
})