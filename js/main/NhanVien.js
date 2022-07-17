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
  this.tongLuong = this.tinhLuong();
  this.xepLoai = this.xepLoaiNv();
};

NhanVien.prototype.tinhLuong = function () {
  switch (this.chucvu) {
    case 'Sếp':
      return this.luongCB * 3;
    case 'Trưởng phòng':
      return this.luongCB * 2;
    case 'Nhân viên':
      return this.luongCB;
  }
};

NhanVien.prototype.xepLoaiNv = function () {
  let g = Number(this.gioLam);

  return g >= 192
    ? 'Xuất sắc'
    : g < 192 && g >= 176
    ? 'Giỏi'
    : g < 176 && g >= 160
    ? 'Khá'
    : g < 160
    ? 'Trung bình'
    : '';
};
