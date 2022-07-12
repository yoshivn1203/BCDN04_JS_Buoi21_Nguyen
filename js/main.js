getEle = (id) => {
  return document.getElementById(id);
};

let obj = [
  {
    account: '0001',
    name: 'nhan vien 1',
    email: '123@mail.com',
    startDate: '1/2/1999',
    position: 'nhan vien',
    salary: '1233121',
    quality: 'tot',
  },
  {
    account: '0002',
    name: 'nhan vien 2',
    email: '123@mail.com',
    startDate: '1/2/1999',
    position: 'nhan vien',
    salary: '1233121',
    quality: 'tot',
  },
];

let tableContent = '';
obj.map(
  (element) =>
    (tableContent += `<tr>
<td>${element.account}</td>
<td>${element.name}</td>
<td>${element.email}</td>
<td>${element.startDate}</td>
<td>${element.position}</td>
<td>${element.salary}</td>
<td>${element.quality}</td>

</tr>`)
);
var myJsonString = JSON.stringify(obj);
console.log(tableContent);

btnThemNV = () => {
  getEle('tableDanhSach').innerHTML = tableContent;
};
