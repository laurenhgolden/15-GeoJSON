// Retrieve dataset using JSON Geo
// Store API endpoint as query URL
const queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Create a tile layer
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the topography layer
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create the map object with options
let map = L.map("map", {
    center: [40.7, -94.5],
    zoom: 3
});

// Add streetmap to Map
streetmap.addTo(map);

// Create a baseMap object to hold a streetmap layer
let baseMaps = {
    "Street Map": streetmap,
    "Topography": topo
};

// Create layers
let tectonicplates = new L.LayerGroup();
let earthquakes = new L.LayerGroup();

// Create overlays
let overlays = {
    "Tectonic Plates": tectonicplates,
    Earthquakes: earthquakes
};

// Create a layer control, and pass it baseMaps and Earthquakes. Add the layer control to the map
L
    .control
    .layers(baseMaps, overlays, { collapsed: false })
    .addTo(map);

// Use d3 to pull geojson data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

    // Build style info
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // Create embedded function to build colors depending on magnitude
    function getColor(magnitude) {
        if (magnitude > 90) {
            return "#ea2c2c";
        }
        if (magnitude > 70) {
            return "#ea822c";
        }
        if (magnitude > 50) {
            return "#ee9c00";
        }
        if (magnitude > 30) {
            return "#eecc00";
        }
        if (magnitude > 10) {
            return "#d4ee00";
        }
        return "#98ee00";
    }

    // Create radius of bubble based on magnitude 
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }

        return magnitude * 4;
    }

    // Use geoJSON to parse through data
    L.geoJson(data, {

        // Use geoJSON to parse latitude and longitude
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },

        // Establish style with previously created styleInfo
        style: styleInfo,

        // Extract magnitude and coordinates
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "Magnitude: "
                + feature.properties.mag
                + "<br>Depth: "
                + feature.geometry.coordinates[2]
                + "<br>Location: "
                + feature.properties.place
            );
        }
    
    // Add to map
    }).addTo(earthquakes);

    earthquakes.addTo(map)

    // Establish Legend
    let legend = L.control({
        position: "bottomright"
      });
    
      legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
    
        // Establish specific grades and color scheme for legend
        let grades = [-10, 10, 30, 50, 70, 90];
        let colors = [
          "#98ee00",
          "#d4ee00",
          "#eecc00",
          "#ee9c00",
          "#ea822c",
          "#ea2c2c"];
    
        // Create a for loop to loop grades established above
        for (let i = 0; i < grades.length; i++) {
          div.innerHTML += "<i style='background: "
            + colors[i]
            + "'></i> "
            + grades[i]
            + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
      };
    
      // Add legend to map
      legend.addTo(map);
      d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platedata) {
    
      L.geoJson(platedata, {
        color: "orange",
        weight: 2
      })
        .addTo(tectonicplates);
  
        tectonicplates.addTo(map);
    });

});