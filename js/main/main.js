getEle = (id) => {
  return document.getElementById(id);
};

let danhSach = [];

taoTable = (danhSach) => {
  let tableContent = '';
  danhSach.map(
    (element) =>
      (tableContent += `<tr>
          <td>${element.tk}</td>
          <td>${element.name}</td>
          <td>${element.email}</td>
          <td>${element.ngaylam}</td>
          <td>${element.chucvu}</td>
          <td>${element.tongLuong}</td>
          <td>${element.xepLoai}</td>
          <td><button class="btn btn-success" data-toggle="modal"
          data-target="#myModal" onclick ="btnEditNv('${element.tk}')">
          <i class="fa fa-pencil-square-o"></i>
          </button><button class="btn btn-danger mx-1" onclick ="btnDeleteNv('${element.tk}')">
          <i class="fa fa-trash"></i>
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
    tk: getEle('tknv').value,
    name: getEle('name').value,
    email: getEle('email').value,
    password: getEle('password').value,
    ngaylam: getEle('datepicker').value,
    luongCB: getEle('luongCB').value,
    chucvu: getEle('chucvu').value,
    gioLam: getEle('gioLam').value,
    tongLuong: 0,
    xepLoai: '',
  };

  let validateResult = validateNV();
  if (validateResult) {
    validateResult = checkAccountNotExist();
  }

  if (!validateResult) return;

  nhanVien.tongLuong = tinhLuong(nhanVien.chucvu, getEle('luongCB').value);
  nhanVien.xepLoai = xepLoaiNv(Number(getEle('gioLam').value));

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

btnDeleteNv = (tk) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `Tài khoản ${tk} sẽ bị xóa và không thể phục hồi`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
  }).then((result) => {
    if (result.isConfirmed) {
      for (let i = 0; i < danhSach.length; i++) {
        if (danhSach[i].tk == tk) {
          danhSach.splice(i, 1);
        }
      }
      localStorage.setItem('danhSach', JSON.stringify(danhSach));
      Swal.fire('Deleted!', `Tài khoản ${tk} đã bị xóa`, 'success').then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );
    }
  });
};

btnEditNv = (tk) => {
  let nhanVien;
  for (let i = 0; i < danhSach.length; i++) {
    if (danhSach[i].tk == tk) {
      nhanVien = { ...danhSach[i] };
    }
  }

  getEle('tknv').value = nhanVien.tk;
  getEle('name').value = nhanVien.name;
  getEle('email').value = nhanVien.email;
  getEle('password').value = nhanVien.password;
  getEle('datepicker').value = nhanVien.ngaylam;
  getEle('luongCB').value = nhanVien.luongCB;
  getEle('chucvu').value = nhanVien.chucvu;
  getEle('gioLam').value = nhanVien.gioLam;
};

btnCapNhat = () => {
  if (!validateNV()) return;

  let j;
  for (let i = 0; i < danhSach.length; i++) {
    if (danhSach[i].tk == getEle('tknv').value) {
      j = i;
      break;
    }
  }
  if (j == undefined) {
    getEle('tbTKNV').innerHTML = 'Tài khoản không tồn tại';
    getEle('tbTKNV').style.display = 'block';
  } else {
    getEle('tbTKNV').style.display = 'none';
    danhSach[j].name = getEle('name').value;
    danhSach[j].email = getEle('email').value;
    danhSach[j].ngaylam = getEle('datepicker').value;
    danhSach[j].chucvu = getEle('chucvu').value;
    danhSach[j].tongLuong = tinhLuong(
      getEle('chucvu').value,
      getEle('luongCB').value
    );
    danhSach[j].xepLoai = xepLoaiNv(Number(getEle('gioLam').value));
    taoTable(danhSach);
    localStorage.setItem('danhSach', JSON.stringify(danhSach));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cập nhật nhân viên thành công',
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

btnTimNV = () => {
  let searchValue = getEle('searchName').value.toLowerCase();
  let danhSachXepLoai = [];
  if (searchValue == '') {
    danhSachXepLoai = danhSach;
  } else {
    danhSach.map((element) => {
      if (element.xepLoai.toLowerCase() == searchValue) {
        danhSachXepLoai.push(element);
      }
    });
  }
  taoTable(danhSachXepLoai);
};

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
