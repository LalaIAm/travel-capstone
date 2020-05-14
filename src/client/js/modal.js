const modalBtn = document.getElementById('start-trip-btn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('modal-close');
const menuIcon = document.getElementById('menu-icon');
const navigation = document.getElementById('navigation');
const app = document.getElementById('app');

menuIcon.onclick = function () {
  Travel.showNav();
  Travel.createNav();
};

modalBtn.onclick = function () {
  modal.style.display = 'block';
  navigation.style.left = '-32rem';
};

closeBtn.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    navigation.style.left = '-32rem';
  }
};

let currentTab = 0;

const showTab = (n) => {
  let x = document.getElementsByClassName('tab');
  x[n].style.display = 'block';

  if (n == 0) {
    document.getElementById('prevBtn').style.display = 'none';
  } else {
    document.getElementById('prevBtn').style.display = 'inline';
  }

  if (n == x.length - 1) {
    document.getElementById('nextBtn').innerHTML = 'submit';
  } else {
    document.getElementById('nextBtn').innerHTML = 'Next';
  }

  fixStepIndicator(n);
};

const submitAnswer = async (n) => {
  let x = document.getElementsByClassName('tab');
  let location = document.getElementById('location-input').value;
  let leaving = document.getElementById('leaving-input').value;
  let returning = document.getElementById('returning-input').value;
  let attractions = document.getElementById('attraction-input').value;

  const inputData = {
    location: location,
    leaving: leaving,
    returning: returning,
    attractions: attractions,
  };

  x[currentTab].style.display = 'none';

  currentTab = currentTab + n;

  if (currentTab >= x.length) {
    modal.style.display = 'none';

    console.log('input: ', inputData);

    Travel.sendData('/api/newtrip', inputData);

    return inputData;
  }

  showTab(currentTab);
};

const fixStepIndicator = (n) => {
  let i,
    x = document.getElementsByClassName('step');

  x[n].setAttribute('class', 'step active');

  if (n - 1 >= 0) {
    i = n - 1;
    x[i].setAttribute('class', 'step');
  }
};

const showNav = () => {
  navigation.style.left = '8rem';
};

showTab(currentTab);

const menuActions = () => {
  showNav();
  Travel.createNav();
};

export { submitAnswer, showNav, menuActions };
