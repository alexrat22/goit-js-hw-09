import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  fieldSeconds: document.querySelector('[data-seconds]'),
  fieldMinutes: document.querySelector('[data-minutes]'),
  fieldHours: document.querySelector('[data-hours]'),
  fieldDays: document.querySelector('[data-days]'),
};

refs.startBtn.setAttribute('disabled', '');

let startTime = {};

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      alert('Please choose a date in the future');
    } else {
      startTime = selectedDates[0];
      refs.startBtn.removeAttribute('disabled', '');
    }
  },
});

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    this.init();
  }

  init() {
    const time = this.convertMs(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      let deltaTime = startTime - currentTime;
      if (deltaTime <= 0) {
        deltaTime = 0;
        this.stop();
      }
      const time = this.convertMs(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.pad(Math.floor(ms / day));
    const hours = this.pad(Math.floor((ms % day) / hour));
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.pad(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClockface,
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateClockface({ days, hours, minutes, seconds }) {
  refs.fieldSeconds.textContent = seconds;
  refs.fieldMinutes.textContent = minutes;
  refs.fieldHours.textContent = hours;
  refs.fieldDays.textContent = days;
}
