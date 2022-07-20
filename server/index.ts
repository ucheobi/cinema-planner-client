import { ApolloServer } from "apollo-server";
import { schema } from "./src/schema";
import * as dotenv from "dotenv";
import { context } from "./src/context"

dotenv.config()

export const server = new ApolloServer({
    schema,
    context   
});

const port = process.env.PORT || 5000;

server.listen({ port }).then(({url}: any) => {
    console.log(`Server running at port ${url}`);   
})