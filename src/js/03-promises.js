import Notiflix, { Loading } from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
refs.formEl.addEventListener('submit', onSubmit);
function onSubmit(evt) {
  evt.preventDefault();
  let delay = Number(refs.delayEl.value);
  let step = Number(refs.stepEl.value);
  let amount = Number(refs.amountEl.value);

  let position = 0;
  delay = delay - step;
  for (let i = 0; i < amount; i += 1) {
    position = i + 1;
    delay += step;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  refs.formEl.reset();
}
