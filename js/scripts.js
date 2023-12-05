// scripts.js

// Initialize Google Maps
function initMap() {
  // Change the latitude and longitude as needed
  const coordinates = { lat: 40.7128, lng: -74.006 };
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.0902, lng: -95.7129 },
    zoom: 12
  });
  // You can customize the map further based on your requirements
  // For now, it will display a basic map centered at the specified coordinates
}

// Load the Google Maps API by adding a script tag dynamically
const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC5BFpnFF4QjsnZwWuNtYDNX_gK9H2LjA0&callback=initMap`;
script.defer = true;
document.head.appendChild(script);
