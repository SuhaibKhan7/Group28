
export const graphQLSchema = `#graphql

type Query {
    hello: String

}
 type User{
    id: ID!
    name: String!
    email: String!
 }


type Mutation {
    addPost(title: String!, content: String!): Post
    adduser(newuser:userInput):User
    deluser(deluser:String):String!
}
input userInput{
    name:String!
    email:String!
    password:String!
}

type Post {
    title: String
    content: String
}
`;
    