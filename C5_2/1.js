const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const listNode = xmlDOM.querySelector("list");
let result = [];

for (let student of listNode.querySelectorAll("student")) {
  first_name = student.querySelector("name > first").textContent;
  second_name = student.querySelector("name > second").textContent;

  result.push({
    name: `${first_name} ${second_name}`,
    age: Number(student.querySelector("age").textContent),
    prof: student.querySelector("prof").textContent,
    lang: student.querySelector("name").getAttribute("lang")
  })
}

console.log({list: result});