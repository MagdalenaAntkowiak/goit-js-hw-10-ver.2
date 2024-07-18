import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', function () {
  flatpickr('#datetime-picker', {
    enableTime: true,
    dateFormat: 'Y-m-d H:i',
  });
});
