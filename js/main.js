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
          <td><button class="btn btn-danger mx-1" onclick ="deleteNv('${element.account}')">
          Xóa
        </button><button class="btn btn-success" onclick ="editNv('${element.account}')">
          Sửa
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

btnThemNV = () => {
  let nhanVien = {
    account: getEle('tknv').value,
    name: getEle('name').value,
    email: getEle('email').value,
    startDate: getEle('datepicker').value,
    position: getEle('chucvu').value,
    salary: 0,
    quality: '',
  };

  if (validateNV()) {
    return;
  }

  nhanVien.salary = tinhLuong(nhanVien.position, getEle('luongCB').value);
  nhanVien.quality = xepLoaiNv(Number(getEle('gioLam').value));

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

editNv = (account) => {};

tinhLuong = (chucVu, luongCB) => {
  switch (chucVu) {
    case 'Sếp':
      return luongCB * 3;
    case 'Trưởng phòng':
      return luongCB * 2;
    case 'Nhân viên':
      return luongCB;
  }
};

xepLoaiNv = (gioLam) => {
  return gioLam >= 192
    ? 'Xuất sắc'
    : gioLam < 192 && gioLam >= 176
    ? 'Giỏi'
    : gioLam < 176 && gioLam >= 160
    ? 'Khá'
    : gioLam < 160
    ? 'Trung bình'
    : '';
};
