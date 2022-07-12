getEle = (id) => {
  return document.getElementById(id);
};
//   id="tknv"
//   id="name"
//   id="email"
//   id="password"
//   id="datepicker"
//   id="luongCB"
//   id="chucvu"
//   id="gioLam"

let tableContent = '';

btnThemNV = () => {
  let danhSach = [];
  let nhanVien = {
    account: getEle('tknv').value,
    name: getEle('name').value,
    email: getEle('email').value,
    startDate: getEle('datepicker').value,
    position: getEle('chucvu').value,
    salary: getEle('luongCB').value,
    quality: 'gioi',
  };
  danhSach.push(nhanVien);

  danhSach.map(
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
  console.log(tableContent);

  getEle('tableDanhSach').innerHTML = tableContent;
  nhanVien = {};
};
