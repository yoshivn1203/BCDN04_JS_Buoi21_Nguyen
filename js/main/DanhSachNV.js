function DanhSachNV() {
  this.danhSach = [];
}

DanhSachNV.prototype.themNhanVien = function (nv) {
  this.danhSach.push(nv);
};

DanhSachNV.prototype.xoaNhanVien = function (tk) {
  for (let i = 0; i < this.danhSach.length; i++) {
    if (this.danhSach[i].tk == tk) {
      this.danhSach.splice(i, 1);
    }
  }
};

DanhSachNV.prototype.timNhanVien = function (searchValue) {
  let danhSachXepLoai = [];
  if (searchValue == '') {
    danhSachXepLoai = this.danhSach;
  } else {
    this.danhSach.forEach((nv) => {
      if (nv.xepLoai.toLowerCase() == searchValue) {
        danhSachXepLoai.push(nv);
      }
    });
  }
  return danhSachXepLoai;
};
