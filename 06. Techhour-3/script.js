// check if stock exists
//     --> check warehouse
//         --> deduct stock amount

const { words } = require("lodash");

// //some check code
// if(err){throw err;}

// return (warehouseID) => {
//     //some check code
//     if(err){throw err;}
//     return(stockDeduct) => {
//         //some check code
//         if(err){throw err;}
//         return stockID;
//             + ' from ' + warehouseID
//             + ' is reduced by stockDeduct ' + stockDeduct;
//     }
// }

// let orderItem20 = checkStock('TT619')('NORTH')(3);

//! Normal Function
// function add(a, b, c) {
//   return a + b + c;
// }

// var p = add(1, 2, 3, 4); // --> 6;
// console.log(p);

// //? add(1,2,3) --> 6
// //? add(1,2) --> NaN
// //? add(1,2,3,4) --> 6
// //* Extra parameters are ignored.

//! Basic function
// function multiply(a, b, c) {
//   return a * b * c;
// }

// function multiply_curried(a) {
//   return function (b) {
//     return function (c) {
//       return a * b * c;
//     };
//   };
// }

// let res = multiply(1,2,3);
// console.log(res);

// let mc1 = multiply_curried(1);
// let mc2 = mc1(2);
// let res2 = mc2(3);
// console.log(res2);

// let res3 = multiply_curried(1)(2)(3);
// console.log(res3);

//! basic funcion 2
// let multiply = (a,b,c) => {
//   return a*b*c;
// }

// let multiply_curried = (a) => (b) => (c) => {
//   return a*b*c;
// }

// let res = multiply(1,2,3);
// console.log(res);

// let res2 = multiply_curried(1)(2)(3);
// console.log(res2);

//! Uncurry a function
// let multiply_curried = (a) => (b) => (c) => {
//   return a * b * c;
// };

// let multiply = (a, b, c) => multiply_curried(a)(b)(c);

// let res = multiply(2,3,4);
// console.log(res);

//! generic functions
// let hasNChars =
//   (n = 3) =>
//   (word) =>
//     word.length === n;

// let words = ["forest", "apple", "bananna", "orange", "grace", "table", "lamp"];

// let res = words.some(hasNChars(2), words);
// console.log(res);

// let res2 = words.some(hasNChars, words);
// console.log(res2);

//! specialised functions
// let greet  = (message) => (name) => {
//   return `${message} ${name}!`;
// }

// let helloGreet = greet('hello');

// console.log(greet('Good day')('Anshul'));
// console.log(helloGreet('Ankit'));

//! lodlash
// const _ = require("lodash");

// function multiply(a, b, c) {
//   return a * b * c;
// }

// let curried = _.curry(multiply);

// let ret = curried(2)(3)(4);
// console.log(ret);

//! Autocurrying : Ramda
// const R = require('ramda');

// let fn1 = R.add(5);
// let res = fn1(6);
// console.log(res);

// let fn2 = R.divide(100);
// let res2 = fn2(20);
// console.log(res2);

