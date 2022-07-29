export class NhanVien {
  constructor(tk, name, email, password, ngaylam, luongCB, chucvu, gioLam) {
    this.tk = tk;
    this.name = name;
    this.email = email;
    this.password = password;
    this.ngaylam = ngaylam;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.gioLam = gioLam;
    this.tongLuong = this.tinhLuong();
    this.xepLoai = this.xepLoaiNv();
  }

  tinhLuong() {
    switch (this.chucvu) {
      case 'Sếp':
        return this.luongCB * 3;
      case 'Trưởng phòng':
        return this.luongCB * 2;
      case 'Nhân viên':
        return this.luongCB;
    }
  }

  xepLoaiNv() {
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
  }
}

// NhanVien.prototype.tinhLuong = function () {
//   switch (this.chucvu) {
//     case 'Sếp':
//       return this.luongCB * 3;
//     case 'Trưởng phòng':
//       return this.luongCB * 2;
//     case 'Nhân viên':
//       return this.luongCB;
//   }
// };

// NhanVien.prototype.xepLoaiNv = function () {
//   let g = Number(this.gioLam);

//   return g >= 192
//     ? 'Xuất sắc'
//     : g < 192 && g >= 176
//     ? 'Giỏi'
//     : g < 176 && g >= 160
//     ? 'Khá'
//     : g < 160
//     ? 'Trung bình'
//     : '';
// };
