import { asNexusMethod } from "nexus";
import { GraphQLTime } from "graphql-scalars";

export const GQLDateTime = asNexusMethod(GraphQLTime, "time");