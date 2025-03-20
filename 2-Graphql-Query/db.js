const users = [
  { id: 1, name: "John", email: "john@gmail" },
  { id: 2, name: "Jane", email: "jane@gmail" },
];
const reviews = [
  { id: 1, rating: 4, review: "Good", userid: 1 },
  { id: 2, rating: 5, review: "Bad", userid: 2 },
  { id: 3, rating: 5, review: "Nice", userid: 1 },
];
const products=[
  {id:1,name:"Product1",price:10 ,sellerid:1,reviewid:[1,2]},
  {id:2,name:"Product2",price:20,sellerid:2,reviewid:[3]},
  {id:3,name:"Product3",price:30,sellerid:1,reviewid:[2,3]}
]
export default { users, reviews,products };
