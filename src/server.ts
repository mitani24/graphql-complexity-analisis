import fs from "fs";
import path from "path";
import { ApolloServer, gql } from "apollo-server-lambda";
import resolvers from "./resolvers";
import BookAPI from "./datasources/book-api";
import { queryComplexityPlugin } from "./complexity/query-complexity-plugin";
import { listBasedEstimator } from "./complexity/list-based-estimator";

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
  plugins: [
    queryComplexityPlugin({
      maximumComplexity: 100,
      estimators: [listBasedEstimator],
      onComplete(complexity) {
        console.log(`graphql-query-complexity: ${complexity}`);
      },
    }),
  ],
});

export default server;
