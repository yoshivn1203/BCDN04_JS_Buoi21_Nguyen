checkEmpty = (idField, id, doiTuong) => {
  let text = getEle(idField).value;
  if (text == '') {
    getEle(id).innerHTML = `${doiTuong} không được để trống `;
    getEle(id).style.display = 'block';
    return true;
  } else {
    getEle(id).style.display = 'none';
    return false;
  }
};

checkAccountExist = (idField) => {
  let account = getEle(idField).value;

  for (let i = 0; i < danhSach.length; i++) {
    if (danhSach[i].account == account) {
      getEle('tbTKNV').innerHTML = 'Tài khoản đã tồn tại';
      getEle('tbTKNV').style.display = 'block';
      return true;
    }
  }
  getEle('tbTKNV').style.display = 'none';
  return false;
};

checkLenght = (idField, id, doiTuong, minLength, maxLength) => {
  let text = getEle(idField).value;

  if (text.length < minLength || text.length > maxLength) {
    getEle(
      id
    ).innerHTML = `${doiTuong} phải có ${minLength}-${maxLength} ký tự`;
    getEle(id).style.display = 'block';
    return true;
  } else {
    getEle(id).style.display = 'none';
    return false;
  }
};

checkNotText = (idField) => {
  let text = getEle(idField).value;
  let textSample = /^[A-Za-z ]+$/;
  if (!text.match(textSample)) {
    getEle('tbTen').innerHTML = 'Tên phải là chữ không dấu';
    getEle('tbTen').style.display = 'block';
    return true;
  } else {
    getEle('tbTen').style.display = 'none';
    return false;
  }
};
checkNotEmail = (idField) => {
  let text = getEle(idField).value;
  let textSample =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!text.match(textSample)) {
    getEle('tbEmail').innerHTML = 'Email không hợp lệ';
    getEle('tbEmail').style.display = 'block';
    return true;
  } else {
    getEle('tbEmail').style.display = 'none';
    return false;
  }
};
checkNotPassword = (idField) => {
  let text = getEle(idField).value;
  let textSample =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

  if (!text.match(textSample)) {
    getEle('tbMatKhau').innerHTML =
      'Mật khẩu từ 6-10 ký tự (ít nhất 1 ký tự số, 1 ký tự hoa, 1 ký tự đặc biệt';
    getEle('tbMatKhau').style.display = 'block';
    return true;
  } else {
    getEle('tbMatKhau').style.display = 'none';
    return false;
  }
};
checkNotDate = (idField) => {
  let text = getEle(idField).value;
  let textSample =
    /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

  if (!text.match(textSample)) {
    getEle('tbNgay').innerHTML = 'Định dạng ngày phải là mm/dd/yyyy';
    getEle('tbNgay').style.display = 'block';
    return true;
  } else {
    getEle('tbNgay').style.display = 'none';
    return false;
  }
};

checkNotNumber = (idField, id, doituong) => {
  let text = getEle(idField).value;
  let textSample = /^[0-9]+$/;
  if (!text.match(textSample)) {
    getEle(id).innerHTML = `${doituong} phải là số`;
    getEle(id).style.display = 'block';
    return true;
  } else {
    getEle(id).style.display = 'none';
    return false;
  }
};

checkNumberValue = (idField, id, doiTuong, minLength, maxLength) => {
  let number = Number(getEle(idField).value);

  if (number < minLength || number > maxLength) {
    getEle(
      id
    ).innerHTML = `${doiTuong} phải nằm trong khoảng ${minLength}-${maxLength}`;
    getEle(id).style.display = 'block';
    return true;
  } else {
    getEle(id).style.display = 'none';
    return false;
  }
};

checkPosition = () => {
  let theSelect = getEle('chucvu');
  if (theSelect.selectedIndex == 0) {
    getEle('tbChucVu').innerHTML = 'Hãy chọn chức vụ';
    getEle('tbChucVu').style.display = 'block';
    return true;
  } else {
    getEle('tbChucVu').style.display = 'none';
    return false;
  }
};

validateNV = () => {
  let validateAccount = checkEmpty('tknv', 'tbTKNV', 'Tài khoản');
  if (!validateAccount) {
    validateAccount = checkLenght('tknv', 'tbTKNV', 'Tài khoản', 4, 6);
    if (!validateAccount) {
      validateAccount = checkAccountExist('tknv');
    }
  }

  let validateName = checkEmpty('name', 'tbTen', 'Tên');
  if (!validateName) {
    validateName = checkNotText('name');
  }

  let validateEmail = checkEmpty('email', 'tbEmail', 'Email');
  if (!validateEmail) {
    validateEmail = checkNotEmail('email');
  }

  let validatePassword = checkEmpty('password', 'tbMatKhau', 'Mật khẩu');
  if (!validatePassword) {
    validatePassword = checkNotPassword('password');
  }

  let validateDate = checkEmpty('datepicker', 'tbNgay', 'Ngày làm');
  if (!validateDate) {
    validateDate = checkNotDate('datepicker');
  }

  let validateLuongCb = checkEmpty('luongCB', 'tbLuongCB', 'Lương cơ bản');
  if (!validateLuongCb) {
    validateLuongCb = checkNotNumber('luongCB', 'tbLuongCB', 'Lương cơ bản');
    if (!validateLuongCb) {
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

  let validateGioLam = checkEmpty('gioLam', 'tbGiolam', 'Giờ làm');
  if (!validateGioLam) {
    validateGioLam = checkNotNumber('gioLam', 'tbGiolam', 'Giờ làm');
    if (!validateGioLam) {
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
    validateAccount ||
    validateName ||
    validateEmail ||
    validatePassword ||
    validateDate ||
    validateLuongCb ||
    validateChucVu ||
    validateGioLam
  ) {
    return true;
  } else {
    return false;
  }
};
