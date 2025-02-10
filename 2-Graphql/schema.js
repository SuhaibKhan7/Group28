export const typeDefs = `#graphql
type User{
id:ID!
name:String!
email:String!
reviews:[Review]
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
