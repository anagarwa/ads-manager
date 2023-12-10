function initMap() {
    function processData() {
        const locationsData = {
            "California": [
                {
                    "lat":34.052235,
                    "long":-118.243683,
                },
                {
                    "lat":32.715736,
                    "long":-117.161087,
                },
                {
                    "lat":37.335480,
                    "long":-121.893028,
                },
                {
                    "lat":37.773972,
                    "long":-122.431297,
                },
                {
                    "lat":33.770050,
                    "long":-118.19374,
                },
            ],
            "Texas": [
                {
                    "lat":29.749907,
                    "long":-95.358421,
                },
                {
                    "lat":29.424349,
                    "long":-98.491142,
                },
                {
                    "lat":32.779167,
                    "long":-96.808891,
                },
                {
                    "lat":30.266666,
                    "long":-97.733330,
                },
                {
                    "lat":32.768799,
                    "long":-97.309341,
                },
            ],
            "Florida": [
                {
                    "lat":25.761681,
                    "long":-80.191788,
                },
                {
                    "lat":28.538336,
                    "long":-81.379234,
                },
                {
                    "lat":27.964157,
                    "long":-82.452606,
                },
                {
                    "lat": 26.562855,
                    "long":-81.949532,
                },
                {
                    "lat":30.332184,
                    "long":-81.655647,
                },
            ],
            "Hawaii": [
                {
                    "lat":19.724112,
                    "long":-155.086823,
                },
                {
                    "lat":21.315603,
                    "long":-157.858093,
                },
                {
                    "lat":21.3972222,
                    "long":-157.9733333,
                },
                {
                    "lat":21.981112,
                    "long":-159.371109,
                },
                {
                    "lat":20.887218,
                    "long":-156.482834,
                },
            ],
            "Washington": [
                {
                    "lat":47.608013,
                    "long":-122.335167,
                },
                {
                    "lat":46.235,
                    "long":-119.223301,
                },
                {
                    "lat":47.258728,
                    "long":-122.465973,
                },
                {
                    "lat":47.658779,
                    "long":-117.426048,
                },
                {
                    "lat":47.378010,
                    "long":-122.237381,
                },
            ],
        }

        const records = generateCoordinatesData(locationsData);

        const states = records.map((state) => {
            const name = state.Location;
            const lat = state.Latitude;
            const lng = state.Longitude;
            const slots = state.AvailableSlots;

            const info = `${name}, ${slots} slots, $10 per slot, 100 p/min`;

            return {
                name,
                coordinates: { lat, lng },
                info
            };
        });
        // console.log(states);
        displayMarkers(states); // Display markers on the map
    }

    function getRandomValue(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function generateCoordinatesData(locationsData) {
        const records = [];

        for (let i = 1; i <= 100; i++) {
            const locationKeys = Object.keys(locationsData);
            const randomLocationKey = locationKeys[Math.floor(Math.random() * locationKeys.length)];
            const locationCoordinates = locationsData[randomLocationKey];
            const selectedCoordinates = locationCoordinates[Math.floor(Math.random() * locationCoordinates.length)];

            const record = {
                "PlayerId": i,
                "Location": randomLocationKey,
                "Latitude": selectedCoordinates.lat,
                "Longitude":selectedCoordinates.long,
                "AvailableSlots": Math.floor(Math.random() * 7),
                "TargetAge": getRandomValue(["student", "young", "middle age", "old age"]),
                "TargetIncome": getRandomValue(["low", "middle", "high"]),
                "Activity": getRandomValue(["Sports", "Music", "Travel", "Cooking"]),
                "Gender": getRandomValue(["Male", "Female", "Other"])
            };

            records.push(record);
        }

        return records;
    }


    function displayMarkers(statesData) {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 37.0902, lng: -95.7129 }, // Center map to the USA
            zoom: 4 // Set an initial zoom level
        });

        for (const state of statesData) {
            const marker = new google.maps.Marker({
                position: state.coordinates,
                map,
                title: state.name
            });

            const infowindow = new google.maps.InfoWindow({
                content: state.info
            });

            marker.addListener('click', () => {
                infowindow.open(map, marker);
            });
        }
    }
    processData();
}


google.maps.event.addDomListener(window, 'load', initMap);
function updatePrice(val) {
    document.getElementById('price').innerText = val;
}

function toggleOptions(demographic) {
    const options = document.getElementById(`${demographic}`);
    options.style.display = options.style.display === 'none' ? 'block' : 'none';
}