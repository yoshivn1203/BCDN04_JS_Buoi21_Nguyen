function NhanVien(tk) {
  this.tk = tk;
}

NhanVien.prototype.layThongTinTuForm = function () {
  this.name = getEle('name').value;
  this.email = getEle('email').value;
  this.password = getEle('password').value;
  this.ngaylam = getEle('datepicker').value;
  this.luongCB = getEle('luongCB').value;
  this.chucvu = getEle('chucvu').value;
  this.gioLam = getEle('gioLam').value;
};

NhanVien.prototype.tinhLuong = function () {
  switch (this.chucvu) {
    case 'Sếp':
      this.tongLuong = this.luongCB * 3;
      break;
    case 'Trưởng phòng':
      this.tongLuong = this.luongCB * 2;
      break;
    case 'Nhân viên':
      this.tongLuong = this.luongCB;
      break;
  }
};

NhanVien.prototype.xepLoaiNv = function () {
  let g = Number(this.gioLam);

  g >= 192
    ? (this.xepLoai = 'Xuất sắc')
    : g < 192 && g >= 176
    ? (this.xepLoai = 'Giỏi')
    : g < 176 && g >= 160
    ? (this.xepLoai = 'Khá')
    : g < 160
    ? (this.xepLoai = 'Trung bình')
    : (this.xepLoai = '');
};
