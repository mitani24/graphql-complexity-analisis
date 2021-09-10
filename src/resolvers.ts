import BookAPI from "./datasources/book-api";
import { Resolvers } from "./__generated__/graphql-resolver-types";

type ContextType = {
  dataSources: {
    bookAPI: BookAPI;
  };
};

const resolvers: Resolvers<ContextType> = {
  Query: {
    authors(_, __, { dataSources }) {
      return dataSources.bookAPI.getAuthors();
    },
    books(_, __, { dataSources }) {
      return dataSources.bookAPI.getBooks();
    },
  },
  Author: {
    books({ id }, _, { dataSources }) {
      return dataSources.bookAPI.getAuthorBooks(id);
    },
  },
  Book: {
    authors({ id }, _, { dataSources }) {
      return dataSources.bookAPI.getBookAuthors(id);
    },
  },
};

export default resolvers;
