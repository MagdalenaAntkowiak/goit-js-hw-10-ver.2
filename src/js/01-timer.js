import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Illegal operation',
        position: 'topRight',
        backgroundColor: '#b51b1b',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        iconColor: '#fafafb',
        timeout: 5000,
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startButton.disabled = true;
    // Rozpocznij odliczanie
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const timeDifference = userSelectedDate - now;
      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        return;
      }
      const time = convertMs(timeDifference);
      updateTimer(time);
    }, 1000);
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  document.querySelector('span[data-days]').textContent = days
    .toString()
    .padStart(2, '0');
  document.querySelector('span[data-hours]').textContent = hours
    .toString()
    .padStart(2, '0');
  document.querySelector('span[data-minutes]').textContent = minutes
    .toString()
    .padStart(2, '0');
  document.querySelector('span[data-seconds]').textContent = seconds
    .toString()
    .padStart(2, '0');
}
