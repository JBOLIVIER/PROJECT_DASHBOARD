// UNITS OF THE PROJECT
const UNITS = {
    temperature: "C",
    pressure: "hP",
    humidity: "%",
    rain: "mm/m2",
    luminosity: "Lux",
    wind_heading: "°",
    wind_speed_avg: "km/h",
    lat: "DD",
    lon: "DD"
};

// ASSOCIATED SENSORS
const VALID_CAPTEURS = Object.keys(UNITS);

module.exports = { UNITS, VALID_CAPTEURS };