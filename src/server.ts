import fs from "fs";
import path from "path";
import { ApolloServer, gql } from "apollo-server-lambda";
import resolvers from "./resolvers";
import BookAPI from "./datasources/book-api";
import constAnalysis from "graphql-cost-analysis";

const typeDefs = fs
  .readFileSync(path.join(__dirname, "../schema.graphql"))
  .toString();

const server = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers,
  dataSources() {
    return { bookAPI: new BookAPI() };
  },
  validationRules: [
    constAnalysis({
      defaultCost: 1,
      maximumCost: 10,
      onComplete(cost: number) {
        console.log(`graphql-cost-analysis: ${cost}`);
      },
    }),
  ],
});

export default server;
