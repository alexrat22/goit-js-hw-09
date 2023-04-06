import Notiflix, { Loading } from 'notiflix';

const STORAGE_KEY = 'Form-Key';
const formData = {};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(
        Notiflix.Notify.success(`Fullfiled promise ${position} in ${delay}ms`)
      );
    } else {
      reject(
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
      );
    }
    return promise;
  });
}

const refs = {
  form: document.querySelector('.form'),
  createButton: document.querySelector('button'),
  firstDelay: document.querySelector('[name = delay]'),
  delayStep: document.querySelector('[name = step]'),
  amount: document.querySelector('[name = amount]'),
};
refs.form.addEventListener('input', onFormInput);
refs.createButton.addEventListener('click', onSubmitButtonClick);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onSubmitButtonClick() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  let position = 0;
  const intervalId = setInterval(() => {
    position += 1;
    createPromise(position, 10000);
    if (position === parsedData.amount) {
      clearInterval(intervalId);
    }
  }, 1000);
}

//   console.log(refs.firstDelay.value);
//   console.log(refs.delayStep.value);
//   console.log(refs.amount.value);
