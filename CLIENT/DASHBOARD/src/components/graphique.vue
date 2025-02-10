<template>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  export default {
    name: "ChartComponent",
    mounted() {
      Chart.register(...registerables);
      this.renderChart();
    },
    methods: {
      generateRandomData() {
        return Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)); // 6 valeurs aléatoires entre 0 et 100
      },
      renderChart() {
        new Chart(this.$refs.chartCanvas, {
          type: "line",
          data: {
            labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
            datasets: [
              {
                label: "Données Aléatoires",
                data: this.generateRandomData(),
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 100%;
    max-width: 600px;
    margin: auto;
  }
  </style>
  