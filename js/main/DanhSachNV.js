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
        const index = nv.xepLoai.toLowerCase().indexOf(searchValue); // để tìm từng ký tự
        if (index > -1) {
          danhSachXepLoai.push(nv);
        }
      });
    }
    return danhSachXepLoai;
  };
}
