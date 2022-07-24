const getEle = (id) => document.getElementById(id);
export class Validate {
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
    let text = getEle(id).value;
    return text == ''
      ? this.messageSwitch(1, idTB, `(*)Vui lòng không để trống `)
      : this.messageSwitch(0, idTB);
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

  isText() {
    let text = getEle('name').value;
    let textSample = /^[A-Za-z ]+$/;
    return !text.match(textSample)
      ? this.messageSwitch(1, 'tbTen', 'Tên phải là chữ không dấu')
      : this.messageSwitch(0, 'tbTen');
  }

  isEmail() {
    let text = getEle('email').value;
    let textSample =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !text.match(textSample)
      ? this.messageSwitch(1, 'tbEmail', 'Email không hợp lệ')
      : this.messageSwitch(0, 'tbEmail');
  }

  isPassword() {
    let text = getEle('password').value;
    let textSample = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return !text.match(textSample)
      ? this.messageSwitch(
          1,
          'tbMatKhau',
          'Mật khẩu từ 6-10 ký tự (ít nhất 1 ký tự số, 1 ký tự hoa, 1 ký tự đặc biệt'
        )
      : this.messageSwitch(0, 'tbMatKhau');
  }

  isDate() {
    let text = getEle('datepicker').value;
    let textSample = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    return !text.match(textSample)
      ? this.messageSwitch(1, 'tbNgay', 'Định dạng ngày phải là mm/dd/yyyy')
      : this.messageSwitch(0, 'tbNgay');
  }

  isNumber(id, idTB) {
    let text = getEle(id).value;
    let textSample = /^[0-9]+$/;
    return !text.match(textSample)
      ? this.messageSwitch(1, idTB, `(*)Phải là số`)
      : this.messageSwitch(0, idTB);
  }

  isInRange(id, idTB, min, max) {
    let number = Number(getEle(id).value);
    return number < min || number > max
      ? this.messageSwitch(1, idTB, `(*)Phải nằm trong khoảng ${min}-${max}`)
      : this.messageSwitch(0, idTB);
  }

  isSelected() {
    let theSelect = getEle('chucvu');
    return theSelect.selectedIndex == 0
      ? this.messageSwitch(1, 'tbChucVu', 'Hãy chọn chức vụ')
      : this.messageSwitch(0, 'tbChucVu');
  }

  isValid() {
    let validateAccount = this.isNotEmpty('tknv', 'tbTKNV');
    if (validateAccount) {
      validateAccount = this.isInLength('tknv', 'tbTKNV', 4, 6);
    }

    let validateName = this.isNotEmpty('name', 'tbTen');
    if (validateName) {
      validateName = this.isText();
    }

    let validateEmail = this.isNotEmpty('email', 'tbEmail');
    if (validateEmail) {
      validateEmail = this.isEmail();
    }

    let validatePassword = this.isNotEmpty('password', 'tbMatKhau');
    if (validatePassword) {
      validatePassword = this.isPassword();
    }

    let validateDate = this.isNotEmpty('datepicker', 'tbNgay');
    if (validateDate) {
      validateDate = this.isDate();
    }

    let validateLuongCb = this.isNotEmpty('luongCB', 'tbLuongCB');
    if (validateLuongCb) {
      validateLuongCb = this.isNumber('luongCB', 'tbLuongCB');
      if (validateLuongCb) {
        validateLuongCb = this.isInRange('luongCB', 'tbLuongCB', 1e6, 2e7);
      }
    }

    let validateChucVu = this.isSelected();

    let validateGioLam = this.isNotEmpty('gioLam', 'tbGiolam');
    if (validateGioLam) {
      validateGioLam = this.isNumber('gioLam', 'tbGiolam');
      if (validateGioLam) {
        validateGioLam = this.isInRange('gioLam', 'tbGiolam', 80, 200);
      }
    }

    return validateAccount &&
      validateName &&
      validateEmail &&
      validatePassword &&
      validateDate &&
      validateLuongCb &&
      validateChucVu &&
      validateGioLam
      ? true
      : false;
  }
}
