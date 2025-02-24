<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
export default {
  name: "ChartComponent",
  props: {
    graphData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    Chart.register(...registerables);
    this.renderChart();
  },
  watch: {
    // Si le JSON change, on détruit et recrée le graphique
    graphData: {
      handler() {
        if (this.chart) {
          this.chart.destroy();
        }
        this.renderChart();
      },
      deep: true,
    }
  },
  methods: {
    renderChart() {
      let labels = [];
      let dataValues = [];
      if (this.graphData && this.graphData.data) {
        // On récupère les entrées sous forme de tableau et on trie par date
        const entries = Object.entries(this.graphData.data);
        entries.sort((a, b) => new Date(a[0]) - new Date(b[0]));
        labels = entries.map(([timestamp]) => timestamp);
        dataValues = entries.map(([, value]) => value.temperature);
      }
      this.chart = new Chart(this.$refs.chartCanvas, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Évolution de la température",
              data: dataValues,
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

  
  <!-- props à rajouter 
    props: {
    message: {
      type: {}, //dictionnaire label : TimeSeries (juste des valeurs, ou paire timestamp valeurs)
      default: {},
    },
  },
   -->