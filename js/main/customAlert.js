alertSuccess = (message) => {
  return Swal.fire({
    position: 'top-right',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

alertDelete = (message) => {
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
