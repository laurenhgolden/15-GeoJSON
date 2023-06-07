// Retrieve dataset using JSON Geo
// Store API endpoint as query URL
const queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Build createMap function
function createMap(volcanoes) {

    // Create a tile layer
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    // Create a baseMap object to hold a streetmap layer
    let baseMaps = {
        "Street Map": streetmap
    };

    // Create the map object with options
    let map = L.map("map-id", {
        layers: [streetmap]
    });

    // Create a layer control, and pass it baseMaps and Volcanoes. Add teh layer control to the map
    L.control.layers(baseMaps, {
        collapsed: false
    }).addTo(map)

    let info = L.control({
        position: "bottomright"
    });

    // When the layer control is added, insert a div with teh class of 'legend'
    info.onAdd = function() {
        let div = L.DomUtil.create("div", "legend");
        return div;
    };

    // Add the info legend to map
    info.addTo(map);
}

// Build the createVolcanoes function to build the Volcano layer
function createVolcanoes (response) {
    // Pull volcation
    let volcanoes = response.data

    //Initialize array to hold volcano markers
    let volcanoMarkers = [];

    // Loop through the volcanoes array
    for (let index = 0; index < volcanoes.length; index++) {
        let volcano = volcanoes[index];

        // For each volcano, create a marker and bind a popup with the volcano's information
        let volcanoMarker = L.marker([volcano.geometry.coordinates.latitude, volcano.geometry.coordinates.longitude])
            .bindPopup("<h3>Magnitude" + volcano.features.mag + "</h3>");

        // Add the marker to the volcanoMarker array
            volcanoMarkers.push(volcanoMarker);
    }

    // Create a layer group that's made from the volcano markers array, and pass it to the createMap function
    createMap(L.layerGroup(volcanoMarkers));

}

//Perform a GET request to the query URL
d3.json(queryURL).then(createVolcanoes);

// d3.json(queryURL).then(function(data) {
//     // Once a response is received, send data.features object to the createFeatures function
//     createFeatures(data.features);
// });

// Build function for legend


// Create a createFunction feature
// function createFeatures () {
//     //Define a function that will run once for each feature in teh features array
//     // Give each feature a popup that describes a place and time of the earthquake
//     function onEachFeature(feature,layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3>`)
//     }
// }


// Use URL of the JSON to pull the data

// Import and visualize the data
// Use Leaflet to create the map that plots all earthquakes from teh dataset based on their longitude and latitude

// Include popups that provide additional informationa bout earthquake when its associated marker clicked

// Create a legend that will provide context for the map data