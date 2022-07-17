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
  danhSachNV.themNhanVien(nhanVien);
  taoTable(danhSach);
  localStorage.setItem('danhSach', JSON.stringify(danhSach));
  resetForm('formNV');
  alertSuccess('Thêm nhân viên thành công');
};

btnDeleteNv = (tk) => {
  alertDelete(`Tài khoản ${tk} sẽ bị xóa và không thể phục hồi`).then((result) => {
    if (result.isConfirmed) {
      danhSachNV.xoaNhanVien(tk);
      localStorage.setItem('danhSach', JSON.stringify(danhSach));
      alertSuccess(`Tài khoản ${tk} đã bị xóa`);
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
      taoTable(danhSach);
      localStorage.setItem('danhSach', JSON.stringify(danhSach));
      alertSuccess('Cập nhật thành công');
      return;
    }
  }
  messageSwitch(1, 'tbTKNV', 'Tài khoản không tồn tại');
};

btnTimNV = () => {
  let searchValue = getEle('searchName').value.toLowerCase();
  let danhSachXepLoai = danhSachNV.timNhanVien(searchValue);
  danhSachXepLoai.length == 0
    ? messageSwitch(1, 'tbSearch', 'Không tìm thấy kết quả nào')
    : messageSwitch(0, 'tbSearch');
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
          <td><button class="btn btn-success mb-1 mr-1" data-toggle="modal"
          data-target="#myModal" onclick ="btnEditNv('${nv.tk}')">
          <i class="fa fa-pencil-square"></i>
          </button><button class="btn btn-danger mb-1" onclick ="btnDeleteNv('${nv.tk}')">
          <i class="fa fa-trash"></i>
          </button></td>
          </tr>`)
  );
  getEle('tableDanhSach').innerHTML = tableContent;
};
