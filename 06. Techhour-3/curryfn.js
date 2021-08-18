const _ = require("lodash");

function multiply(a, b, c) {
  return a * b * c;
}

let curried = _.curry(multiply);

let ret = curried(2)(3)(4);
console.log(ret);

//! basic
function multiply(a, b, c) {

  return a * b * c;
}

function multiply_curried(a) {

  return function (b) {
      return function (c)  {
          return a * b * c
      }
  }
}

let res = multiply(1, 2, 3);
console.log(res);

let mc1 = multiply_curried(1);
let mc2 = mc1(2);
let res2 = mc2(3);
console.log(res2);

let res3 = multiply_curried(1)(2)(3);
console.log(res3);

//! basic 2
let multiply = (a, b, c) => {
  return a * b * c;
}

let multiply_curried = (a) => (b) => (c) => {

  return a * b * c;
}


let res = multiply(1, 2, 3);
console.log(res);

let res2 = multiply_curried(1)(2)(3);
console.log(res2);

//! uncurry
let multiply_curried = (a) => (b) => (c) => {

  return a * b * c;
}


let multiply = (a, b, c) => multiply_curried(a)(b)(c);


let res = multiply(2,3,4);
console.log(res);

let res2 = multiply_curried(2)(3)(4);
console.log(res2);

//! generic function
let hasNChars = (n=3) => (word) => word.length === n;

let words = ['forest', 'gum', 'pencil', 'wonderful', 'grace',
    'table', 'lamp', 'biblical', 'midnight', 'or', 'perseverance', 
    'adminition', 'redemption', 'dog', 'no'];


let res = words.some(hasNChars(2), words);
console.log(res);

let res2 = words.some(hasNChars, words);
console.log(res2);

//! specialised function
let greet = (message) => (name) => {

  return `${message} ${name}!`;
}

let helloGreet = greet('Hello'); 

console.log(greet('Good day')('Lucia'));
console.log(helloGreet('Peter'));


//! function composing 
let double = x => x * 2
let triple = x => x * 3
let quadruple = x => x * 4

let pipe = (...funs) => input => funs.reduce(
    (total, fn) => fn(total),
    input
)

let fun1 = pipe(double)
let fun2 = pipe(double, triple)
let fun3 = pipe(triple, triple)
let fun4 = pipe(double, triple, quadruple)

console.log(fun1(2)) 
console.log(fun2(5)) 
console.log(fun3(7)) 
console.log(fun4(9)) 

//! loadlash curry
const _ = require("lodash");

function multiply(a, b, c) {

    return a * b * c;
}

let curried = _.curry(multiply);

let ret = curried(2)(3)(4);
console.log(ret);

//! ramba autocarrying
const R = require('ramda');

let fn1 = R.add(5);
let res = fn1(6);
console.log(res);

let fn2 = R.divide(100);
let res2 = fn2(20);
console.log(res2);

//! custom currying
function multiply(a, b, c) {

  return a * b * c;
}

function curry(func) {

return function curried(...args) {

  console.log(args);

  if (args.length >= func.length) {

    return func.apply(this, args);
  } else {

    console.log('calling else');

    return function(...args2) {
      
      return curried.apply(this, args.concat(args2));
    }
  }
};
}

let curried = curry(multiply);

console.log(curried(1, 2, 3));  
console.log(curried(1)(2, 3));   
console.log(curried(1)(2)(3));  
