// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
}).addTo(myMap);

// Load in geojson data

var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

console.log(typeof(geoData));

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


function onEachFeature(feature, layer) {
    // does this feature have a property named coordinates?
    
        // layer.bindPopup("ehhhhh").addTo(myMap);
}

var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

function getColor(d) {
    return d >= 5 ? '#f06b6b' :
           d >= 4 ? '#f0a76b' :
           d >= 3 ? '#f3b94d' :
           d >= 2 ? '#f3db4d' :
           d >= 1 ? '#e1f34d' :
                    '#b7f34d' ;
}

d3.json(geoData, function(data) {
    L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
            if (feature.properties.mag) {
              return new L.circleMarker(latlng, 
                {
                    fillOpacity: 0.8,
                    color: "black",
                    weight: 1,
                    fillColor: getColor(feature.properties.mag),
                    // Adjust radius
                    radius: (feature.properties.mag * 6)

                }).bindPopup("<h1>"+ feature.properties.place +"</h1> <hr> <h3>Magnitude: " + feature.properties.mag + "</h3>").addTo(myMap);
            } 
        }
    }).addTo(myMap);

    

});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {

    // var div = L.DomUtil.create('div', 'info legend'),
    //     grades = [0,1,2,3,4,5],
    //     labels = [];

    var div = L.DomUtil.create('div', 'info legend');
        labels = ['<strong>Categories</strong>'],
        grades = [0,1,2,3,4,5];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {

        div.innerHTML += 
        labels.push(
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+'));

    }
    div.innerHTML = labels.join('<br>');

    return div;
};
legend.addTo(myMap);






