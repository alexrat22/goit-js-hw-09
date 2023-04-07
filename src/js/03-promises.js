import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitClick);

function onSubmitClick(evt) {
  evt.preventDefault();

  let delay = Number(evt.currentTarget.delay.value);

  for (let i = 1; i <= Number(evt.currentTarget.amount.value); i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            useIcon: false,
          }
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            useIcon: false,
          }
        )
      );
    delay += Number(evt.currentTarget.step.value);
  }
}
