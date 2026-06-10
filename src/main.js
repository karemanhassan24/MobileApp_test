import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import "./styles.css";

const locationButton = document.getElementById("locationButton");
const output = document.getElementById("output");

locationButton.addEventListener("click", getLocation);

async function getLocation() {
  output.innerText = "Getting location...";

  try {
    const position = await getCurrentPosition();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    output.innerHTML =
      "Latitude: " + latitude + "<br>" +
      "Longitude: " + longitude + "<br>" +
      `<a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank" rel="noopener">
        Open in Google Maps
      </a>`;
  } catch (error) {
    output.innerText = getLocationErrorMessage(error);
  }
}

async function getCurrentPosition() {
  if (Capacitor.isNativePlatform()) {
    await Geolocation.requestPermissions();

    return Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    });
  }

  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by your browser.");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000
    });
  });
}

function getLocationErrorMessage(error) {
  if (error?.message) {
    return error.message;
  }

  switch (error?.code) {
    case 1:
      return "User denied the request for Geolocation.";
    case 2:
      return "Location information is unavailable.";
    case 3:
      return "The request timed out.";
    default:
      return "An unknown error occurred.";
  }
}
