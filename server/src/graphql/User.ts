import { enumType, objectType } from "nexus";

export const Role = enumType({
    name: "Role",
    members: [
        "ADMIN",
        "USER"
    ]
})

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("firstName");
        t.nonNull.string("lastName");
        t.nonNull.string("email");
        t.nonNull.field("role", { type: Role });
        t.nonNull.string("password");
        t.nonNull.list.nonNull.field("tickets", {
            type: "Ticket",
            resolve(parent, args, context) {
                return context.prisma.user
                    .findUniqueOrThrow({ where: { id: parent.id }})
                    .tickets()
            }
        })
    },
})