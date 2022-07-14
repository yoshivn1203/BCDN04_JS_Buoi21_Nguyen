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
          <td>${element.salary}</td>
          <td>${element.quality}</td>
          <td><button class="btn btn-danger mx-1" onclick ="deleteNv('${element.tk}')">
          Xóa
        </button><button class="btn btn-success" data-toggle="modal"
        data-target="#myModal" onclick ="editNv('${element.tk}')">
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
    tk: getEle('tknv').value,
    name: getEle('name').value,
    email: getEle('email').value,
    password: getEle('password').value,
    ngaylam: getEle('datepicker').value,
    luongCB: getEle('luongCB').value,
    chucvu: getEle('chucvu').value,
    gioLam: getEle('gioLam').value,
    salary: 0,
    quality: '',
  };

  checkAccountExist('tknv');
  if (validateNV() || checkAccountExist('tknv')) {
    return;
  }

  nhanVien.salary = tinhLuong(nhanVien.chucvu, getEle('luongCB').value);
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
        if (danhSach[i].tk == account) {
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

editNv = (account) => {
  let objData;
  for (let i = 0; i < danhSach.length; i++) {
    if (danhSach[i].tk == account) {
      objData = { ...danhSach[i] };
    }
  }
  var form = $('#formNV');
  for (var key in objData) {
    var selector = `input[name="${key}"], textarea[name="${key}"]`;
    var input = $(form).find(selector);
    input.val(objData[key]);
  }
  console.log(objData);

  // const form2 = document.querySelector('#formNV');
  // const formData = new FormData(form2);
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ', ' + pair[1]);
  // }
};

btnCapNhat = () => {
  getEle('tbTKNV2').style.display = 'none';
  if (validateNV()) {
    return;
  }
  let j;
  let account = getEle('tknv').value;
  for (let i = 0; i < danhSach.length; i++) {
    if (danhSach[i].tk == account) {
      j = i;
      break;
    }
  }
  if (j == undefined) {
    getEle('tbTKNV').innerHTML = 'Tài khoản không tồn tại';
    getEle('tbTKNV').style.display = 'block';
  } else {
    danhSach[j].name = getEle('name').value;
    danhSach[j].email = getEle('email').value;
    danhSach[j].ngaylam = getEle('datepicker').value;
    danhSach[j].chucvu = getEle('chucvu').value;
    danhSach[j].salary = tinhLuong(
      getEle('chucvu').value,
      getEle('luongCB').value
    );
    danhSach[j].quality = xepLoaiNv(Number(getEle('gioLam').value));
    getEle('tbTKNV').style.display = 'none';
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
      if (element.quality.toLowerCase() == searchValue) {
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
