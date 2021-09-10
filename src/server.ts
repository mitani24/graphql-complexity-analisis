import fs from "fs";
import path from "path";
import { ApolloServer, gql } from "apollo-server-lambda";
import resolvers from "./resolvers";
import BookAPI from "./datasources/book-api";
import constAnalysis from "graphql-cost-analysis";
import { createComplexityRule } from "graphql-query-complexity";

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
      maximumCost: 100,
      onComplete(cost: number) {
        console.log(`graphql-cost-analysis: ${cost}`);
      },
    }),
    createComplexityRule({
      maximumComplexity: 100,
      estimators: [
        ({ field, args, childComplexity }) => {
          if (field.type.toString().includes("Connection")) {
            const length = args.first ?? 0 + args.last ?? 0;
            if (childComplexity === 0) {
              return length;
            }
            return length * childComplexity;
          }
          return childComplexity;
        },
      ],
      onComplete(complexity) {
        console.log(`graphql-query-complexity: ${complexity}`);
      },
    }),
  ],
});

export default server;
