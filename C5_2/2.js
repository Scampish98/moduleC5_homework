const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

const json = JSON.parse(jsonString);
let result = [];

for (let person of json.list) {
  result.push({
    name: person.name,
    age: Number(person.age),
    prof: person.prof
  });
}

console.log({list: result});