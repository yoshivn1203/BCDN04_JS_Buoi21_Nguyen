let getEle = (id) => document.getElementById(id);
export class Helper {
  inpFields = [
    'tknv',
    'name',
    'email',
    'password',
    'datepicker',
    'luongCB',
    'chucvu',
    'gioLam',
  ];
  tbFields = [
    'tbTKNV',
    'tbTen',
    'tbEmail',
    'tbMatKhau',
    'tbNgay',
    'tbLuongCB',
    'tbChucVu',
    'tbGiolam',
  ];

  getInputValue = () => {
    return this.inpFields.map((ele) => getEle(ele).value);
  };
  fill = (arr) => {
    let fields = this.inpFields.map((ele) => getEle(ele));
    fields.forEach((ele, id) => {
      ele.value = arr[id];
    });
  };
  clearTB = () => {
    let fields = this.tbFields.map((ele) => getEle(ele));
    fields.forEach((ele) => {
      ele.style.display = 'none';
    });
  };
}

export class CustomModal {
  static alertSuccess = (message) => {
    return Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  static alertDelete = (message) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    });
  };
}
