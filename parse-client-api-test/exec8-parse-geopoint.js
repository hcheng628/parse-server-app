/**********************************************
 1) Given the json data in the PIZZA_PLACES variable generate a set of coffeeshop objects with a location property which is their lat/lon.
 2) Return all coffeeshops whithin 2 km of latitude 37.7749 and longitude -122.4194
 3) Return all coffeeshop in the bounding box defined by the bounding box with bottom left corner having a latitude of 37.761536 and longitude -122.444258 and top right corner having a latitude of 37.786841 and longitude of -122.400398
 ***********************************************/
Parse.initialize("appidCheng628");
Parse.serverURL = 'https://parse-server-cheng.herokuapp.com/parse';

var PIZZA_PLACES = [
    {
        "name":"Little Star Pizza",
        "lat":37.7775382995605,
        "lon":-122.43798828125
    },
    {
        "name":"Tony's Pizza Napoletana",
        "lat":37.8002013266087,
        "lon":-122.409066483378
    },
    {
        "name":"Golden Boy Pizza",
        "lat":37.7997956,
        "lon":-122.4080729
    },
    {
        "name":"Long Bridge Pizza",
        "lat":37.7595199,
        "lon":-122.3881765
    },
    {
        "name":"The Pizza Shop",
        "lat":37.7525918579061,
        "lon":-122.41455420986
    },
    {
        "name":"Montesacro Pinseria-Enoteca",
        "lat":37.7815971,
        "lon":-122.4101181
    },
    {
        "name":"Pizzeria Delfina",
        "lat":37.76136,
        "lon":-122.42418
    },
    {
        "name":"Gialina Pizzeria",
        "lat":37.73405,
        "lon":-122.43424
    },
    {
        "name":"Escape From New York Pizza",
        "lat":37.7694456,
        "lon":-122.4512722
    },
    {
        "name":"Marcello's Pizza",
        "lat":37.7620544433594,
        "lon":-122.435386657715
    },
    {
        "name":"Carmel Pizza Company",
        "lat":37.8075970299193,
        "lon":-122.417328357697
    },
    {
        "name":"Pizzetta 211",
        "lat":37.7836279571056,
        "lon":-122.482908368111
    },
    {
        "name":"All Good Pizza",
        "lat":37.7390445,
        "lon":-122.3897508
    },
    {
        "name":"Zero Zero",
        "lat":37.7816352844238,
        "lon":-122.402046203613
    },
    {
        "name":"Goat Hill Pizza",
        "lat":37.762471,
        "lon":-122.397658
    },
    {
        "name":"Pizzeria Delfina",
        "lat":37.7890022,
        "lon":-122.4343326
    },
    {
        "name":"Il Casaro Pizzeria & Mozzarella Bar",
        "lat":37.7984832,
        "lon":-122.4073981
    },
    {
        "name":"Slice House",
        "lat":37.7811085577102,
        "lon":-122.391254939139
    },
    {
        "name":"Arinell Pizza",
        "lat":37.7646907195257,
        "lon":-122.421712145927
    },
    {
        "name":"Giorgio's Pizzeria",
        "lat":37.7829999120287,
        "lon":-122.461083021665
    }
];
// 1
var PizzaPlace = Parse.Object.extend("PizzaPlace");
for (var i = 0; i < PIZZA_PLACES.length; i++) {
    var data = PIZZA_PLACES[i];
    var pizzaPlace = new PizzaPlace();
    pizzaPlace.set("name", data.name);
    pizzaPlace.set("geo", new Parse.GeoPoint({latitude: data.lat, longitude: data.lon}));
    pizzaPlace.save().then(
        function (success) {
            console.log("Success: " + success.id);
        },
        function (error) {
            console.error("Failed: " + error);
        }
    );
};
// 2
var sf = new Parse.GeoPoint({latitude: 37.7749, longitude: -122.4194});
var pizzaPlaceQuery = new Parse.Query("PizzaPlace");
pizzaPlaceQuery.withinKilometers("geo", sf, 2);
pizzaPlaceQuery.find().then(
    function (success) {
        console.log("Pizza Places within 2km of this Given GeoPoint: ");
        success.forEach(function (eachPizzaPlace) {
            console.log("Each PizzaPlace: " + JSON.stringify(eachPizzaPlace, null, 2));
            console.log("Distance: " + sf.kilometersTo(eachPizzaPlace.geo));
        });
    },
    function (error) {
        console.error("Failed: " + error);
    }
);

// 3
var southwest = new Parse.GeoPoint({latitude: 37.761536, longitude: -122.444258});
var northeast = new Parse.GeoPoint({latitude: 37.786841, longitude: -122.400398});
var pizzaPlaceQuery = new Parse.Query("PizzaPlace");
pizzaPlaceQuery.withinGeoBox("geo", southwest, northeast);
pizzaPlaceQuery.find().then(
    function (success) {
        console.log("Pizza Places within GeoBox of this Given GeoPoint: ");
        success.forEach(function (eachPizzaPlace) {
            console.log("Each PizzaPlace: " + JSON.stringify(eachPizzaPlace, null, 2));
            console.log("Distance: " + sf.kilometersTo(eachPizzaPlace.geo));
        });
    },
    function (error) {
        console.error("Failed: " + error);
    }
);