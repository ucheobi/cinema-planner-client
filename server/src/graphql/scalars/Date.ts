import { asNexusMethod } from "nexus";
import {  GraphQLDateTime } from "graphql-scalars";


export const GQLDateTime = asNexusMethod(GraphQLDateTime, "dateTime");
