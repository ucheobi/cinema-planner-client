import { asNexusMethod } from "nexus";
import { GraphQLDuration, GraphQLDateTime } from "graphql-scalars";

export const GQLDuration = asNexusMethod(GraphQLDuration, "timeDuration");