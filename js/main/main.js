getEle = (id) => document.getElementById(id);
resetForm = (formId) => getEle(formId).reset();

castToNhanVien = (object) => Object.assign(new NhanVien(), object);

let danhSachNV = new DanhSachNV();
let { danhSach } = danhSachNV;

window.onload = () => {
  data = localStorage.getItem('danhSach')
    ? JSON.parse(localStorage.getItem('danhSach'))
    : data;

  data = data.map((p) => castToNhanVien(p));
  data.forEach((p) => {
    danhSachNV.themNhanVien(p);
  });
  taoTable(danhSach);
};

btnThemNV = () => {
  let validateResult = validateNV();
  if (validateResult) {
    validateResult = checkAccountNotExist();
  }
  if (!validateResult) return;

  let nhanVien = new NhanVien(getEle('tknv').value);
  nhanVien.layThongTinTuForm();
  nhanVien.tinhLuong();
  nhanVien.xepLoaiNv();
  danhSachNV.themNhanVien(nhanVien);
  taoTable(danhSach);
  localStorage.setItem('danhSach', JSON.stringify(danhSach));
  resetForm('formNV');

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
      danhSachNV.xoaNhanVien(tk);
      localStorage.setItem('danhSach', JSON.stringify(danhSach));
      Swal.fire('Deleted!', `Tài khoản ${tk} đã bị xóa`, 'success');
      taoTable(danhSach);
    }
  });
};

btnEditNv = (tk) => {
  for (const nhanVien of danhSach) {
    if (nhanVien.tk == tk) {
      getEle('tknv').value = nhanVien.tk;
      getEle('name').value = nhanVien.name;
      getEle('email').value = nhanVien.email;
      getEle('password').value = nhanVien.password;
      getEle('datepicker').value = nhanVien.ngaylam;
      getEle('luongCB').value = nhanVien.luongCB;
      getEle('chucvu').value = nhanVien.chucvu;
      getEle('gioLam').value = nhanVien.gioLam;
      break;
    }
  }
};

btnCapNhat = () => {
  if (!validateNV()) return;

  for (const nhanVien of danhSach) {
    if (nhanVien.tk == getEle('tknv').value) {
      messageSwitch(0, 'tbTKNV');
      nhanVien.layThongTinTuForm();
      nhanVien.tinhLuong();
      nhanVien.xepLoaiNv();
      taoTable(danhSach);
      localStorage.setItem('danhSach', JSON.stringify(danhSach));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cập nhật nhân viên thành công',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  }
  messageSwitch(1, 'tbTKNV', 'Tài khoản không tồn tại');
};

btnTimNV = () => {
  let searchValue = getEle('searchName').value.toLowerCase();
  let danhSachXepLoai = danhSachNV.timNhanVien(searchValue);
  taoTable(danhSachXepLoai);
};

taoTable = (danhSach) => {
  let tableContent = '';
  danhSach.forEach(
    (nv) =>
      (tableContent += `<tr>
          <td>${nv.tk}</td>
          <td>${nv.name}</td>
          <td>${nv.email}</td>
          <td>${nv.ngaylam}</td>
          <td>${nv.chucvu}</td>
          <td>${nv.tongLuong}</td>
          <td>${nv.xepLoai}</td>
          <td><button class="btn btn-success" data-toggle="modal"
          data-target="#myModal" onclick ="btnEditNv('${nv.tk}')">
          <i class="fa fa-pencil-square-o"></i>
          </button><button class="btn btn-danger mx-1" onclick ="btnDeleteNv('${nv.tk}')">
          <i class="fa fa-trash"></i>
          </button></td>
          </tr>`)
  );
  getEle('tableDanhSach').innerHTML = tableContent;
};
