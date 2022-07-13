getEle = (id) => {
  return document.getElementById(id);
};

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
          <td><button class="btn btn-danger" onclick ="deleteNv('${element.account}')">
          Xóa
        </button></td>
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

checkAccountExist = (account) => {
  for (let i = 0; i < danhSach.length; i++) {
    if (danhSach[i].account == account) {
      getEle('tbTKNV').innerHTML = 'Tài khoản đã tồn tại';
      getEle('tbTKNV').style.display = 'block';
      return true;
    }
  }
  getEle('tbTKNV').style.display = 'none';
  return false;
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
  a = checkEmpty(nhanVien.account, 'tbTKNV', 'tài khoản');
  b = checkEmpty(nhanVien.name, 'tbTen', 'tên');
  c = checkEmpty(nhanVien.email, 'tbEmail', 'email');
  d = checkEmpty(getEle('password').value, 'tbMatKhau', 'mật khẩu');
  e = checkEmpty(nhanVien.startDate, 'tbNgay', 'ngày làm');
  f = checkEmpty(nhanVien.salary, 'tbLuongCB', 'lương cơ bản');
  g = checkEmpty(getEle('gioLam').value, 'tbGiolam', 'giờ làm');
  h = checkAccountExist(nhanVien.account);

  if (a || b || c || d || e || f || g || h) {
    return;
  }

  danhSach.push(nhanVien);
  taoTable(danhSach);
  localStorage.setItem('danhSach', JSON.stringify(danhSach));

  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Thêm nhân viên thành công',
    showConfirmButton: false,
    timer: 1500,
  });
};

deleteNv = (account) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Tài khoản ${account} sẽ bị xóa và không thể phục hồi`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
  }).then((result) => {
    if (result.isConfirmed) {
      for (let i = 0; i < danhSach.length; i++) {
        if (danhSach[i].account == account) {
          danhSach.splice(i, 1);
        }
      }
      localStorage.setItem('danhSach', JSON.stringify(danhSach));
      Swal.fire('Deleted!', `Tài khoản ${account} đã bị xóa`, 'success').then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    }
  });
};
