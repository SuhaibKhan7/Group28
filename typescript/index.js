"use strict";
function userData(name, email, age = 20) {
    return 1;
}
userData("abc", "abc@gmail.com");
const User = {
    name: "abc",
};
function showData(user) {
    return { name: "dnfdf" };
}
showData(User);
//multiple dataype array
let students = [];
//array
students.push(1, "abc");
let user = [];
user.push("abc");
const user1 = { name: "abc", email: "abc@gmail", getDetails() {
        return "abc";
    } };
const admin1 = { name: "admin", email: "admin@gmail.com", getDetails() { return "admin"; }, setPermission() {
        return "superuser";
    } };
