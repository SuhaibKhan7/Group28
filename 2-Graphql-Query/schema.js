export const typeDefs = `#graphql
type User{
id:ID!
name:String!
email:String!
rev:[Review]
products:[Product]
}
type Review{
id:ID!
rating:Int!
review:String!
}
type Product{
    id:ID!
    name:String!
    price:Float! 
    reviews:[Review]
    seller:User
}


type Query{
users:[User]
reviews:[Review]
products:[Product]
product(id:ID):Product
}


`;
