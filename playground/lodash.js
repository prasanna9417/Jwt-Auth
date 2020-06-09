const lodash = require('lodash')
const person ={
    name: 'mani',
    city: 'bangalore',
    age: 24,
    profession: 'developer'
}

const obj =_.pick(person, ['name', 'city'])

console.log(person)
console.log(obj)