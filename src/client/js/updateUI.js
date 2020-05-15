const gallery = document.getElementById('gallery-container');

const displayCountdown = (date) => {
  const countDownDate = new Date(date).getTime();
  let x = setInterval(function () {
    let now = Date.getTime()
    let distance = countDownDate - now;
    
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timerContainer = document.getElementById('counter')
    const countdownContainer = document.createElement('div');
    const timer = document.createElement('h5');
    timer.textContent = days + ' days, ' + hours + ' hours, ' + minutes + 'minutes and ' + seconds + ' seconds until your trip begins!';

    countdownContainer.appendChild(timer);
    while (timerContainer.hasChildNodes()) {
      timerContainer.removeChild(timerContainer.firstChild)
    }

    timerContainer.appendChild(countdownContainer);

    if (distance < 0) {
      clearInterval(x);
      timer.textContent = 'Bon Voyage!'
    }
  })
}

const updateGallery = (imageHits) => {
  if (gallery.hasChildNodes()) {
    gallery.removeChild(gallery.firstChild);
  }

  for (let i = 0; i < 10; i++) {
    let img = document.createElement('img');
    let imgUrl = imageHits[i].webformatURL;
    img.setAttribute('src', imgUrl);
    gallery.appendChild(img);
  }
};

const updateTripTitle = (location) => {
  const title = document.getElementById('location-title')
  title.textContent = 'Your Trip to ' + location;
}

const updateUi = (trip) => {
  updateGallery(trip.images);
  updateTripTitle(trip.location);

  if (trip.leaving && trip.leaving !== null && trip.leaving !== '') {
    displayCountdown(trip.leaving)
  }
}

export { updateGallery, updateTripTitle, updateUi };
