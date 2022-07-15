checkNotEmpty = (idField, id, doiTuong) => {
  let text = getEle(idField).value;
  if (text == '') {
    getEle(id).innerHTML = `${doiTuong} không được để trống `;
    getEle(id).style.display = 'block';
    return false;
  } else {
    getEle(id).style.display = 'none';
    return true;
  }
};

checkAccountNotExist = () => {
  for (let i = 0; i < danhSach.length; i++) {
    if (danhSach[i].tk == getEle('tknv').value) {
      getEle('tbTKNV').innerHTML = 'Tài khoản đã tồn tại';
      getEle('tbTKNV').style.display = 'block';
      return false;
    }
  }
  getEle('tbTKNV').style.display = 'none';
  return true;
};

checkLenght = (idField, id, doiTuong, minLength, maxLength) => {
  let text = getEle(idField).value;

  if (text.length < minLength || text.length > maxLength) {
    getEle(
      id
    ).innerHTML = `${doiTuong} phải có ${minLength}-${maxLength} ký tự`;
    getEle(id).style.display = 'block';
    return false;
  } else {
    getEle(id).style.display = 'none';
    return true;
  }
};

checkText = () => {
  let text = getEle('name').value;
  let textSample = /^[A-Za-z ]+$/;
  if (!text.match(textSample)) {
    getEle('tbTen').innerHTML = 'Tên phải là chữ không dấu';
    getEle('tbTen').style.display = 'block';
    return false;
  } else {
    getEle('tbTen').style.display = 'none';
    return true;
  }
};
checkEmail = () => {
  let text = getEle('email').value;
  let textSample =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!text.match(textSample)) {
    getEle('tbEmail').innerHTML = 'Email không hợp lệ';
    getEle('tbEmail').style.display = 'block';
    return false;
  } else {
    getEle('tbEmail').style.display = 'none';
    return true;
  }
};
checkPassword = () => {
  let text = getEle('password').value;
  let textSample =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

  if (!text.match(textSample)) {
    getEle('tbMatKhau').innerHTML =
      'Mật khẩu từ 6-10 ký tự (ít nhất 1 ký tự số, 1 ký tự hoa, 1 ký tự đặc biệt';
    getEle('tbMatKhau').style.display = 'block';
    return false;
  } else {
    getEle('tbMatKhau').style.display = 'none';
    return true;
  }
};
checkDateInput = () => {
  let text = getEle('datepicker').value;
  let textSample =
    /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

  if (!text.match(textSample)) {
    getEle('tbNgay').innerHTML = 'Định dạng ngày phải là mm/dd/yyyy';
    getEle('tbNgay').style.display = 'block';
    return false;
  } else {
    getEle('tbNgay').style.display = 'none';
    return true;
  }
};

checkNumber = (idField, id, doituong) => {
  let text = getEle(idField).value;
  let textSample = /^[0-9]+$/;
  if (!text.match(textSample)) {
    getEle(id).innerHTML = `${doituong} phải là số`;
    getEle(id).style.display = 'block';
    return false;
  } else {
    getEle(id).style.display = 'none';
    return true;
  }
};

checkNumberValue = (idField, id, doiTuong, minLength, maxLength) => {
  let number = Number(getEle(idField).value);

  if (number < minLength || number > maxLength) {
    getEle(
      id
    ).innerHTML = `${doiTuong} phải nằm trong khoảng ${minLength}-${maxLength}`;
    getEle(id).style.display = 'block';
    return false;
  } else {
    getEle(id).style.display = 'none';
    return true;
  }
};

checkPosition = () => {
  let theSelect = getEle('chucvu');
  if (theSelect.selectedIndex == 0) {
    getEle('tbChucVu').innerHTML = 'Hãy chọn chức vụ';
    getEle('tbChucVu').style.display = 'block';
    return false;
  } else {
    getEle('tbChucVu').style.display = 'none';
    return true;
  }
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
      validateGioLam = checkNumberValue(
        'gioLam',
        'tbGiolam',
        'Giờ làm',
        80,
        200
      );
    }
  }

  if (
    validateAccount &&
    validateName &&
    validateEmail &&
    validatePassword &&
    validateDate &&
    validateLuongCb &&
    validateChucVu &&
    validateGioLam
  ) {
    return true;
  } else {
    return false;
  }
};
