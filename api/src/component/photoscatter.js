const authorizeButton = document.getElementById("authorize-button");
const signoutButton = document.getElementById("signout-button");
const templateContent = document.querySelector("template").content;
// for rotate ここに書いて良いのだろうか
const PLUS_MINUS = [1, -1];
const To_RADIANS = Math.PI / 180;
const WINDOW_WIDTH = window.outerWidth;
const WINDOW_HEIGHT = window.outerHeight;
let dragX, dragY;

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}
//TODO envファイルに外だしすること
function initClient() {
  // Enter an API key from the Google API Console:
  //   https://console.developers.google.com/apis/credentials
  const apiKey = "***";

  // Enter the API Discovery Docs that describes the APIs you want to
  // access. In this example, we are accessing the People API, so we load
  // Discovery Doc found here: https://developers.google.com/people/api/rest/
  const discoveryDocs = [
    "***",
  ];

  // Enter a client ID for a web application from the Google API Console:
  //   https://console.developers.google.com/apis/credentials?project=_
  // In your API Console project, add a JavaScript origin that corresponds
  //   to the domain where you will be running the script.
  const clientId =
    "***";

  // Enter one or more authorization scopes. Refer to the documentation for
  // the API or https://developers.google.com/people/v1/how-tos/authorizing
  // for details.
  const scopes = "https://www.googleapis.com/auth/photoslibrary.readonly";

  gapi.client
    .init({
      apiKey: apiKey,
      discoveryDocs: discoveryDocs,
      clientId: clientId,
      scope: scopes,
    })
    .then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
}
//button
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = "none";
    signoutButton.style.display = "block";
    makeApiCall();
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
  }
}

function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  gapi.client
    .request({
      path: "https://photoslibrary.googleapis.com/v1/mediaItems",
    })
    .then(
      function (response) {
        const googlePhotos = responseToMap(response);
        scatterImages(googlePhotos);
      },
      function (reason) {
        console.log(reason);
      }
    );
}

function responseToMap(response) {
  const dateUrlMap = new Map();
  response.result.mediaItems.map((item, i) => {
    dateUrlMap.set(
      item.mediaMetadata.creationTime,
      `${item.baseUrl}=w300-h300`
    );
  });
  return dateUrlMap;
}
//create
function scatterImages(imgList) {
  imgList.forEach((value, index) => {
    scatterImage(value, index);
  });
}

function scatterImage(src, date) {
  const ELEMENT = createElement(src, date);
  const SCATTER_ELEMENT = scatterPosition(ELEMENT);
  drawImage(SCATTER_ELEMENT);
}

function createElement(src, datetime) {
  const CLONE = templateContent.cloneNode(true);
  const DATE = dateToFormatString(new Date(datetime), '%YY%/%MM%/%DD% %HH%:%mm%');
  CLONE.querySelector(".container").id = "photo" + datetime;
  CLONE.querySelector("p").textContent = DATE;
  CLONE.querySelector("img").src = src;
  return CLONE;
}

function scatterPosition(el) {
  const container = el.querySelector(".container");
  const x = (Math.random() * WINDOW_WIDTH) / 3 + WINDOW_WIDTH / 6;
  const y = (Math.random() * WINDOW_HEIGHT) / 3 + WINDOW_HEIGHT / 6;
  const z = PLUS_MINUS[Math.floor(Math.random())] * Math.random() * 30;

  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  container.style.transform = `rotate(${z}deg)`;

  return el;

}
function drawImage(el) {
  document
    .querySelector("#board")
    .appendChild(document.importNode(el, true));
}
//drag
function dragstart_handler(ev, el) {
  dragX = ev.clientX - el.style.left.replace("px", "");
  dragY = ev.clientY - el.style.top.replace("px", "");
}
function setPosition(ev, el) {
  el.style.left = `${ev.clientX - dragX}px`;
  el.style.top = `${ev.clientY - dragY}px`;
}

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}
