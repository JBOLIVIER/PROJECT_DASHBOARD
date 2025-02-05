const UNITS = {
    temperature: "C",
    pressure: "hP",
    humidity: "%",
    lux: "Lux",
    wind_heading: "°",
    wind_speed_avg: "km/h",
    lat: "DD",
    lon: "DD"
};

const VALID_CAPTEURS = Object.keys(UNITS);

module.exports = { UNITS, VALID_CAPTEURS };
