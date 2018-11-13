// (function(){
//   console.log("This works");
// }())
// Function Declaration
function hello() {
  console.log("Hello everyone");
}
hello();

// Named Function Expression
var howdy = function() {
  console.log("Howdy everyone");
};
howdy();

// Anonymous Function Expression
// Function runs after 1 second
setTimeout(function() {
  console.log("Hey there");
}, 1000);

// IIFE
// (new Date()).getFullYear()
(function(){
  console.log("IIFE 1")
})();
(function(){
  console.log("IIFE 2")
}());
