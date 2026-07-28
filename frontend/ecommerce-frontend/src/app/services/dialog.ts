import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor() {}

  confirm(title: string, text: string = '') {
    return Swal.fire({
      title,
      text,
      icon: 'question',

      showCancelButton: true,

      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',

      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#dc3545',

      reverseButtons: true,
    });
  }

  success(message: string) {
    return Swal.fire({
      icon: 'success',
      title: message,
      timer: 1800,
      showConfirmButton: false,
    });
  }

  error(message: string) {
    return Swal.fire({
      icon: 'error',
      title: message,
    });
  }

  warning(message: string) {
    return Swal.fire({
      icon: 'warning',
      title: message,
    });
  }

  info(message: string) {
    return Swal.fire({
      icon: 'info',
      title: message,
    });
  }
}
