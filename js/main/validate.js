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

checkNotEmpty = (id, idTB, doiTuong) => {
  let text = getEle(id).value;
  return text == ''
    ? messageSwitch(1, idTB, `${doiTuong} không được để trống `)
    : messageSwitch(0, idTB);
};

checkAccountNotExist = () => {
  for (let i = 0; i < danhSach.length; i++) {
    if (danhSach[i].tk == getEle('tknv').value) {
      return messageSwitch(1, 'tbTKNV', 'Tài khoản đã tồn tại');
    }
  }
  return messageSwitch(0, 'tbTKNV');
};

checkLenght = (id, idTB, doiTuong, minLength, maxLength) => {
  let text = getEle(id).value;
  return text.length < minLength || text.length > maxLength
    ? messageSwitch(1, idTB, `${doiTuong} phải có ${minLength}-${maxLength} ký tự`)
    : messageSwitch(0, idTB);
};

checkText = () => {
  let text = getEle('name').value;
  let textSample = /^[A-Za-z ]+$/;
  return !text.match(textSample)
    ? messageSwitch(1, 'tbTen', 'Tên phải là chữ không dấu')
    : messageSwitch(0, 'tbTen');
};

checkEmail = () => {
  let text = getEle('email').value;
  let textSample =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !text.match(textSample)
    ? messageSwitch(1, 'tbEmail', 'Email không hợp lệ')
    : messageSwitch(0, 'tbEmail');
};

checkPassword = () => {
  let text = getEle('password').value;
  let textSample = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

  return !text.match(textSample)
    ? messageSwitch(
        1,
        'tbMatKhau',
        'Mật khẩu từ 6-10 ký tự (ít nhất 1 ký tự số, 1 ký tự hoa, 1 ký tự đặc biệt'
      )
    : messageSwitch(0, 'tbMatKhau');
};

checkDateInput = () => {
  let text = getEle('datepicker').value;
  let textSample = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
  return !text.match(textSample)
    ? messageSwitch(1, 'tbNgay', 'Định dạng ngày phải là mm/dd/yyyy')
    : messageSwitch(0, 'tbNgay');
};

checkNumber = (id, idTB, doituong) => {
  let text = getEle(id).value;
  let textSample = /^[0-9]+$/;
  return !text.match(textSample)
    ? messageSwitch(1, idTB, `${doituong} phải là số`)
    : messageSwitch(0, idTB);
};

checkNumberValue = (id, idTB, doiTuong, minLength, maxLength) => {
  let number = Number(getEle(id).value);
  return number < minLength || number > maxLength
    ? messageSwitch(
        1,
        idTB,
        `${doiTuong} phải nằm trong khoảng ${minLength}-${maxLength}`
      )
    : messageSwitch(0, idTB);
};

checkPosition = () => {
  let theSelect = getEle('chucvu');
  return theSelect.selectedIndex == 0
    ? messageSwitch(1, 'tbChucVu', 'Hãy chọn chức vụ')
    : messageSwitch(0, 'tbChucVu');
};

validateNV = () => {
  let validateAccount = checkNotEmpty('tknv', 'tbTKNV', 'Tài khoản');
  if (validateAccount) {
    validateAccount = checkLenght('tknv', 'tbTKNV', 'Tài khoản', 4, 6);
  }

  let validateName = checkNotEmpty('name', 'tbTen', 'Tên');
  if (validateName) {
    validateName = checkText();
  }

  let validateEmail = checkNotEmpty('email', 'tbEmail', 'Email');
  if (validateEmail) {
    validateEmail = checkEmail();
  }

  let validatePassword = checkNotEmpty('password', 'tbMatKhau', 'Mật khẩu');
  if (validatePassword) {
    validatePassword = checkPassword();
  }

  let validateDate = checkNotEmpty('datepicker', 'tbNgay', 'Ngày làm');
  if (validateDate) {
    validateDate = checkDateInput();
  }

  let validateLuongCb = checkNotEmpty('luongCB', 'tbLuongCB', 'Lương cơ bản');
  if (validateLuongCb) {
    validateLuongCb = checkNumber('luongCB', 'tbLuongCB', 'Lương cơ bản');
    if (validateLuongCb) {
      validateLuongCb = checkNumberValue(
        'luongCB',
        'tbLuongCB',
        'Lương cơ bản',
        1e6,
        2e7
      );
    }
  }

  let validateChucVu = checkPosition();

  let validateGioLam = checkNotEmpty('gioLam', 'tbGiolam', 'Giờ làm');
  if (validateGioLam) {
    validateGioLam = checkNumber('gioLam', 'tbGiolam', 'Giờ làm');
    if (validateGioLam) {
      validateGioLam = checkNumberValue('gioLam', 'tbGiolam', 'Giờ làm', 80, 200);
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
};
