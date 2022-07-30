const getEle = (id) => document.getElementById(id);
export class Validate {
  textRegex =
    /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
  numRegex = /^[0-9]+$/;
  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  dateRegex = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

  messageSwitch = (isFalse, idTB, message = '') => {
    if (isFalse == false) {
      getEle(idTB).style.display = 'block';
      getEle(idTB).innerHTML = message;
      return false;
    } else if (isFalse == true) {
      getEle(idTB).style.display = 'none';
      return true;
    }
  };

  isFilled = (id, idTB) => {
    let text = getEle(id).value.trim();
    return text == ''
      ? this.messageSwitch(false, idTB, `(*)Vui lòng không để trống `)
      : this.messageSwitch(true, idTB);
  };

  isSelected = () => {
    let theSelect = getEle('chucvu');
    return theSelect.selectedIndex == 0
      ? this.messageSwitch(false, 'tbChucVu', 'Hãy chọn chức vụ')
      : this.messageSwitch(true, 'tbChucVu');
  };

  isNotExist = (danhSach, isUpdate = false) => {
    if (isUpdate == true) return this.messageSwitch(true, 'tbTKNV');

    for (let i = 0; i < danhSach.length; i++) {
      if (danhSach[i].tk == getEle('tknv').value.replaceAll(' ', '')) {
        return this.messageSwitch(false, 'tbTKNV', 'Tài khoản đã tồn tại');
      }
    }
    return this.messageSwitch(true, 'tbTKNV');
  };

  isInLength = (id, idTB, minLength, maxLength) => {
    let text = getEle(id).value;
    return text.length < minLength || text.length > maxLength
      ? this.messageSwitch(false, idTB, `STK phải có ${minLength}-${maxLength} ký tự`)
      : this.messageSwitch(true, idTB);
  };

  isMatch = (id, idTB, format, message) => {
    let text = getEle(id).value;
    return !text.match(format)
      ? this.messageSwitch(false, idTB, message)
      : this.messageSwitch(true, idTB);
  };

  isInRange = (id, idTB, min, max) => {
    let number = Number(getEle(id).value);
    return number < min || number > max
      ? this.messageSwitch(false, idTB, `(*)Phải nằm trong khoảng ${min}-${max}`)
      : this.messageSwitch(true, idTB);
  };

  isValid = (danhSach, isUpdate) => {
    let valid = true;
    valid &=
      this.isFilled('tknv', 'tbTKNV') &&
      this.isMatch('tknv', 'tbTKNV', this.numRegex, '(*)Phải là số') &&
      this.isInLength('tknv', 'tbTKNV', 4, 6) &&
      this.isNotExist(danhSach, isUpdate);
    valid &=
      this.isFilled('name', 'tbTen') &&
      this.isMatch(
        'name',
        'tbTen',
        this.textRegex,
        'Tên không được chứa số và ký tự đặc biệt'
      );
    valid &=
      this.isFilled('email', 'tbEmail') &&
      this.isMatch('email', 'tbEmail', this.emailRegex, 'Email không hợp lệ');
    valid &=
      this.isFilled('password', 'tbMatKhau') &&
      this.isMatch(
        'password',
        'tbMatKhau',
        this.passRegex,
        'Mật khẩu từ 6-10 ký tự (ít nhất 1 ký tự số, 1 ký tự hoa, 1 ký tự đặc biệt'
      );
    valid &=
      this.isFilled('datepicker', 'tbNgay') &&
      this.isMatch(
        'datepicker',
        'tbNgay',
        this.dateRegex,
        'Định dạng ngày phải là mm/dd/yyyy'
      );
    valid &=
      this.isFilled('luongCB', 'tbLuongCB') &&
      this.isMatch('luongCB', 'tbLuongCB', this.numRegex, '(*)Phải là số') &&
      this.isInRange('luongCB', 'tbLuongCB', 1e6, 2e7);
    valid &= this.isSelected();
    valid &=
      this.isFilled('gioLam', 'tbGiolam') &&
      this.isMatch('gioLam', 'tbGiolam', this.numRegex, '(*)Phải là số') &&
      this.isInRange('gioLam', 'tbGiolam', 80, 200);
    return valid;
  };
}
