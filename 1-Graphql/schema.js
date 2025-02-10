export const typeDefs = `#graphql
type User{
id:ID!
name:String!
email:String!
}
type Review{
id:ID!
rating:Int!
review:String!
}

type Query{
users:[User]
reviews:[Review]
}


`;
