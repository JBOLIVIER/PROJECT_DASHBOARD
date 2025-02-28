# PROJECT_DASHBOARD
Development of a web-based weather station system with sensors and a central dashboard using Node.js and Raspberry Pi.

This project is a weather dashboard that displays real-time and historical weather data from a network of Raspberry Pis. The client is accessible at [http://piensg030:3000](http://piensg030:3000) and communicates with a Raspberry Pi that hosts an API returning JSON data. In addition, the client also fetches JSON data from the Raspberry Pis of my classmates.

## Features

- **Live Data**: View real-time weather parameters.
- **Map**: Locate all the Raspberry Pis on an interactive map.
- **Period/Evolution**: Track the evolution of weather parameters (e.g., temperature, pressure, humidity) over a selected time period.

## Architecture

- **Client**: A Vue.js application providing an interactive dashboard and visualizations.
- **API**: Hosted on a Raspberry Pi that returns weather data in JSON format.
- **Multiple Data Sources**: The client fetches data from the main Raspberry Pi as well as from additional Raspberry Pis used by classmates.