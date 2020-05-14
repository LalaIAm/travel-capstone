const gallery = document.getElementById('gallery-container');

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

export { updateGallery };
