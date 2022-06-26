import { asNexusMethod } from "nexus";
import { GraphQLDuration } from "graphql-scalars";

export const GQLDuration = asNexusMethod(GraphQLDuration, "timeDuration")