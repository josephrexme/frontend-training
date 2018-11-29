const pluralize = require('pluralize');
const name = 'John Doe';

console.log(`Hello ${name}, how are you?`);
console.log(`I ate ${pluralize('apple', 1)}`);
console.log(`I ate ${pluralize('apple', 2)}`);
