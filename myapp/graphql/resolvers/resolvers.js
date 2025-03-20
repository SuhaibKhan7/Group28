
import { helloWord,newPost,addUser,deleteUser } from "../../controllers/graphql.js";

export const graphQLResolver = {
    Query: {
        hello: helloWord,
    },
    Mutation: {
        addPost:newPost,
        adduser:addUser,
        deluser:deleteUser
    },
};

