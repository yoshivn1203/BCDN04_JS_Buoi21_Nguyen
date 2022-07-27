const getEle = (id) => document.getElementById(id);
export class Validate {
  textRegex = /^[A-Za-z ]+$/;
  numRegex = /^[0-9]+$/;
  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  dateRegex = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

  messageSwitch = (value, idTB, message = '') => {
    if (value == 1) {
      getEle(idTB).style.display = 'block';
      getEle(idTB).innerHTML = message;
      return false;
    } else if (value == 0) {
      getEle(idTB).style.display = 'none';
      return true;
    }
  };

  isNotEmpty(id, idTB) {
    let text = getEle(id).value.trim();
    return text == ''
      ? this.messageSwitch(1, idTB, `(*)Vui lòng không để trống `)
      : this.messageSwitch(0, idTB);
  }

  isSelected() {
    let theSelect = getEle('chucvu');
    return theSelect.selectedIndex == 0
      ? this.messageSwitch(1, 'tbChucVu', 'Hãy chọn chức vụ')
      : this.messageSwitch(0, 'tbChucVu');
  }

  isNotExist(danhSach) {
    for (let i = 0; i < danhSach.length; i++) {
      if (danhSach[i].tk == getEle('tknv').value) {
        return this.messageSwitch(1, 'tbTKNV', 'Tài khoản đã tồn tại');
      }
    }
    return this.messageSwitch(0, 'tbTKNV');
  }

  isInLength(id, idTB, minLength, maxLength) {
    let text = getEle(id).value;
    return text.length < minLength || text.length > maxLength
      ? this.messageSwitch(1, idTB, `STK phải có ${minLength}-${maxLength} ký tự`)
      : this.messageSwitch(0, idTB);
  }

  isMatch(id, idTB, format, message) {
    let text = getEle(id).value;
    return !text.match(format)
      ? this.messageSwitch(1, idTB, message)
      : this.messageSwitch(0, idTB);
  }

  isInRange(id, idTB, min, max) {
    let number = Number(getEle(id).value);
    return number < min || number > max
      ? this.messageSwitch(1, idTB, `(*)Phải nằm trong khoảng ${min}-${max}`)
      : this.messageSwitch(0, idTB);
  }

  isValid() {
    let valid = true;
    valid &= this.isNotEmpty('tknv', 'tbTKNV') && this.isInLength('tknv', 'tbTKNV', 4, 6);
    valid &=
      this.isNotEmpty('name', 'tbTen') &&
      this.isMatch('name', 'tbTen', this.textRegex, 'Tên phải là chữ không dấu');
    valid &=
      this.isNotEmpty('email', 'tbEmail') &&
      this.isMatch('email', 'tbEmail', this.emailRegex, 'Email không hợp lệ');
    valid &=
      this.isNotEmpty('password', 'tbMatKhau') &&
      this.isMatch(
        'password',
        'tbMatKhau',
        this.passRegex,
        'Mật khẩu từ 6-10 ký tự (ít nhất 1 ký tự số, 1 ký tự hoa, 1 ký tự đặc biệt'
      );
    valid &=
      this.isNotEmpty('datepicker', 'tbNgay') &&
      this.isMatch(
        'datepicker',
        'tbNgay',
        this.dateRegex,
        'Định dạng ngày phải là mm/dd/yyyy'
      );
    valid &=
      this.isNotEmpty('luongCB', 'tbLuongCB') &&
      this.isMatch('luongCB', 'tbLuongCB', this.numRegex, '(*)Phải là số') &&
      this.isInRange('luongCB', 'tbLuongCB', 1e6, 2e7);
    valid &= this.isSelected();
    valid &=
      this.isNotEmpty('gioLam', 'tbGiolam') &&
      this.isMatch('gioLam', 'tbGiolam', this.numRegex, '(*)Phải là số') &&
      this.isInRange('gioLam', 'tbGiolam', 80, 200);
    return valid;
  }
}
