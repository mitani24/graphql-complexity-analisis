import { RESTDataSource } from "apollo-datasource-rest";

export default class BookAPI extends RESTDataSource {
  constructor() {
    super();
  }

  getAuthors() {
    return {
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor: "0",
          node: {
            id: "a:0",
            name: "佐藤 俊",
          },
        },
        {
          cursor: "1",
          node: {
            id: "a:1",
            name: "鈴木 英雄",
          },
        },
        {
          cursor: "2",
          node: {
            id: "a:2",
            name: "田中 篤志",
          },
        },
      ],
    };
  }

  getAuthorBooks(authorId: string) {
    return {
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor: "0",
          node: {
            id: "b:0",
            title: "猫でもわかる JavaScript",
          },
        },
        {
          cursor: "1",
          node: {
            id: "b:1",
            title: "GraphQL 設計ガイド",
          },
        },
        {
          cursor: "2",
          node: {
            id: "b:2",
            title: "TypeScript 詳解",
          },
        },
      ],
    };
  }

  getBooks() {
    return {
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor: "0",
          node: {
            id: "b:0",
            title: "猫でもわかる JavaScript",
          },
        },
        {
          cursor: "1",
          node: {
            id: "b:1",
            title: "GraphQL 設計ガイド",
          },
        },
        {
          cursor: "2",
          node: {
            id: "b:2",
            title: "TypeScript 詳解",
          },
        },
      ],
    };
  }

  getBookAuthors(bookId: string) {
    return {
      pageInfo: {
        hasNextPage: true,
        hasPreviousPage: false,
      },
      edges: [
        {
          cursor: "0",
          node: {
            id: "a:0",
            name: "佐藤 俊",
          },
        },
        {
          cursor: "1",
          node: {
            id: "a:1",
            name: "鈴木 英雄",
          },
        },
        {
          cursor: "2",
          node: {
            id: "a:2",
            name: "田中 篤志",
          },
        },
      ],
    };
  }
}
