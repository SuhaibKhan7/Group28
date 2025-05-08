function userData(
  name: string,
  email: string,
  age: number = 20
): string | number {
  return 1;
}
userData("abc", "abc@gmail.com");

const User = {
  name: "abc",
};

function showData(user: typeof User): typeof User {
  return { name: "dnfdf" };
}
showData(User);

//multiple dataype array
let students: (string | number)[] = [];

//array
students.push(1, "abc");
let user: string[] = [];
user.push("abc");

interface User {
  name: string;
  email: string;
  getDetails: () => string;
  address?:String
}

interface Admin extends User {
  setPermission(): string;
}


const user1:User={name:"abc",email:"abc@gmail",getDetails(){
   return "abc";
}}


const admin1:Admin={name:"admin",email:"admin@gmail.com",getDetails(){return "admin"},setPermission(){
   return "superuser";
}}