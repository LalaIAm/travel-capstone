
const navList = document.getElementById('navigation-list');
const menuBtn = document.getElementById('menu-icon');

const sendData = (url = '', data = {}) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const sentData = JSON.stringify(data);

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: sentData,
    redirect: 'follow',
  };

  return fetch(url, options)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => console.log('error posting: ', error));
};

const getData = async (url = '') => {
  const request = await fetch(url);

  try {
    const response = await request.json();
    console.log('response: ', response);
    return response;
  } catch (error) {
    console.log('error fetching data: ', error);
  }
};

const userTrips = async () => {
  const trips = await getData('/api/all');
  console.log('trips: ', trips);
  return trips;
};

async function createNav() {
  while (navList.hasChildNodes()) {
    navList.removeChild(navList.firstChild);
  }

  const trips = await userTrips();
  for (let i = 0; i < trips.length; i++) {
    let trip = trips[i];
    let location = trip.location;
    let id = trip._id;
    let anchor = document.createElement('a');

    anchor.textContent = location;
    anchor.setAttribute('class', 'navigation-link');
    anchor.setAttribute('id', id);

    anchor.onclick = (event) => {
      event.preventDefault();
      Travel.updateGallery(trip.images)
    };

    let li = document.createElement('li');
    li.setAttribute('class', 'navigation-item');
    li.appendChild(anchor);

    navList.appendChild(li);
  }
}

menuBtn.addEventListener('click', createNav);

export { sendData, getData, createNav };
