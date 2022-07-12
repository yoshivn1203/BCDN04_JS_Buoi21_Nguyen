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

let danhSach = [];

taoTable = (danhSach) => {
  let tableContent = '';
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
  getEle('tableDanhSach').innerHTML = tableContent;
};

window.onload = () => {
  danhSach = localStorage.getItem('danhSach')
    ? JSON.parse(localStorage.getItem('danhSach'))
    : danhSach;

  taoTable(danhSach);
};

checkEmpty = (text, id, doiTuong) => {
  if (text == '') {
    getEle(id).innerHTML = `Không thể để trống ${doiTuong}`;
    getEle(id).style.display = 'block';
    return true;
  } else {
    getEle(id).style.display = 'none';
    return false;
  }
};

btnThemNV = () => {
  let nhanVien = {
    account: getEle('tknv').value,
    name: getEle('name').value,
    email: getEle('email').value,
    startDate: getEle('datepicker').value,
    position: getEle('chucvu').value,
    salary: getEle('luongCB').value,
    quality: 'gioi',
  };
  if (
    checkEmpty(nhanVien.account, 'tbTKNV', 'tài khoản') ||
    checkEmpty(nhanVien.name, 'tbTen', 'tên') ||
    checkEmpty(nhanVien.email, 'tbEmail', 'email')
  ) {
    return;
  }

  danhSach.push(nhanVien);
  taoTable(danhSach);
  localStorage.setItem('danhSach', JSON.stringify(danhSach));
};
