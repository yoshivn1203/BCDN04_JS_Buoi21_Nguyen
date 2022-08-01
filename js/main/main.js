import { Helper, CustomModal } from './utils.js';
import { Validate } from './validate.js';
import { NhanVien } from './NhanVien.js';
import { DanhSachNV } from './DanhSachNV.js';

const helper = new Helper();
const validate = new Validate();
let danhSachNV = new DanhSachNV();
let { danhSach } = danhSachNV;

const getEle = (id) => document.getElementById(id);
const resetForm = (formId) => getEle(formId).reset();

// khi load trang
window.onload = () => {
  let data = localStorage.getItem('danhSach')
    ? JSON.parse(localStorage.getItem('danhSach'))
    : [];
  data.forEach((p) => {
    danhSachNV.themNhanVien(p);
  });
  renderTable(danhSach);
};

//  nút toggle form thêm nhân viên
getEle('btnThem').onclick = () => {
  helper.clearTB(); // xóa các thông báo cũ
  getEle('tknv').disabled = false;
  getEle('btnCapNhat').style.display = 'none';
  getEle('btnThemNV').style.display = 'inline-block';
};

// nút thêm nhân viên
getEle('btnThemNV').onclick = () => {
  if (!validate.isValid(danhSach)) return;
  let inputs = helper.getInputValue();
  let nhanVien = new NhanVien(...inputs);
  danhSachNV.themNhanVien(nhanVien);
  renderTable(danhSach);
  localStorage.setItem('danhSach', JSON.stringify(danhSach));
  resetForm('formNV');
  CustomModal.alertSuccess('Thêm nhân viên thành công');
};

// nút xóa nhân viên
window.btnDeleteNv = (tk) => {
  CustomModal.alertDelete(`Tài khoản ${tk} sẽ bị xóa và không thể phục hồi`).then(
    (result) => {
      if (result.isConfirmed) {
        danhSachNV.xoaNhanVien(tk);
        localStorage.setItem('danhSach', JSON.stringify(danhSach));
        CustomModal.alertSuccess(`Tài khoản ${tk} đã bị xóa`);
        renderTable(danhSach);
      }
    }
  );
};

//  nút toggle form sửa nhân viên
window.btnEditNv = (tk) => {
  helper.clearTB();
  getEle('tknv').disabled = true;
  getEle('btnCapNhat').style.display = 'inline-block';
  getEle('btnThemNV').style.display = 'none';

  for (const nhanVien of danhSach) {
    if (nhanVien.tk == tk) {
      let arr = Object.keys(nhanVien).map((k) => nhanVien[k]);
      helper.fill(arr);
      break;
    }
  }
};

// nút cập nhật nhân viên
getEle('btnCapNhat').onclick = () => {
  if (!validate.isValid(danhSach, true)) return;
  let inputs = helper.getInputValue();
  let nhanVien = new NhanVien(...inputs);
  danhSachNV.suaNhanVien(nhanVien);
  renderTable(danhSach);
  localStorage.setItem('danhSach', JSON.stringify(danhSach));
  CustomModal.alertSuccess('Cập nhật thành công');
};

// nút tìm nhân viên theo xếp hạng
window.btnTimNV = () => {
  let searchValue = getEle('searchName').value.toLowerCase().trim();
  let danhSachXepLoai = danhSachNV.timNhanVien(searchValue);
  danhSachXepLoai.length == 0
    ? validate.messageSwitch(false, 'tbSearch', 'Không tìm thấy kết quả nào')
    : validate.messageSwitch(true, 'tbSearch');
  renderTable(danhSachXepLoai);
};

const renderTable = (danhSach) => {
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
