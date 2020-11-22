
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let readyToLoad = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let photo = {};

// unsplash API
const username = 'theluckyneko'
const picFilter = "grey cat"
const picCount = 10;
const apiKey = 'CYibftbyXSSKGe17PMUNPsZvTnnLGURVzJ5gpWGGYmQ';
// const apiUrl =`https://api.unsplash.com/photos/?client_id=${apiKey}&count=${picCount}&query=${picFilter}`
// the username thing is cool - neko gets all kitten pictures.
//const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}&username=${username}`
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`

// catch event to check if all images loaded. runs at each individual image...
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        readyToLoad = true;
        loader.hidden = true;  // hide the spinner thing 
        // console.log()
    }
}

// help help help set attributes yay
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    // keep track of the number of photos, like the total and stuff
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');  // open in new tab

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.user.name);
        
        // instead of adding attributes one at a time, add them one at a time in a 
        // function. yeah. fuck yeah. 
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        
        // Event listener to catch/ be triggered when we are finished loading images.
        // we want to limit the photo loads to one at a time, not get a bunch queued up when
        // the user is scrolling near the bottom of the page
        img.addEventListener('load', imageLoaded);

        // put img inside anchor element, then put both inside containerElement
        item.appendChild(img);
        imageContainer.appendChild(item);

        console.log(photo.alt_description);
    });
}

// create elements for links & photos, add to DOM
// function displayPhotos() {
//     photosArray.forEach((photo) => {
//         // create <a> to link to unsplash
//         const item = document.createElement('a');
//         item.setAttribute('href', photo.links.html);
//         item.setAttribute('target', '_blank');  // open in new tab

//         // create <img> for photo
//         const img = document.createElement('img');
//         img.setAttribute('src', photo.urls.regular);
//         img.setAttribute('alt', photo.alt_description);
//         img.setAttribute('title', photo.user.name);

//         // put img inside anchor element, then put both inside containerElement
//         item.appendChild(img);
//         imageContainer.appendChild(item);

//         console.log(photo.alt_description);
//     });
// }

// for displaying one photo via the Random request.
function displayOneRando() {
    // create <a> to link to unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');  // open in new tab

    // create <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.user.name);

    // put img inside anchor element, then put both inside containerElement
    item.appendChild(img);
    imageContainer.appendChild(item);

    console.log(photo.alt_description);
}

// function to get photos from unsplash API
async function getPhotos() {
    try {
        const resp = await fetch(apiUrl);
        photosArray = await resp.json();
        // photo = await resp.json();
        console.log(photo);

        // displayOneRando();
        displayPhotos();

        // const data = await resp.json();
        // console.log(data);
    } catch( err) {
        // do something with error
        console.log('there was an error ', err);
    }
}

// look for the scroll event near the bottom of the page
window.addEventListener('scroll', () => {
    // console.log('scrolled');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoad) {
        readyToLoad = false;
        getPhotos();
    }
});

// on load ...
getPhotos();
