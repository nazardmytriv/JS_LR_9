// ==============================
// Завдання 0. Лоадер та виведення результату
// ==============================
const loader = document.getElementById('loader');
const resultDiv = document.getElementById('result');

function showLoader() {
  resultDiv.textContent = '';
  resultDiv.className = '';
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showResult(message) {
  hideLoader();
  resultDiv.className = '';
  resultDiv.textContent = message;
}

function showError(message) {
  hideLoader();
  resultDiv.className = 'error';
  resultDiv.textContent = message;
}

// Допоміжна функція: випадкове ціле число від min до max
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==============================
// Завдання 1. Promise, який виконується через 2 секунди
// ==============================
function task1() {
  showLoader();

  const promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('Hello, World!');
    }, 2000);
  });

  promise.then(showResult).catch(showError);
}

// ==============================
// Завдання 2. Функція checkNumber(num)
// ==============================
function checkNumber(num) {
  return new Promise(function (resolve, reject) {
    if (num > 10) {
      resolve('Число більше 10');
    } else {
      reject('Число менше або дорівнює 10');
    }
  });
}

function task2() {
  const num = parseFloat(document.getElementById('num').value);
  if (isNaN(num)) {
    showError('Введіть число.');
    return;
  }

  showLoader();
  checkNumber(num)
    .then(showResult)
    .catch(showError);
}

// ==============================
// Завдання 3. Функція randomNumber()
// ==============================
function randomNumber() {
  return new Promise(function (resolve, reject) {
    const delay = getRandom(1000, 3000);   // від 1 до 3 секунд
    const startTime = Date.now();

    setTimeout(function () {
      resolve({
        number: getRandom(1, 100),         // від 1 до 100
        time: Date.now() - startTime
      });
    }, delay);
  });
}

function task3() {
  showLoader();

  randomNumber()
    .then(function (data) {
      showResult('Число: ' + data.number +
        ', час роботи: ' + (data.time / 1000).toFixed(2) + ' с');
    })
    .catch(showError);
}

// ==============================
// Завдання 4. Функція compareNumbers(num1, num2)
// ==============================
function compareNumbers(num1, num2) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (num1 > num2) {
        resolve('Перше число більше');
      } else if (num1 < num2) {
        resolve('Друге число більше');
      } else {
        reject('Числа рівні');
      }
    }, 1000);
  });
}

function task4() {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  if (isNaN(num1) || isNaN(num2)) {
    showError('Введіть обидва числа.');
    return;
  }

  showLoader();
  compareNumbers(num1, num2)
    .then(showResult)
    .catch(showError);
}

// ==============================
// Завдання 5. Promise.all
// ==============================
function delayedRandom(seconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(getRandom(1, 10));           // від 1 до 10
    }, seconds * 1000);
  });
}

function task5() {
  showLoader();

  const promises = [
    delayedRandom(1),
    delayedRandom(2),
    delayedRandom(3)
  ];

  Promise.all(promises)
    .then(function (values) {
      const sum = values.reduce(function (total, value) {
        return total + value;
      }, 0);
      showResult('Значення: ' + values.join(', ') + '. Сума: ' + sum);
    })
    .catch(showError);
}

// ==============================
// Запуск
// ==============================
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('task1').addEventListener('click', task1);
  document.getElementById('task2').addEventListener('click', task2);
  document.getElementById('task3').addEventListener('click', task3);
  document.getElementById('task4').addEventListener('click', task4);
  document.getElementById('task5').addEventListener('click', task5);
});
