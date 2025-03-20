import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./db.js";

const resolvers = {
  Query: {
    users() {
      return db.users;
    },
    reviews() {
      return db.reviews;
    },
    products() {
      return db.products;
    },
    product(_, { id }) {
      return db.products[id - 1];
    },
  },

  // User: {
  //   rev(parent) {
  //     return db.reviews.filter((review) => review.userid === parent.id);
  //   },
  // },
  Product: {
    seller(parent) {
      return db.users.find((user) => user.id === parent.sellerid);
    },

    reviews(parent) {
      return db.reviews.filter((review) => parent.reviewid.includes(review.id));
    },
  },

  User: {
    products(parent) {
      return db.products.filter((product) => product.sellerid === parent.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`🚀  Server ready at: ${url}`);
