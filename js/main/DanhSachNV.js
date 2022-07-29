export class DanhSachNV {
  danhSach = [];

  themNhanVien = (nv) => {
    this.danhSach.push(nv);
  };

  timViTri = (tk) => {
    for (let i = 0; i < this.danhSach.length; i++) {
      if (this.danhSach[i].tk == tk) {
        return i;
      }
    }
  };

  xoaNhanVien = (tk) => {
    let viTri = this.timViTri(tk);
    this.danhSach.splice(viTri, 1);
  };

  suaNhanVien = (nhanVien) => {
    let viTri = this.timViTri(nhanVien.tk);
    this.danhSach[viTri] = nhanVien;
  };

  timNhanVien = (searchValue) => {
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
}

// DanhSachNV.prototype.themNhanVien = function (nv) {
//   this.danhSach.push(nv);
// };

// DanhSachNV.prototype.timViTri = function (tk) {
//   for (let i = 0; i < this.danhSach.length; i++) {
//     if (this.danhSach[i].tk == tk) {
//       return i;
//     }
//   }
// };

// DanhSachNV.prototype.xoaNhanVien = function (tk) {
//   let viTri = this.timViTri(tk);
//   this.danhSach.splice(viTri, 1);
// };

// DanhSachNV.prototype.suaNhanVien = function (nhanVien) {
//   let viTri = this.timViTri(nhanVien.tk);
//   this.danhSach[viTri] = nhanVien;
// };

// DanhSachNV.prototype.timNhanVien = function (searchValue) {
//   let danhSachXepLoai = [];
//   if (searchValue == '') {
//     danhSachXepLoai = this.danhSach;
//   } else {
//     this.danhSach.forEach((nv) => {
//       if (nv.xepLoai.toLowerCase() == searchValue) {
//         danhSachXepLoai.push(nv);
//       }
//     });
//   }
//   return danhSachXepLoai;
// };
